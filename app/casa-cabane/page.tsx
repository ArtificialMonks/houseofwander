"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AmigoGuide,
  type AmigoPrompt
} from "../components/amigo-guide";
import airbnbSource from "../../source/airbnb/casa-cabane-snapshot.json";
import casaCabaneSource from "../../source/stays/casa-cabane.json";

type Chapter = {
  id: string;
  label: string;
  time: number;
  title: string;
  text: string;
  detail: string;
};

type DetailItem = {
  label: string;
  value: string;
};

type AmenityGroup = {
  title: string;
  items: string[];
};

type StayStory = {
  title: string;
  text: string;
};

type CasaCabaneSource = {
  name: string;
  location: string;
  airbnbUrl: string;
  videoSrc: string;
  posterSrc: string;
  runtimeSeconds: number;
  chapters: Chapter[];
  stayStory: StayStory[];
  amigoStayPlan: StayStory[];
  amigoPrompts: AmigoPrompt[];
};

type AirbnbSnapshot = {
  checked: string;
  title: string;
  listingType: string;
  rating: string;
  reviews: string;
  status: string;
  host: string;
  hostScore: string;
  response: string;
  coHosts: string;
  note: string;
  quickFacts: DetailItem[];
  listingHighlights: DetailItem[];
  amenityGroups: AmenityGroup[];
  reviewScores: DetailItem[];
  reviewMentions: string[];
  bookingSteps: string[];
};

