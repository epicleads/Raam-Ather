'use client';

import { HeroScrollIndicator } from "./client/HeroScrollIndicator.client";
import { HeroSEO } from "./server/HeroSEO";
import { HeroErrorBoundary } from "../ui/ErrorBoundary";
import { heroFallbackData } from "@/lib/heroFallbackData";
import HeroSlider from "./client/HeroSlider.client";

export default function Hero() {
  // Pre-process slides immediately for fastest loading
  const slides = heroFallbackData.map(item => ({
    id: item.id,
    src: item.src,
    mobileSrc: item.mobileSrc,
    poster: item.alt,
    title: item.title,
    subtitle: item.subtitle,
    ctaText: item.primaryCTA?.label || "Learn More",
    ctaLink: item.primaryCTA?.href || "/learn-more"
  }));

  return (
    <>
      <HeroSEO
        title="Ather Electric Scooters"
        description="Experience the future of mobility with Ather's premium electric scooters. Advanced technology, superior performance, and sustainable transportation."
      />
      <section className="home-hero relative w-full h-screen bg-black" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <HeroErrorBoundary>
          <HeroSlider slides={slides} />
        </HeroErrorBoundary>
        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
