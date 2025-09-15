import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

export function generateMetadata({ title, description, keywords }: PageMetadata): Metadata {
  const fullTitle = `${title} | Growth Tube`;
  
  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      siteName: 'Growth Tube',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

export const defaultMetadata = {
  title: 'Growth Tube - Personal Development Platform',
  description: 'Transform your life with Growth Tube - the ultimate platform for personal development, learning, and growth.',
  keywords: ['personal development', 'learning', 'growth', 'education', 'self improvement'],
};