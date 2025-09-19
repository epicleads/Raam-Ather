
import type { Metadata } from 'next';
import { Suspense, lazy } from 'react';

// Dynamic imports for code splitting
const Ather450ApexHero = lazy(() => import('./ather-450-apex-hero/Ather450ApexHero'));
const Performance = lazy(() => import('./performance/Performance'));
const Safety = lazy(() => import('./safety/safety'));
const Comfort = lazy(() => import('./comfort/comfort'));
const FAQ = lazy(() => import('./faq'));
const CTASection = lazy(() => import('./CTA'));
const FooterClient = lazy(() => import('../Components/footer/footerclient'));

// Loading skeletons
const HeroSkeleton = () => (
  <div className="w-full h-screen bg-gradient-to-br from-black to-gray-800 animate-pulse">
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white">
        <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
        <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-48 mx-auto animate-pulse"></div>
      </div>
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="w-full py-16 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const FooterSkeleton = () => (
  <div className="w-full h-96 bg-gray-800 animate-pulse"></div>
);

// SEO metadata
export const metadata: Metadata = {
  title: 'Ather 450 Apex Electric Scooter - Ultimate Performance | Raam Ather',
  description: 'Experience the fastest Ather ever! 450 Apex with 6.4kW power, 90kmph top speed, 150km range. Warp+™ mode, ABS braking, traction control. Book test ride in Hyderabad & Chennai.',
  keywords: [
    'Ather 450 Apex',
    'electric scooter',
    'fastest Ather',
    'Warp+ mode',
    '90 kmph scooter',
    'ABS braking',
    'traction control',
    'electric vehicle Hyderabad',
    'electric scooter Chennai',
    'Ather dealer',
    'high performance scooter'
  ],
  openGraph: {
    title: 'Ather 450 Apex - Ultimate Performance Electric Scooter | Raam Ather',
    description: 'The fastest Ather ever! 6.4kW power, 90kmph top speed, 150km range with Warp+™ mode. Advanced safety features.',
    images: [
      {
        url: '/Ather-Assets/450-apex/ather-450-apex-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Ather 450 Apex Electric Scooter - Ultimate Performance'
      }
    ],
    url: 'https://raamather.com/ather-450-apex',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ather 450 Apex - Ultimate Performance',
    description: 'The fastest Ather ever! Experience 90kmph top speed and Warp+™ mode.',
    images: ['/Ather-Assets/450-apex/ather-450-apex-twitter-card.webp']
  },
  alternates: {
    canonical: 'https://raamather.com/ather-450-apex'
  }
};

// Structured data for SEO
const apexPageSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ather 450 Apex",
  "productGroupID": "ather-450-series",
  "brand": {
    "@type": "Brand",
    "name": "Ather Energy"
  },
  "category": "Electric Scooter",
  "description": "Ultimate performance electric scooter with 6.4kW power, 90kmph top speed, 150km range, Warp+™ mode, ABS braking, and traction control.",
  "image": [
    "https://raamather.com/Ather-Assets/450-apex/ather-450-apex-main.webp",
    "https://raamather.com/Ather-Assets/450-apex/ather-450-apex-performance.webp",
    "https://raamather.com/Ather-Assets/450-apex/ather-450-apex-safety.webp"
  ],
  "offers": {
    "@type": "Offer",
    "name": "Ather 450 Apex",
    "price": "189999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2024-12-31",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Raam Ather",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89",
    "bestRating": "5",
    "worstRating": "1"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Top Speed",
      "value": "90 kmph"
    },
    {
      "@type": "PropertyValue",
      "name": "Range",
      "value": "150 km"
    },
    {
      "@type": "PropertyValue",
      "name": "Peak Power",
      "value": "6.4 kW"
    },
    {
      "@type": "PropertyValue",
      "name": "Acceleration",
      "value": "0-40 kmph in 3.3s"
    }
  ]
};

export default function Ather450ApexPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(apexPageSchema) }}
      />

      {/* Critical resource preloads */}
      <link rel="preload" href="/Ather-Assets/450-apex/ather-450-apex-hero-main.webp" as="image" />
      <link rel="preload" href="/fonts/NeuralGrotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />

      <main className="min-h-screen bg-gray-50">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Ather 450 Apex Electric Scooter - Ultimate Performance, Speed & Safety Features</h1>

        {/* Hero Section */}
        <Suspense fallback={<HeroSkeleton />}>
          <Ather450ApexHero />
        </Suspense>

        {/* Performance Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <Performance />
        </Suspense>

        {/* Safety Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <Safety />
        </Suspense>

        {/* Comfort Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <Comfort />
        </Suspense>

        {/* CTA Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<FooterSkeleton />}>
          <FooterClient />
        </Suspense>
      </main>
    </>
  );
}
