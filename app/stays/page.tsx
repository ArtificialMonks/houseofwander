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
    "The House of Wander priority collection: Casa Cabane in Stekene, Casa Fabiola in Ghent, and Louise Marie in Ostend."
};

const previewImageFor = (stay: (typeof stays)[number]) =>
  stay.media.find((item) => item.type === "image" && item.src)?.src ??
  stay.posterSrc;

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
          <p className="eyebrow">Priority collection</p>
          <h1>Three stays, three doorways, one guided House of Wander world.</h1>
          <p>
            This page now focuses on Casa Cabane in Stekene, Casa Fabiola in
            Ghent, and Louise Marie in Ostend. Each stay has a main visual,
            source-labelled facts, and Amigo ready to guide the next step.
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
                {previewImageFor(stay) ? (
                  <img src={previewImageFor(stay)} alt="" />
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

      <section
        id="source-map"
        className="collectionSystemBand"
        aria-label="Collection readiness"
      >
        <div>
          <p className="sectionKicker">Team readiness</p>
          <h2>What this ecosystem now knows and what it still needs.</h2>
        </div>
        <div className="readinessList">
          <article>
            <span>Ready</span>
            <p>
              Routes, reusable stay pages, three main photos, Airbnb-informed
              facts, source labels, and Amigo prompts for the priority trio.
            </p>
          </article>
          <article>
            <span>Next photos</span>
            <p>
              The main photos are integrated. Wider gallery expansion still
              needs a clear approved source selection per stay.
            </p>
          </article>
          <article>
            <span>Later</span>
            <p>
              Other listings can return once the team approves naming, assets,
              and whether they belong in the public House of Wander collection.
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
