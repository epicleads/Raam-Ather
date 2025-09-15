'use client';

import { useState, Suspense } from 'react';
import { Filters } from '../../data/testimonials.types';
import { purchaseTestimonials, serviceTestimonials, communityTestimonials } from '../../data/testimonials.mock';

// Server Components
import TestimonialsSEO from '../server/TestimonialsSEO';
import HeroSection from './HeroSection.client';
import UGCWall from '../server/UGCWall';
import GoogleReviews from '../server/GoogleReviews';

// Client Components
import TestimonialsFeed from './TestimonialsFeed.client';
import ReactionsBar from './ReactionsBar.client';


export const revalidate = 120;

// Loading Components
function FeedSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-white rounded-lg p-3 sm:p-4 animate-pulse border border-gray-200 shadow-sm max-w-sm">
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

function SectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <div className="h-8 sm:h-12 bg-gray-200 rounded w-48 mx-auto mb-3 sm:mb-4 animate-pulse" />
        <div className="h-4 sm:h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-8 animate-pulse border border-gray-200 shadow-sm">
            <div className="h-24 sm:h-32 bg-gray-200 rounded mb-4" />
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

export default function TestimonialsPage() {
  const [filters] = useState<Filters>({});

  return (
    <>
      {/* SEO Component - Must be at the very top for proper metadata */}
      <TestimonialsSEO />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroSection />

        {/* Social Moments - Moved to top */}
        <Suspense fallback={<SectionSkeleton />}>
          <UGCWall />
        </Suspense>

        {/* Testimonials Feed - Customer Voices */}
        <Suspense fallback={<FeedSkeleton />}>
          <TestimonialsFeed
            purchaseTestimonials={purchaseTestimonials}
            serviceTestimonials={serviceTestimonials}
            communityTestimonials={communityTestimonials}
            filters={filters}
          />
        </Suspense>

        {/* Reactions Bar */}
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse mx-6 rounded-xl" />}>
          <ReactionsBar />
        </Suspense>

        {/* Google Reviews */}
        <Suspense fallback={<SectionSkeleton />}>
          <GoogleReviews />
        </Suspense>


      </main>
    </>
  );
}
