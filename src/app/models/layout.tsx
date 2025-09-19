import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ather Electric Scooter Models - 450X, Rizta | Raam Ather',
  description: 'Compare all Ather electric scooter models - Ather 450X, Ather Rizta. Specifications, prices, and features at Raam Ather dealership.',
  keywords: [
    'Ather models',
    'Ather 450X',
    'Ather Rizta',
    'Ather 450S',
    'Ather Apex',
    'electric scooter models',
    'Ather comparison',
    'electric vehicle models',
    'Ather specifications',
    'Ather prices',
    'Raam Ather models',
    'Ather features',
    'electric scooter comparison',
    'Ather range',
    'best Ather model'
  ],
  authors: [{ name: 'Raam Ather' }],
  openGraph: {
    title: 'Ather Electric Scooter Models - 450X, Rizta | Raam Ather',
    description: 'Compare all Ather electric scooter models - Ather 450X, Ather Rizta. Specifications, prices, and features at Raam Ather dealership.',
    images: [
      {
        url: '/Ather-Assets/models-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Ather Electric Scooter Models Comparison'
      }
    ],
    url: 'https://raamather.com/models',
    siteName: 'Raam Ather',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ather Electric Scooter Models - 450X, Rizta | Raam Ather',
    description: 'Compare all Ather electric scooter models - Ather 450X, Ather Rizta. Specifications, prices, and features.',
    siteId: '@RaamAther',
    creator: '@RaamAther',
    creatorId: '@RaamAther',
    images: ['/Ather-Assets/models-twitter-card.webp']
  },
  alternates: {
    canonical: 'https://raamather.com/models'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/manifest.json',
  category: 'technology',
  classification: 'Electric Vehicles, Transportation, Technology'
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}