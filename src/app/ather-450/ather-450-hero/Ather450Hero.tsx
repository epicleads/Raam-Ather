import { Suspense } from "react";
import { Ather450HeroSlider } from "./client/Ather450HeroSlider.client";
import { HeroScrollIndicator } from "@/app/Components/home-hero/client/HeroScrollIndicator.client";
import { Ather450HeroSEO } from "./server/Ather450HeroSEO";
import type { HeroItem } from "@/app/ather-450/ather-450-hero/ather450Hero.types";

export const revalidate = 60;

const heroItems: HeroItem[] = [
  {
    id: "1",
    type: "image",
    src: "/Ather-Assets/450/Gallery-d-1.webp",
    mobileSrc: "/Ather-Assets/450/The-2025-Ather-450-m-new.webp",
    alt: "Ather 450 electric scooter on city road",
    title: "The 2025 Ather 450",
    subtitle: "Electric Excellence, Everyday",
    primaryCTA: { label: "Book Test Ride", href: "#" }
    
  },
  {
    id: "2",
    type: "image",
    src: "/Ather-Assets/450/Gallery-d-2.webp",
    alt: "Ather 450 performance image",
    title: "Unmatched Performance",
    subtitle: "Power Meets Efficiency",
    primaryCTA: { label: "Book Now", href: "#" }
  }
];

export default function Ather450Hero() {
  return (
    <>
      <Ather450HeroSEO
        title={heroItems[0].title}
        description={`${heroItems[0].title} - ${heroItems[0].subtitle}. Premium electric scooter with cutting-edge features.`}
      />
      <section className="relative w-full h-screen overflow-hidden bg-black ather450-container">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading...</div>}>
          <Ather450HeroSlider heroItems={heroItems} autoPlayInterval={5000} />
        </Suspense>
        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
