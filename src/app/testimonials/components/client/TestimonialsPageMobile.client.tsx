'use client';

import { Suspense, useState } from 'react';
import TestimonialsSEO from '../server/TestimonialsSEO';
import HeroSection from './HeroSection.client';
import ReactionsBar from './ReactionsBar.client';
import UGCWall from '../server/UGCWall';
import GoogleReviews from '../server/GoogleReviews';
import TestimonialsFeedMobile from './TestimonialsFeedMobile.client';
import type { Filters } from '../../data/testimonials.types';
import { purchaseTestimonials, serviceTestimonials, communityTestimonials } from '../../data/testimonials.mock';

export const revalidate = 120;

// Mobile Loading Components
function FeedSkeletonMobile() {
  return (
    <div className="px-4 py-6">
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-2 bg-gray-200 rounded w-12" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionSkeletonMobile() {
  return (
    <div className="px-4 py-8">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-gray-200 shadow-sm">
            <div className="h-24 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsPageMobile() {
  const [filters] = useState<Filters>({});

  return (
    <>
      {/* SEO Component - Must be at the very top for proper metadata */}
      <TestimonialsSEO />
      
      <main className="min-h-screen bg-white w-full overflow-x-hidden">
        {/* Hero at top */}
        <Suspense fallback={<SectionSkeletonMobile />}>
          <HeroSection />
        </Suspense>

        {/* Social Moments - Moved to top */}
        <Suspense fallback={<SectionSkeletonMobile />}>
          <UGCWall />
        </Suspense>


        {/* Customer Voices */}
        <Suspense fallback={<FeedSkeletonMobile />}>
          <TestimonialsFeedMobile
            purchaseTestimonials={purchaseTestimonials}
            serviceTestimonials={serviceTestimonials}
            communityTestimonials={communityTestimonials}
            filters={filters}
          />
        </Suspense>

        {/* Reactions Bar */}
        <Suspense fallback={<SectionSkeletonMobile />}>
          <ReactionsBar className="mx-4 my-4" />
        </Suspense>

        {/* Google Reviews */}
        <Suspense fallback={<SectionSkeletonMobile />}>
          <GoogleReviews />
        </Suspense>


      </main>
    </>
  );
}
