import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StayExperience } from "../../components/stay-experience";
import { getStayBySlug, stays } from "../../lib/stays";

type StayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return stays.map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({
  params
}: StayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStayBySlug(slug);

  if (!stay) {
    return {
      title: "Stay not found - House of Wander"
    };
  }

  return {
    title: `${stay.name} - House of Wander`,
    description: stay.description
  };
}

export default async function StayPage({ params }: StayPageProps) {
  const { slug } = await params;
  const stay = getStayBySlug(slug);

  if (!stay) notFound();

  return <StayExperience stay={stay} />;
}
