import { Suspense } from 'react';

// Server Components
import TestimonialsSEO from './TestimonialsSEO';
import HeroSection from '../client/HeroSection.client';
import UGCWall from './UGCWall';
import GoogleReviews from './GoogleReviews';
import InsightsSnapshot from './InsightsSnapshot';

// Loading Components
function SectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-white rounded-xl p-8 animate-pulse border border-gray-200 shadow-sm">
            <div className="h-32 bg-gray-200 rounded mb-4" />
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
  return (
    <>
      {/* SEO Component - Must be at the very top for proper metadata */}
      <TestimonialsSEO />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroSection />

        {/* UGC Wall */}
        <Suspense fallback={<SectionSkeleton />}>
          <UGCWall />
        </Suspense>

        {/* Google Reviews */}
        <Suspense fallback={<SectionSkeleton />}>
          <GoogleReviews />
        </Suspense>

        {/* Insights Snapshot */}
        <Suspense fallback={<SectionSkeleton />}>
          <InsightsSnapshot />
        </Suspense>
      </main>
    </>
  );
}