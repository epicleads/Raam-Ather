import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services | Raam Ather - Premium Electric Scooter Services in Hyderabad & Chennai',
  description: 'Discover Raam Ather\'s comprehensive services including sales, maintenance, test rides, financing, and charging solutions for Ather electric scooters in Hyderabad & Chennai.',
  keywords: 'Raam Ather services, electric scooter maintenance, Ather service center, EV charging, test rides, financing, Hyderabad, Chennai',
  openGraph: {
    title: 'Services | Raam Ather - Premium Electric Scooter Services',
    description: 'Comprehensive electric scooter services including sales, maintenance, charging solutions, and premium customer support.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raam Ather',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Raam Ather - Premium EV Services',
    description: 'Expert electric scooter services, maintenance, and support in Hyderabad & Chennai.',
  },
  alternates: {
    canonical: '/Services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <div className="font-neurial">
      <ServicesClient />
    </div>
  );
}