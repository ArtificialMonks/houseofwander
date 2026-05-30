"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AmigoGuide,
  type AmigoPrompt
} from "./amigo-guide";

export type Chapter = {
  id: string;
  label: string;
  time: number;
  title: string;
  text: string;
  detail: string;
};

export type DetailItem = {
  label: string;
  value: string;
  source?: string;
};

export type AmenityGroup = {
  title: string;
  items: string[];
  source?: string;
};

export type StayStory = {
  title: string;
  text: string;
  source?: string;
};

export type StayMedia = {
  type: "image" | "video" | "placeholder";
  src?: string;
  alt?: string;
  caption: string;
  source: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  note: string;
  source?: string;
};

export type StaySource = {
  slug: string;
  name: string;
  location: string;
  region: string;
  status: string;
  sourceStatus: string;
  title?: string;
  tagline: string;
  description: string;
  publicListingTitle?: string;
  listingId?: string;
  vanityUrl?: string;
  canonicalUrl?: string;
  airbnbUrl?: string;
  videoSrc?: string;
  posterSrc?: string;
  runtimeSeconds?: number;
  chapters?: Chapter[];
  media: StayMedia[];
  sourceAudit?: DetailItem[];
  externalLinks?: ExternalLink[];
  quickFacts: DetailItem[];
  trustSignals: DetailItem[];
  listingHighlights: DetailItem[];
  stayStory: StayStory[];
  amenityGroups: AmenityGroup[];
  reviewScores?: DetailItem[];
  reviewMentions: string[];
  bookingSteps: string[];
  houseNotes: string[];
  locationNote: string;
  sourceNotes: string[];
  amigoStayPlan: StayStory[];
  amigoPrompts: AmigoPrompt[];
  styleVariant: "editorial-warm" | "coastal-light" | "boutique-night";
};

type StayExperienceProps = {
  stay: StaySource;
};

const SOURCE_LABELS: Record<string, string> = {
  "airbnb-public": "Airbnb public",
  "host-confirmed": "Host confirmed",
  "prototype-copy": "Prototype copy",
  "briefing-doc": "Briefing doc",
  "needs-confirmation": "Needs confirmation",
  "project-media": "Project media",
  "owner-approved": "Owner-approved media"
};

const sourceLabel = (source?: string) =>
  source ? SOURCE_LABELS[source] ?? source : "Source pending";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const getChapterStateForTime = (
  time: number,
  runtimeSeconds: number,
  chapters: Chapter[]
) => {
  const clamped = Math.max(0, Math.min(runtimeSeconds, time));
  const index = chapters.reduce((current, chapter, chapterIndex) => {
    return chapter.time <= clamped ? chapterIndex : current;
  }, 0);
  const start = chapters[index].time;
  const end = chapters[index + 1]?.time ?? runtimeSeconds;
  const span = Math.max(1, end - start);
  const progress = Math.max(0, Math.min(1, (clamped - start) / span));

  return { index, progress, time: clamped };
};

