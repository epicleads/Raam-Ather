import { Metadata } from 'next';
import ContactUsServer from './ContactUsServer';


export const metadata: Metadata = {
  title: 'Contact Raam Ather - Electric Scooter Dealer Hyderabad & Chennai | Test Rides & Support',
  description: 'Get in touch with Raam Ather, premier Ather Energy dealer in Hyderabad & Chennai. Book test rides, find nearest outlets, get support. Call now for EV consultation.',
  keywords: 'Raam Ather contact, Ather dealer Hyderabad, Ather dealer Chennai, electric scooter test ride, EV support, Ather showroom contact, electric vehicle consultation',
  openGraph: {
    title: 'Contact Raam Ather - Your Trusted EV Partner in Hyderabad & Chennai',
    description: 'Questions about electric scooters? Book a test ride or visit our showrooms. Expert support for Ather 450X & financing options.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raam Ather',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Raam Ather - Electric Scooter Dealer',
    description: 'Get expert EV consultation, book test rides & find nearest outlets in Hyderabad & Chennai.',
  },
  alternates: {
    canonical: 'https://raamather.com/ContactUs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactUsPage() {
  return (
    <div className="font-neurial">
      <ContactUsServer />
    </div>
  );
}
