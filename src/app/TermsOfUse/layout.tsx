import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Raam Ather - Electric Scooter Dealer',
  description: 'Terms of Use for Raam Ather electric scooter dealership. Read our terms and conditions for using our website and services.',
  keywords: 'terms of use, terms and conditions, Raam Ather terms, electric scooter terms, website terms',
  openGraph: {
    title: 'Terms of Use | Raam Ather',
    description: 'Terms of Use for Raam Ather electric scooter dealership. Read our terms and conditions.',
    url: 'https://raamather.com/TermsOfUse',
    siteName: 'Raam Ather',
    images: [
      {
        url: 'https://raamather.com/assets/terms-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Raam Ather Terms of Use',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use | Raam Ather',
    description: 'Terms of Use for Raam Ather electric scooter dealership.',
    images: ['https://raamather.com/assets/terms-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://raamather.com/TermsOfUse',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}