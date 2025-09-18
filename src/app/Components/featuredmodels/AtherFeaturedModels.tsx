'use client';

import React, { lazy, Suspense } from 'react';

// Dynamic imports for better code splitting
const AtherFeaturedModelsMobile = lazy(() => import('./AtherFeaturedModelsMobile'));
const AtherFeaturedModelsDesktop = lazy(() => import('./AtherFeaturedModelsDesktop'));

const LoadingSkeleton = () => (
  <div className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 md:mb-8 mt-4 md:mt-6">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

const AtherFeaturedModels: React.FC = () => {
  return (
    <section
      className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-label="Ather scooter collection"
      role="region"
    >
      {/* SEO-optimized heading structure */}
      <header className="sr-only">
        <h2>Raam Ather Collection</h2>
        <p>Experience the future of electric mobility with Ather&apos;s innovative smart scooters</p>
      </header>

      {/* Mobile View */}
      <div className="md:hidden">
        <Suspense fallback={<LoadingSkeleton />}>
          <AtherFeaturedModelsMobile />
        </Suspense>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Suspense fallback={<LoadingSkeleton />}>
          <AtherFeaturedModelsDesktop />
        </Suspense>
      </div>
    </section>
  );
};

export default React.memo(AtherFeaturedModels);