export function StayExperience({ stay }: StayExperienceProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const journeyRef = useRef<HTMLElement | null>(null);
  const chapters = stay.chapters ?? [];
  const hasJourney = Boolean(stay.videoSrc && stay.posterSrc && chapters.length);
  const runtimeSeconds = stay.runtimeSeconds ?? chapters.at(-1)?.time ?? 0;
  const currentTimeRef = useRef(chapters[0]?.time ?? 0);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(chapters[0]?.time ?? 0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeChapter = chapters[activeIndex] ?? chapters[0];
  const heroMedia = stay.media[0];
  const runtimeLabel = useMemo(() => {
    if (!runtimeSeconds) return "Guided stay page";
    return `${formatTime(runtimeSeconds)} walkthrough`;
  }, [runtimeSeconds]);

  const openAmigo = () => {
    window.dispatchEvent(new Event("amigo:open"));
  };

  const applyTimeState = (time: number) => {
    if (!chapters.length || !runtimeSeconds) return;
    const state = getChapterStateForTime(time, runtimeSeconds, chapters);
    currentTimeRef.current = state.time;
    setActiveIndex(state.index);
    setChapterProgress(state.progress);
    setCurrentTime(state.time);
  };

  const seekToTime = (time: number, shouldPlay = false) => {
    const video = videoRef.current;
    applyTimeState(time);

    if (!video || video.readyState < 1) return;

    try {
      video.currentTime = time;
      if (shouldPlay) {
        void video.play().catch(() => setIsPlaying(false));
      }
    } catch {
      // Some browsers briefly reject seeking while metadata is settling.
    }
  };

  const seekToChapter = (index: number, shouldPlay = isPlaying) => {
    if (!chapters.length) return;
    const nextIndex = Math.max(0, Math.min(chapters.length - 1, index));
    seekToTime(chapters[nextIndex].time, shouldPlay);
  };

  const openJourney = () => {
    if (!hasJourney) {
      document.getElementById("details")?.scrollIntoView({ block: "start" });
      return;
    }

    setVideoError(false);
    setVideoReady(false);
    setIsJourneyOpen(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const closeJourney = () => {
    const video = videoRef.current;
    if (video) video.pause();
    setIsPlaying(false);
    setIsJourneyOpen(false);
    setActiveIndex(0);
    setChapterProgress(0);
    setCurrentTime(chapters[0]?.time ?? 0);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const goPrevious = () => {
    if (activeIndex === 0) return;
    seekToChapter(activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex === chapters.length - 1) return;
    seekToChapter(activeIndex + 1);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || videoError) return;

    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  const handleVideoMetadata = () => {
    setVideoReady(true);
    seekToTime(chapters[activeIndex]?.time ?? 0, true);
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    applyTimeState(video.currentTime);
  };

  useEffect(() => {
    if (!isJourneyOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeJourney();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
      if (event.key === " ") {
        event.preventDefault();
        togglePlayback();
      }
    };
    const keepScrollPinned = () => {
      if (window.scrollY !== 0) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", keepScrollPinned, { passive: true });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", keepScrollPinned);
    };
  }, [activeIndex, isJourneyOpen, isPlaying, videoError]);

  useEffect(() => {
    if (!isJourneyOpen) return;

    const panel = journeyRef.current;
    if (!panel) return;

    const onWheel = (event: WheelEvent) => {
      if (videoError) return;

      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      const amount = Math.min(4, Math.max(0.75, Math.abs(event.deltaY) / 120));
      window.scrollTo({ top: 0, behavior: "auto" });
      seekToTime(currentTimeRef.current + direction * amount, false);
    };

    panel.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => panel.removeEventListener("wheel", onWheel, { capture: true });
  }, [isJourneyOpen, videoError]);

  return (
    <main className={`stayPage ${stay.styleVariant}`}>
      <section className="gateway stayGateway" aria-label={`${stay.name} gateway`}>
        <div className="gatewayMedia stayGatewayMedia" aria-hidden="true">
          {heroMedia?.src ? (
            <img src={heroMedia.src} alt="" />
          ) : (
            <div className="stayHeroPlaceholder" />
          )}
          <div className="gatewayShade" />
          <div className="grain" />
        </div>

        <header className="gatewayTop">
          <Link className="brand" href="/">
            House of Wander
          </Link>
          <span className="brandDivider" aria-hidden="true" />
          <span className="brandPlace">{stay.name} · {stay.location}</span>
          <Link className="gatewayCollectionLink" href="/stays">
            All stays
          </Link>
        </header>

        <div className="gatewayContent">
          <p className="eyebrow">{stay.region} · {stay.status}</p>
          <h1>{stay.title ?? stay.name}</h1>
          <p className="lead">{stay.description}</p>
          <div className="gatewayActions">
            <button
              className="primaryButton gatewayEnter"
              type="button"
              onClick={openJourney}
            >
              {hasJourney ? "Enter walkthrough" : "View stay details"}
            </button>
            <button className="ghostButton" type="button" onClick={openAmigo}>
              Ask Amigo
            </button>
            {stay.airbnbUrl ? (
              <a
                className="ghostButton"
                href={stay.airbnbUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open on Airbnb
              </a>
            ) : (
              <Link className="ghostButton" href="/stays">
                Source needed
              </Link>
            )}
          </div>
        </div>

        <footer className="gatewayFooter">
          <span>{runtimeLabel}</span>
          <span>{stay.sourceStatus}</span>
        </footer>
      </section>

      <section className="intentBand stayIntent" aria-label="Stay intent">
        <div>
          <p className="sectionKicker">Guided stay page</p>
          <h2>{stay.tagline}</h2>
        </div>
        <p>
          House of Wander brings atmosphere, practical stay facts, guest proof,
          and the booking handoff into one guided flow. Source labels make clear
          what is confirmed, public, prototype copy, or still waiting on the
          team.
        </p>
      </section>

      <section
        id="amigo-stay-plan"
        className="amigoStayBand"
        aria-label={`Amigo plan for ${stay.name}`}
      >
        <div className="amigoStayIntro">
          <p className="sectionKicker">Amigo for {stay.name}</p>
          <h2>Guided answers before guests jump to booking.</h2>
          <p>
            Amigo answers from prepared House of Wander sources only. Live AI,
            host inbox, pricing, availability, and payment are intentionally not
            active in this pass.
          </p>
        </div>
        <div className="amigoStayGrid">
          {stay.amigoStayPlan.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="details"
        className="listingDetail"
        aria-label={`${stay.name} stay details`}
      >
        <div className="detailIntro">
          <div>
            <p className="sectionKicker">Decision layer</p>
            <h2>{stay.name}</h2>
          </div>
          <div className="detailIntroCopy">
            <p>{stay.tagline}</p>
            <span>{stay.sourceStatus}</span>
          </div>
        </div>

        <div className="mobileBookingBar" aria-label="Mobile booking shortcut">
          <span>{stay.name}</span>
          {stay.airbnbUrl ? (
            <a href={stay.airbnbUrl} target="_blank" rel="noreferrer">
              Check dates
            </a>
          ) : (
            <Link href="/stays">Collection</Link>
          )}
        </div>

        <div className="mediaRail" aria-label={`${stay.name} media`}>
          {stay.media.map((item, index) => (
            <figure
              key={`${item.caption}-${index}`}
              className={item.src ? "mediaTile" : "mediaTile placeholder"}
            >
              {item.src && item.type === "video" ? (
                <video
                  src={item.src}
                  poster={stay.posterSrc}
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={item.alt ?? item.caption}
                />
              ) : item.src ? (
                <img src={item.src} alt={item.alt ?? ""} />
              ) : (
                <span />
              )}
              <figcaption>
                <strong>{item.caption}</strong>
                <em>{sourceLabel(item.source)}</em>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="trustStrip stayTrustStrip" aria-label="Listing trust signals">
          {stay.trustSignals.map((signal) => (
            <div key={signal.label}>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
              <small>{sourceLabel(signal.source)}</small>
            </div>
          ))}
        </div>

        {(stay.sourceAudit?.length || stay.externalLinks?.length) ? (
          <section className="sourceMap" aria-label={`${stay.name} source map`}>
            <div className="sourceMapIntro">
              <p className="sectionKicker">Source map</p>
              <h2>Public listing facts, safely separated from owner approvals.</h2>
              <p>
                Airbnb details are used as decision support. Photos, direct
                booking, private conversations, live price, and live
                availability stay out of the public site until approved.
              </p>
            </div>

            {stay.sourceAudit?.length ? (
              <div className="sourceAuditGrid">
                {stay.sourceAudit.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <small>{sourceLabel(item.source)}</small>
                  </div>
                ))}
              </div>
            ) : null}

            {stay.externalLinks?.length ? (
              <div className="externalLinkGrid">
                {stay.externalLinks.map((item) => (
                  <a
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{item.label}</span>
                    <strong>{item.note}</strong>
                    <small>{sourceLabel(item.source)}</small>
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="detailGrid">
          <article className="detailPanel primaryDetail">
            <p className="sectionKicker">Quick facts</p>
            <div className="factGrid">
              {stay.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                  <small>{sourceLabel(fact.source)}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="detailPanel">
            <p className="sectionKicker">Highlights</p>
            <div className="highlightList">
              {stay.listingHighlights.map((highlight) => (
                <div key={highlight.label}>
                  <strong>{highlight.label}</strong>
                  <p>{highlight.value}</p>
                  <small>{sourceLabel(highlight.source)}</small>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="storyGrid">
          {stay.stayStory.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="amenityBlock">
          <div>
            <p className="sectionKicker">What guests need to know</p>
            <h2>Practical detail without turning the page into a dashboard.</h2>
          </div>
          <div className="amenityGrid">
            {stay.amenityGroups.map((group) => (
              <article key={group.title} className="amenityGroup">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="reviewBookingGrid">
          <section className="reviewsPanel" aria-label="Guest review summary">
            <div className="reviewsHeader">
              <p className="sectionKicker">Guest proof</p>
              <h2>{stay.trustSignals[0]?.value ?? "Source"}</h2>
              <span>{stay.reviewMentions.length ? "Review themes and trust notes" : "Review source needed"}</span>
            </div>

            {stay.reviewScores?.length ? (
              <div className="scoreGrid">
                {stay.reviewScores.map((score) => (
                  <div key={score.label}>
                    <span>{score.label}</span>
                    <strong>{score.value}</strong>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mentionCloud" aria-label="Review themes">
              {stay.reviewMentions.map((mention) => (
                <span key={mention}>{mention}</span>
              ))}
            </div>
          </section>

          <aside className="bookingPanel" aria-label="Booking next step">
            <p className="sectionKicker">Booking flow</p>
            <h2>{stay.airbnbUrl ? "Keep the final transaction on Airbnb for now." : "Booking source needs team confirmation."}</h2>
            <ol>
              {stay.bookingSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {stay.airbnbUrl ? (
              <a
                className="primaryButton dark"
                href={stay.airbnbUrl}
                target="_blank"
                rel="noreferrer"
              >
                Check dates on Airbnb
              </a>
            ) : (
              <Link className="primaryButton dark" href="/stays">
                Back to collection
              </Link>
            )}
            <small>{stay.sourceStatus}</small>
          </aside>
        </div>

        <section className="locationRules" aria-label="Location and rules">
          <article>
            <p className="sectionKicker">Location</p>
            <h2>{stay.location}</h2>
            <p>{stay.locationNote}</p>
          </article>
          <article>
            <p className="sectionKicker">House notes</p>
            <ul>
              {stay.houseNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="sourceNotes" aria-label="Source notes">
          <p className="sectionKicker">Source status</p>
          <ul>
            {stay.sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      </section>

      {isJourneyOpen && hasJourney && activeChapter ? (
        <section
          ref={journeyRef}
          className="journey"
          role="dialog"
          aria-modal="true"
          aria-label={`${stay.name} guided walkthrough`}
        >
          <video
            ref={videoRef}
            className="journeyVideo"
            src={stay.videoSrc}
            poster={stay.posterSrc}
            muted
            playsInline
            preload="auto"
            autoPlay
            onLoadedMetadata={handleVideoMetadata}
            onTimeUpdate={handleVideoTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
            aria-label={`${stay.name} walkthrough video`}
          />
          <div className="journeyScrim" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />

          <header className="journeyTop">
            <div className="journeyLeftActions">
              <button className="utilityButton" type="button" onClick={closeJourney}>
                Exit
              </button>
              <Link className="utilityButton" href="/stays">
                Collection
              </Link>
            </div>
            <div className="journeyBrand">
              <span>House of Wander</span>
              <span>{stay.name}</span>
            </div>
            {stay.airbnbUrl ? (
              <a
                className="utilityButton utilityLink"
                href={stay.airbnbUrl}
                target="_blank"
                rel="noreferrer"
              >
                Airbnb
              </a>
            ) : null}
          </header>

          <div className="journeyCaption" aria-live="polite">
            <p className="journeyMeta">
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span>
              <span>{activeChapter.label}</span>
              <span>{formatTime(currentTime)}</span>
            </p>
            <h2 key={activeChapter.id}>{activeChapter.title}</h2>
            <p>{activeChapter.text}</p>
            <small>{activeChapter.detail}</small>
          </div>

          {videoError ? (
            <div className="fallback journeyFallback">
              <strong>Video fallback active</strong>
              <span>The poster image remains while the video file is checked.</span>
            </div>
          ) : null}

          <div className="journeyDock">
            <div className="journeyControls" aria-label="Walkthrough controls">
              <button className="controlButton" type="button" onClick={goPrevious} disabled={activeIndex === 0}>
                Previous
              </button>
              <button className="controlButton playButton" type="button" onClick={togglePlayback} disabled={!videoReady || videoError}>
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button className="controlButton" type="button" onClick={goNext} disabled={activeIndex === chapters.length - 1}>
                Next
              </button>
            </div>

            <nav className="filmstrip" aria-label="Walkthrough chapter navigation">
              {chapters.map((chapter, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const fill = isPast ? 1 : isActive ? chapterProgress : 0;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    className={isActive ? "stripBtn active" : "stripBtn"}
                    onClick={() => seekToChapter(index)}
                    aria-pressed={isActive}
                  >
                    <span className="stripRail" aria-hidden="true">
                      <span
                        className="stripFill"
                        style={{ transform: `scaleX(${fill})` }}
                      />
                    </span>
                    <span className="stripMeta">
                      <span className="stripNum">{String(index + 1).padStart(2, "0")}</span>
                      <span className="stripLabel">{chapter.label}</span>
                      <span className="stripTime">{formatTime(chapter.time)}</span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </section>
      ) : null}

      <AmigoGuide
        context={stay.name}
        intro={`I can guide ${stay.name}, explain source labels, and keep live booking details safely on Airbnb or marked as needs-confirmation.`}
        prompts={stay.amigoPrompts}
      />
    </main>
  );
}
