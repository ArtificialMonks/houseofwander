import Link from "next/link";
import collectionSource from "../../source/stays/index.json";

type StyleVariant = {
  name: string;
  slug: string;
  description: string;
};

type CollectionSource = {
  styleVariants: StyleVariant[];
};

const collection = collectionSource as CollectionSource;

export const metadata = {
  title: "Style Lab - House of Wander",
  description:
    "Three House of Wander visual directions for the team to compare."
};

const styleDetails: Record<string, string[]> = {
  "editorial-warm": [
    "Best flagship direction for Casa Cabane and the main collection gateway.",
    "Warm ivory, moss, clay, restrained gold, cinematic serif headlines.",
    "Feels premium, grounded, and most aligned with the current prototype."
  ],
  "coastal-light": [
    "Best first test for Louise Marie and future coastal pages.",
    "Airier paper surfaces, sea-glass accents, lighter image treatment.",
    "Keeps the brand warm while making coastal stays feel brighter."
  ],
  "boutique-night": [
    "Kept as a later option for evening-led or romantic hideaway pages.",
    "Deep ink, amber highlights, intimate contrast, compact trust cards.",
    "Feels more hotel/editorial than beach apartment."
  ]
};

export default function StyleLabPage() {
  return (
    <main className="styleLabPage">
      <section className="styleLabHero">
        <header className="collectionNav">
          <Link className="wanderBrand" href="/">
            House of Wander
          </Link>
          <nav aria-label="Style lab navigation">
            <Link href="/stays">Stays</Link>
            <Link href="/stays/casa-cabane">Casa Cabane</Link>
          </nav>
        </header>

        <div className="styleLabHeroCopy">
          <p className="eyebrow">House style variations</p>
          <h1>Three looks for one guided stay ecosystem.</h1>
          <p>
            These are not separate builds. They are controlled visual directions
            the team can choose from while the underlying source data, Amigo
            guidance, and booking handoff stay consistent.
          </p>
        </div>
      </section>

      <section className="styleVariantGrid" aria-label="House style variations">
        {collection.styleVariants.map((variant) => (
          <article
            key={variant.slug}
            className={`styleVariantCard ${variant.slug}`}
          >
            <p className="sectionKicker">{variant.name}</p>
            <h2>{variant.description}</h2>
            <ul>
              {(styleDetails[variant.slug] ?? []).map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <Link href="/stays">View collection</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
