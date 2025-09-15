import { Suspense } from "react";
import type { HeroItem } from "./ather450ApexHero.types";
import { Ather450ApexSlider } from "./client/Ather450ApexSlider.client";
import { HeroScrollIndicator } from "../../Components/home-hero/client/HeroScrollIndicator.client";
import Ather450ApexSEO from "./server/Ather450ApexSEO";

export const revalidate = 60; // ISR - refresh every 60s

const heroItems: HeroItem[] = [
  {
    id: "1",
    type: "image",
    src: "/Ather-Assets/450-apex/Ather-450-apex-traction-control-d.webp",
    alt: "Ather 450 Apex",
    title: "Apex of Performance",
    subtitle: "The Fastest Ather Ever",
    primaryCTA: {
      label: "Book Now",
      href: "#"
    }
  },
  {
    id: "2",
    type: "image",
    src: "/Ather-Assets/450-apex/450apex.png",
    alt: "Ather 450 Apex",
    title: "Design in Motion",
    subtitle: "Aerodynamic & Stunning",
    primaryCTA: {
      label: "Book Test Ride",
      href: "#"
    }
  }
];

export default function Ather450ApexHero() {
  return (
    <>
      <Ather450ApexSEO />

      <section
        className="relative w-full h-screen overflow-hidden ather450-container"
        style={{
          background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)"
        }}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-xl">Loading Apex...</p>
              </div>
            </div>
          }
        >
          <Ather450ApexSlider heroItems={heroItems} autoPlayInterval={5000} />
        </Suspense>

        <HeroScrollIndicator isVisible={true} />
      </section>
    </>
  );
}
