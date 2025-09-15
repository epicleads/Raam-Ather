import { Suspense } from "react";
import HeroSlider from "./client/HeroSlider.client";
import { HeroScrollIndicator } from "./client/HeroScrollIndicator.client";
import { HeroSEO } from "./server/HeroSEO";
import { fetchHeroData } from "@/lib/fetchHeroData";

export const revalidate = 0; // Disable default ISR since we'll tag manually

export default async function Hero() {
  const heroData = await fetchHeroData();
  
  // Convert HeroItem data to VideoSlide format expected by HeroSlider
  const slides = heroData.map(item => ({
    id: item.id,
    src: item.src,
    mobileSrc: item.mobileSrc, // Add mobileSrc property
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
      <section className="relative w-full h-screen bg-black" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <Suspense fallback={<p className="text-white">Loading...</p>}>
          <HeroSlider slides={slides} />
        </Suspense>
        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