const casaCabane = casaCabaneSource as CasaCabaneSource;
const airbnbSnapshot = airbnbSource as AirbnbSnapshot;
const AIRBNB_URL = casaCabane.airbnbUrl;
const VIDEO_SRC = casaCabane.videoSrc;
const POSTER_SRC = casaCabane.posterSrc;
const RUNTIME_SECONDS = casaCabane.runtimeSeconds;
const chapters = casaCabane.chapters;
const stayStory = casaCabane.stayStory;
const amigoStayPlan = casaCabane.amigoStayPlan;
const amigoPrompts = casaCabane.amigoPrompts;
const quickFacts = airbnbSnapshot.quickFacts;
const listingHighlights = airbnbSnapshot.listingHighlights;
const amenityGroups = airbnbSnapshot.amenityGroups;
const reviewScores = airbnbSnapshot.reviewScores;
const reviewMentions = airbnbSnapshot.reviewMentions;
const bookingSteps = airbnbSnapshot.bookingSteps;

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const getChapterStateForTime = (time: number) => {
  const clamped = Math.max(0, Math.min(RUNTIME_SECONDS, time));
  const index = chapters.reduce((current, chapter, chapterIndex) => {
    return chapter.time <= clamped ? chapterIndex : current;
  }, 0);
  const start = chapters[index].time;
  const end = chapters[index + 1]?.time ?? RUNTIME_SECONDS;
  const span = Math.max(1, end - start);
  const progress = Math.max(0, Math.min(1, (clamped - start) / span));

  return { index, progress, time: clamped };
};

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const journeyRef = useRef<HTMLElement | null>(null);
  const currentTimeRef = useRef(chapters[0].time);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(chapters[0].time);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const activeChapter = chapters[activeIndex];
  const runtimeLabel = useMemo(
    () => `${formatTime(RUNTIME_SECONDS)} walkthrough`,
    []
  );

  const openAmigo = () => {
    window.dispatchEvent(new Event("amigo:open"));
  };

  const applyTimeState = (time: number) => {
    const state = getChapterStateForTime(time);
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
      if (shouldPlay && !isReducedMotion) {
        void video.play();
      }
    } catch {
      // Some browsers briefly reject seeking while metadata is settling.
    }
  };

  const seekToChapter = (index: number, shouldPlay = isPlaying) => {
    const nextIndex = Math.max(0, Math.min(chapters.length - 1, index));
    seekToTime(chapters[nextIndex].time, shouldPlay);
  };

  const openJourney = () => {
    setVideoError(false);
    setVideoReady(false);
    setIsJourneyOpen(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const closeJourney = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsPlaying(false);
    setIsJourneyOpen(false);
    setActiveIndex(0);
    setChapterProgress(0);
    setCurrentTime(chapters[0].time);
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
      void video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoMetadata = () => {
    setVideoReady(true);
    seekToTime(chapters[activeIndex].time, !isReducedMotion);
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    applyTimeState(video.currentTime);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setIsReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

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
  }, [activeIndex, isJourneyOpen, isPlaying, isReducedMotion, videoError]);

  useEffect(() => {
    if (!isJourneyOpen) return;

    const panel = journeyRef.current;
    if (!panel) return;

    const onWheel = (event: WheelEvent) => {
      if (isReducedMotion || videoError) return;

      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      const amount = Math.min(4, Math.max(0.75, Math.abs(event.deltaY) / 120));
      window.scrollTo({ top: 0, behavior: "auto" });
      seekToTime(currentTimeRef.current + direction * amount, false);
    };

    panel.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => panel.removeEventListener("wheel", onWheel, { capture: true });
  }, [isJourneyOpen, isReducedMotion, videoError]);

  return (
    <main>
      <section className="gateway" aria-label="Casa Cabane gateway">
        <div className="gatewayMedia" aria-hidden="true">
          <img src={POSTER_SRC} alt="" />
          <div className="gatewayShade" />
          <div className="grain" />
        </div>

        <header className="gatewayTop">
          <Link className="brand" href="/">
            House of Wander
          </Link>
          <span className="brandDivider" aria-hidden="true" />
          <span className="brandPlace">Casa Cabane · Stekene</span>
          <Link className="gatewayCollectionLink" href="/">
            All stays
          </Link>
        </header>

        <div className="gatewayContent">
          <p className="eyebrow">A guided retreat experience</p>
          <h1>
            Step inside Casa Cabane without losing the thread.
          </h1>
          <p className="lead">
            Maaike & Laudi&apos;s real walkthrough becomes a cinematic path
            through arrival, water, garden, interior, and the next step to stay.
          </p>
          <div className="gatewayActions">
            <button className="primaryButton gatewayEnter" type="button" onClick={openJourney}>
              Enter walkthrough
            </button>
            <button className="ghostButton" type="button" onClick={openAmigo}>
              Ask Amigo
            </button>
            <a
              className="ghostButton"
              href={AIRBNB_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open on Airbnb
            </a>
          </div>
        </div>

        <footer className="gatewayFooter">
          <span>{runtimeLabel}</span>
          <span>Real footage · no generated loops in v1</span>
        </footer>
      </section>

      <section className="intentBand" aria-label="Prototype intent">
        <div>
          <p className="sectionKicker">Prototype focus</p>
          <h2>One clear gateway, one guided dive-in.</h2>
        </div>
        <p>
          This version removes the long scroll trap. Guests can enter the Casa
          Cabane world directly, move chapter by chapter, exit at any moment,
          and still reach Airbnb when they are ready.
        </p>
      </section>

      <section
        id="amigo-casa-plan"
        className="amigoStayBand"
        aria-label="Amigo plan for Casa Cabane"
      >
        <div className="amigoStayIntro">
          <p className="sectionKicker">Amigo for Casa Cabane</p>
          <h2>From guided walkthrough to guided answers.</h2>
          <p>
            Amigo is now visible as a prototype guide. It helps guests connect
            the mood of Casa Cabane with practical Airbnb-level details, while
            keeping direct booking clearly marked as a future phase.
          </p>
        </div>
        <div className="amigoStayGrid">
          {amigoStayPlan.map((item) => (
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
        aria-label="Casa Cabane stay details"
      >
        <div className="detailIntro">
          <div>
            <p className="sectionKicker">Airbnb-informed detail</p>
            <h2>{airbnbSnapshot.title}</h2>
          </div>
          <div className="detailIntroCopy">
            <p>
              This section brings the practical Airbnb decision layer into the
              House of Wander experience: facts, trust signals, amenities,
              reviews, location, rules, host context, and the next booking step.
            </p>
            <span>{airbnbSnapshot.checked}</span>
          </div>
        </div>

        <div className="trustStrip" aria-label="Listing trust signals">
          <div>
            <span>{airbnbSnapshot.status}</span>
            <strong>{airbnbSnapshot.rating}</strong>
            <small>{airbnbSnapshot.reviews}</small>
          </div>
          <div>
            <span>Hosted by</span>
            <strong>{airbnbSnapshot.host}</strong>
            <small>{airbnbSnapshot.hostScore}</small>
          </div>
          <div>
            <span>Response</span>
            <strong>100%</strong>
            <small>Within an hour</small>
          </div>
          <div>
            <span>Co-hosts</span>
            <strong>Thomas</strong>
            <small>Maaike</small>
          </div>
        </div>

        <div className="detailGrid">
          <article className="detailPanel primaryDetail">
            <p className="sectionKicker">Quick facts</p>
            <div className="factGrid">
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="detailPanel">
            <p className="sectionKicker">Listing highlights</p>
            <div className="highlightList">
              {listingHighlights.map((highlight) => (
                <div key={highlight.label}>
                  <strong>{highlight.label}</strong>
                  <p>{highlight.value}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="storyGrid">
          {stayStory.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="amenityBlock">
          <div>
            <p className="sectionKicker">What guests need to know</p>
            <h2>Enough practical detail to decide without leaving the story.</h2>
          </div>
          <div className="amenityGrid">
            {amenityGroups.map((group) => (
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
              <h2>{airbnbSnapshot.rating}</h2>
              <span>{airbnbSnapshot.reviews} · 93% five-star rating mix</span>
            </div>

            <div className="scoreGrid">
              {reviewScores.map((score) => (
                <div key={score.label}>
                  <span>{score.label}</span>
                  <strong>{score.value}</strong>
                </div>
              ))}
            </div>

            <div className="mentionCloud" aria-label="Review themes">
              {reviewMentions.map((mention) => (
                <span key={mention}>{mention}</span>
              ))}
            </div>
          </section>

          <aside className="bookingPanel" aria-label="Booking next step">
            <p className="sectionKicker">Booking flow</p>
            <h2>Keep the final transaction on Airbnb for now.</h2>
            <ol>
              {bookingSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a
              className="primaryButton dark"
              href={AIRBNB_URL}
              target="_blank"
              rel="noreferrer"
            >
              Check dates on Airbnb
            </a>
            <small>{airbnbSnapshot.note}</small>
          </aside>
        </div>

        <section className="locationRules" aria-label="Location and rules">
          <article>
            <p className="sectionKicker">Location</p>
            <h2>Stekene, between Antwerp and Ghent.</h2>
            <p>
              The listing positions Casa Cabane in Stekene, with Antwerp and
              Ghent close enough to support city-day context while the property
              itself stays anchored in nature, lake, garden, and quiet.
            </p>
          </article>
          <article>
            <p className="sectionKicker">House notes</p>
            <ul>
              <li>Check-in after 16:00.</li>
              <li>Checkout before 11:00.</li>
              <li>Maximum 7 guests.</li>
              <li>Smoke alarm listed; carbon monoxide alarm not reported.</li>
              <li>Cleaning and post-checkout inspection are included in the Airbnb booking setup.</li>
            </ul>
          </article>
        </section>
      </section>

      <div className="mobileBookingBar" aria-label="Mobile booking shortcut">
        <span>
          {airbnbSnapshot.rating} · {airbnbSnapshot.reviews}
        </span>
        <a href={AIRBNB_URL} target="_blank" rel="noreferrer">
          Check dates
        </a>
      </div>

      {isJourneyOpen ? (
        <section
          ref={journeyRef}
          className="journey"
          role="dialog"
          aria-modal="true"
          aria-label="Casa Cabane guided walkthrough"
        >
          <video
            ref={videoRef}
            className="journeyVideo"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            autoPlay={!isReducedMotion}
            onLoadedMetadata={handleVideoMetadata}
            onTimeUpdate={handleVideoTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
            aria-label="Casa Cabane walkthrough video"
          />
          <div className="journeyScrim" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />

          <header className="journeyTop">
            <div className="journeyLeftActions">
              <button className="utilityButton" type="button" onClick={closeJourney}>
                Exit
              </button>
              <Link className="utilityButton" href="/">
                Collection
              </Link>
            </div>
            <div className="journeyBrand">
              <span>House of Wander</span>
              <span>Casa Cabane</span>
            </div>
            <a
              className="utilityButton utilityLink"
              href={AIRBNB_URL}
              target="_blank"
              rel="noreferrer"
            >
              Airbnb
            </a>
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
        context="Casa Cabane"
        intro="I can guide you through Casa Cabane, explain what comes from Airbnb, and point out what still needs live confirmation before booking."
        prompts={amigoPrompts}
      />
    </main>
  );
}
