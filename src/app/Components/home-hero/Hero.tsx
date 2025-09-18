import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroScrollIndicator } from "./client/HeroScrollIndicator.client";
import { HeroSEO } from "./server/HeroSEO";
import { HeroErrorBoundary } from "../ui/ErrorBoundary";
import { fetchHeroData } from "@/lib/fetchHeroData";

// Dynamic import for HeroSlider with loading fallback
const HeroSlider = dynamic(() => import("./client/HeroSlider.client"), {
  loading: () => (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="text-white animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-lg font-neurial">Loading Hero Content...</p>
      </div>
    </div>
  ),
});

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
      <section className="home-hero relative w-full h-screen bg-black" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <HeroErrorBoundary>
          <Suspense fallback={
            <div className="h-screen bg-black flex items-center justify-center">
              <div className="text-white animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-lg font-neurial">Loading Hero Content...</p>
              </div>
            </div>
          }>
            <HeroSlider slides={slides} />
          </Suspense>
        </HeroErrorBoundary>
        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
