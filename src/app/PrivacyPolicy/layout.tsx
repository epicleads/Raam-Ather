import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Raam Ather - Electric Scooter Dealer',
  description: 'Privacy Policy for Raam Ather electric scooter dealership. Learn how we protect your personal information and data privacy.',
  keywords: 'privacy policy, data protection, Raam Ather privacy, electric scooter privacy policy, personal information',
  openGraph: {
    title: 'Privacy Policy | Raam Ather',
    description: 'Privacy Policy for Raam Ather electric scooter dealership. Learn how we protect your personal information.',
    url: 'https://raamather.com/PrivacyPolicy',
    siteName: 'Raam Ather',
    images: [
      {
        url: 'https://raamather.com/assets/privacy-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Raam Ather Privacy Policy',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Raam Ather',
    description: 'Privacy Policy for Raam Ather electric scooter dealership.',
    images: ['https://raamather.com/assets/privacy-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://raamather.com/PrivacyPolicy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}