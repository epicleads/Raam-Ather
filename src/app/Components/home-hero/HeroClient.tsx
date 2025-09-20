'use client';

import dynamic from 'next/dynamic';

// Loading skeleton for Hero to prevent layout shift with exact dimensions
const HeroSkeleton = () => (
  <section className="relative w-full h-screen bg-gradient-to-br from-black to-gray-900" style={{ minHeight: '100vh', maxHeight: '100vh' }}>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white max-w-4xl px-4">
        <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-8 animate-pulse" />
        <div className="h-12 bg-gray-700 rounded w-96 mx-auto mb-6 animate-pulse" />
        <div className="h-6 bg-gray-700 rounded w-80 mx-auto mb-8 animate-pulse" />
        <div className="h-12 bg-gray-700 rounded w-48 mx-auto animate-pulse" />
      </div>
    </div>
    {/* Ensure skeleton has same overlay structure as real hero */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-30" />
  </section>
);

// Dynamic import for Hero with proper loading state
const Hero = dynamic(() => import('./Hero'), {
  loading: () => <HeroSkeleton />,
  ssr: true // Enable SSR to prevent layout shift
});

export default function HeroClient() {
  return <Hero />;
}