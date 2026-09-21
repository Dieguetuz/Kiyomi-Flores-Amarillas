import { Metadata } from 'next';
import { getRecipientConfig, RECIPIENTS } from '@/config/recipients';
import { GardenExperience } from '@/components/GardenExperience';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getRecipientConfig(params.slug);
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(RECIPIENTS).map((slug) => ({
    slug,
  }));
}

export default function RecipientPage({ params }: PageProps) {
  const config = getRecipientConfig(params.slug);
  return <GardenExperience config={config} />;
}
