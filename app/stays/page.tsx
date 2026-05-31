import Link from "next/link";
import { stays } from "../lib/stays";

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
            <Link href="/stays/casa-cabane">Casa Cabane</Link>
          </nav>
        </header>

        <div className="collectionHeroCopy">
          <p className="eyebrow">Priority collection</p>
          <h1>Three stays, three doorways, one guided House of Wander world.</h1>
          <p>
            This page now focuses on Casa Cabane in Stekene, Casa Fabiola in
            Ghent, and Louise Marie in Ostend. Each stay has a main visual,
            clear stay detail, and a direct Airbnb handoff for live booking.
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
