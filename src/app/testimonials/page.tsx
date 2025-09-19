import { Suspense } from 'react';
import TestimonialsSEO from './components/server/TestimonialsSEO';
import TestimonialsPageMobile from './components/client/TestimonialsPageMobile.client';
import TestimonialsPage from './components/client/TestimonialsPage.client';
import FooterClient from '../Components/footer/footerclient';

export const revalidate = 120;

export const metadata = {
  title: 'Raam Ather Reviews & Testimonials — Real Riders. Real Trust.',
  description: 'Verified customer reviews of Raam Ather across Hyderabad & Chennai. Hear purchase journeys, service experiences, and community stories.',
  keywords: 'Raam Ather reviews, customer testimonials, electric scooter reviews, Hyderabad, Chennai, verified reviews',
  alternates: {
    canonical: 'https://raamather.com/testimonials',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TestimonialsPageMain() {
  return (
    <>
      <TestimonialsSEO />
      {/* Mobile View */}
      <div className="block md:hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <TestimonialsPageMobile />
        </Suspense>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Suspense fallback={<div>Loading...</div>}>
          <TestimonialsPage />
        </Suspense>
      </div>

      {/* Footer */}
      <FooterClient />

      {/* TestRideForm - COMMENTED OUT AS REQUESTED */}
      {/* <TestRideForm timerDelay={7.5} /> */}
    </>
  );
}