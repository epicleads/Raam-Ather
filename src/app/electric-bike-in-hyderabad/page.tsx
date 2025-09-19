import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://raamather.com/electric-scooter-hyderabad',
  },
};

export default function ElectricBikeRedirectPage() {
  redirect('/electric-scooter-hyderabad');
}
