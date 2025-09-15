import { Metadata } from 'next';

export const dummyHeaderMetadata: Metadata = {
  title: 'Raam Ather Navigation – Explore Scooters, Finance, Testimonials',
  description: 'Navigate through Raam Ather\'s electric scooters, financing options, testimonials, and more. Find dealers, book test rides, and explore our ecosystem.',
  keywords: ['Raam Ather', 'electric scooters', 'navigation', 'Rizta', 'Ather 450', '450 Apex', 'testimonials', 'finance'],
};

interface DummyHeaderSEOProps {
  children?: React.ReactNode;
}

export default function DummyHeaderSEO({ children }: DummyHeaderSEOProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Raam Ather',
            description: 'Premium electric scooters and testimonials',
            url: 'https://raamather.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://raamather.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
      {children}
    </>
  );
}