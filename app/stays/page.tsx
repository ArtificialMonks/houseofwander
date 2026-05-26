import Link from "next/link";
import { AmigoGuide } from "../components/amigo-guide";
import collectionSource from "../../source/stays/index.json";
import { stays } from "../lib/stays";

type CollectionSource = {
  amigoPrompts: {
    label: string;
    answer: string;
    actionLabel?: string;
    actionHref?: string;
    sourceLabel?: string;
  }[];
};

const collection = collectionSource as CollectionSource;

export const metadata = {
  title: "Stays - House of Wander",
  description:
    "The House of Wander collection: Casa Cabane, Casa Fabiola, Louise Marie, Thelma & Louise, Heritage Collection, and The Love Nest."
};

export default function StaysPage() {
  return (
    <main className="collectionPage">
      <section className="collectionHero" aria-label="House of Wander collection">
        <header className="collectionNav">
          <Link className="wanderBrand" href="/">
            House of Wander
          </Link>
          <nav aria-label="Collection navigation">
            <Link href="/">Gateway</Link>
            <Link href="/style-lab">Styles</Link>
            <Link href="/stays/casa-cabane">Casa Cabane</Link>
          </nav>
        </header>

        <div className="collectionHeroCopy">
          <p className="eyebrow">Full collection</p>
          <h1>Every stay gets a doorway, a detail layer, and a guide.</h1>
          <p>
            This page brings the House of Wander ecosystem together: flagship
            Casa Cabane, public Airbnb facts where available, briefing stories,
            source labels, and safe photo slots for the team to complete.
          </p>
        </div>
      </section>

      <section className="collectionGridBand" aria-label="All stays">
        <div className="collectionGrid">
          {stays.map((stay) => (
            <Link
              key={stay.slug}
              className={`collectionStayCard ${stay.styleVariant}`}
              href={`/stays/${stay.slug}`}
            >
              <div className="collectionStayMedia" aria-hidden="true">
                {stay.posterSrc ? (
                  <img src={stay.posterSrc} alt="" />
                ) : (
                  <span />
                )}
              </div>
              <div className="collectionStayBody">
                <p className="stayStatus">{stay.status}</p>
                <h2>{stay.name}</h2>
                <p className="stayLocation">{stay.location}</p>
                <p>{stay.description}</p>
                <div className="sourcePills">
                  <span>{stay.region}</span>
                  <span>{stay.sourceStatus}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="collectionSystemBand" aria-label="Collection readiness">
        <div>
          <p className="sectionKicker">Team readiness</p>
          <h2>What this ecosystem now knows and what it still needs.</h2>
        </div>
        <div className="readinessList">
          <article>
            <span>Ready</span>
            <p>
              Routes, reusable stay pages, Casa Cabane media, style variations,
              source labels, and Amigo prompts.
            </p>
          </article>
          <article>
            <span>Needs assets</span>
            <p>
              Owner-approved photo sets for every non-Casa stay before using
              Airbnb-style galleries with real images.
            </p>
          </article>
          <article>
            <span>Needs facts</span>
            <p>
              Airbnb URLs, capacities, amenities, rules, safety notes, reviews,
              and final host approvals for the briefing-only stays.
            </p>
          </article>
        </div>
      </section>

      <AmigoGuide
        context="House of Wander stays"
        intro="I can help compare the collection, explain which stays are ready, and point out what still needs Airbnb or host confirmation."
        prompts={collection.amigoPrompts}
      />
    </main>
  );
}
