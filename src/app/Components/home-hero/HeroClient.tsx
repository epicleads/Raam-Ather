'use client';

import dynamic from 'next/dynamic';

// Dynamic import for Hero without loading skeleton for faster loading
const Hero = dynamic(() => import('./Hero'), {
  ssr: false // Disable SSR for Hero to prevent hydration issues with video content
});

export default function HeroClient() {
  return <Hero />;
}