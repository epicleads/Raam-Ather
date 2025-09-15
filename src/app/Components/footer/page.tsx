import { Metadata } from 'next';
import FooterClient from './footerclient';

export const metadata: Metadata = {
  title: 'About Us | Raam Ather - Leading EV Dealer in Hyderabad & Chennai',
  description: 'Discover Raam Ather, your trusted Ather Energy partner in Hyderabad & Chennai. Experience premium electric mobility with world-class service, fast delivery, and community support.',
  keywords: 'Raam Ather, electric scooters, Ather Energy, Hyderabad, Chennai, EV dealer, sustainable mobility, electric vehicles',
  openGraph: {
    title: 'About Us | Raam Ather - Leading EV Dealer',
    description: 'Join the EV revolution with Raam Ather. Premium electric scooters, world-class service, and sustainable mobility solutions in Hyderabad & Chennai.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raam Ather',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Raam Ather - Leading EV Dealer',
    description: 'Join the EV revolution with Raam Ather. Premium electric scooters and sustainable mobility solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
};

export default function footerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <FooterClient />
    </main>
  );
}
