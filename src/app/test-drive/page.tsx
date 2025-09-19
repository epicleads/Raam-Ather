import type { Metadata } from 'next';
import ContactPage from "../Components/contactform/contactserver";

export const metadata: Metadata = {
  title: 'Book Test Drive - Ather Electric Scooter | Raam Ather',
  description: 'Book a free test drive of Ather electric scooters in Hyderabad & Chennai. Experience Ather 450X, Rizta with expert guidance at Raam Ather showrooms.',
  keywords: [
    'Ather test drive',
    'book test drive',
    'electric scooter test drive',
    'Ather 450X test drive',
    'Ather Rizta test drive',
    'test drive Hyderabad',
    'test drive Chennai',
    'Raam Ather test drive',
    'electric vehicle test drive',
    'Ather scooter demo',
    'free test drive',
    'Ather showroom visit',
    'electric scooter experience',
    'Ather demo ride',
    'EV test drive'
  ],
  authors: [{ name: 'Raam Ather' }],
  openGraph: {
    title: 'Book Test Drive - Ather Electric Scooter | Raam Ather',
    description: 'Book a free test drive of Ather electric scooters in Hyderabad & Chennai. Experience Ather 450X, Rizta with expert guidance at Raam Ather showrooms.',
    images: [
      {
        url: '/Ather-Assets/test-drive-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Book Ather Electric Scooter Test Drive'
      }
    ],
    url: 'https://raamather.com/test-drive',
    siteName: 'Raam Ather',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Test Drive - Ather Electric Scooter | Raam Ather',
    description: 'Book a free test drive of Ather electric scooters in Hyderabad & Chennai. Experience Ather 450X, Rizta with expert guidance.',
    siteId: '@RaamAther',
    creator: '@RaamAther',
    creatorId: '@RaamAther',
    images: ['/Ather-Assets/test-drive-twitter-card.webp']
  },
  alternates: {
    canonical: 'https://raamather.com/test-drive'
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

export default function testDrivePage(){

    return(
        <ContactPage/>
    );
}
