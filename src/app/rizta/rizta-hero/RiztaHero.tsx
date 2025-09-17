import { Suspense } from "react";
import { RiztaHeroSlider } from "./client/RiztaHeroSlider.client";
import { HeroScrollIndicator } from "@/app/Components/home-hero/client/HeroScrollIndicator.client";
import { RiztaHeroSEO } from "./server/RiztaHeroSEO";
import type { HeroItem } from "./riztaHero.types";

export const revalidate = 60; // ISR: revalidates every 60s

const heroItems: HeroItem[] = [
  {
    id: "1",
    type: "image",
    src: "/Ather-Assets/Rizta/mother and daughter riding scene-desk-updatedatherrizta.jpg",
    mobileSrc: "/Ather-Assets/Rizta/riztacardemomgreenfrontdashboard.jpg",
    alt: "Ather Rizta electric scooter in city",
    title: "Ather Rizta Z",
    subtitle: "Family Meets Performance",
    primaryCTA: {
      label: "Book Test Ride",
      href: "#"
    }
  },
  {
    id: "2",
    type: "video",
    src: "/Ather-Assets/Rizta/Space Story_desk_2.mp4",
    alt: "Ather Rizta electric scooter performance video",
    title: "Smooth. Smart. Spacious.",
    subtitle: "Built for Every Journey",
    primaryCTA: {
      label: "Book Test Ride",
      href: "#"
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

      <section className="relative w-full h-screen overflow-hidden bg-black rizta-container">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full text-white">
              <div className="text-center">
                <div className="text-2xl mb-4">Loading Rizta Z...</div>
                <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
              </div>
            </div>
          }
        >
          <RiztaHeroSlider heroItems={heroItems} autoPlayInterval={5000} />
        </Suspense>

        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
