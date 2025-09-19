import { Suspense } from "react";
import { RiztaHeroSlider } from "./client/RiztaHeroSlider.optimized";
import { HeroScrollIndicator } from "@/app/Components/home-hero/client/HeroScrollIndicator.client";
import { RiztaHeroSEO } from "./server/RiztaHeroSEO";
import type { HeroItem } from "./riztaHero.types";

export const revalidate = 180; // ISR: revalidates every 3 minutes

const heroItems: HeroItem[] = [
  {
    id: "rizta-family",
    type: "image",
    src: "/Ather-Assets/Rizta/mother-daughter-riding-scene-desk-updated.webp",
    mobileSrc: "/Ather-Assets/Rizta/rizta-mobile-hero-family.webp",
    alt: "Mother and daughter riding Ather Rizta Z electric scooter - family-friendly design",
    title: "Ather Rizta Z",
    subtitle: "Family Meets Performance",
    primaryCTA: {
      label: "Book Test Ride",
      href: "/test-ride?model=rizta-z"
    }
  },
  {
    id: "rizta-performance",
    type: "video",
    src: "/Ather-Assets/Rizta/rizta-performance-video.mp4",
    poster: "/Ather-Assets/Rizta/rizta-video-poster.webp",
    alt: "Ather Rizta Z electric scooter performance and features showcase video",
    title: "Smooth. Smart. Spacious.",
    subtitle: "Built for Every Journey",
    primaryCTA: {
      label: "Explore Features",
      href: "#features"
    }
  },
  {
    id: "rizta-technology",
    type: "image",
    src: "/Ather-Assets/Rizta/rizta-touchscreen-dashboard-hero.webp",
    mobileSrc: "/Ather-Assets/Rizta/rizta-mobile-dashboard.webp",
    alt: "Ather Rizta Z 7-inch touchscreen dashboard with Google Maps navigation",
    title: "7\" DeepView Display",
    subtitle: "Navigate. Connect. Control.",
    primaryCTA: {
      label: "View Pricing",
      href: "#pricing"
    }
  }
];

export default function RiztaHero() {
  return (
    <>
      <RiztaHeroSEO
        title={heroItems[0].title}
        description={`${heroItems[0].title} - ${heroItems[0].subtitle}. Spacious, stylish, and powerful — the Ather Rizta Z is your perfect ride.`}
      />

      <section 
        className="relative w-full h-screen overflow-hidden bg-black rizta-container"
        aria-label="Ather Rizta Z electric scooter hero showcase"
        role="banner"
      >
        <Suspense
          fallback={
            <div 
              className="flex items-center justify-center w-full h-full text-white"
              aria-label="Loading Rizta Z content"
              role="status"
            >
              <div className="text-center">
                <div className="text-2xl mb-4" aria-live="polite">
                  Loading Rizta Z...
                </div>
                <div 
                  className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          }
        >
          <RiztaHeroSlider heroItems={heroItems} autoPlayInterval={6000} />
        </Suspense>

        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
