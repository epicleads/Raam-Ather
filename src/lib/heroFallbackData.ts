// src/lib/heroFallbackData.ts
import type { HeroItem } from "@/app/Components/home-hero/home-hero.types";

export const heroFallbackData: HeroItem[] = [
  {
    id: "1",
    type: "image",
    src: "/assets/desktophero.jpeg",
    mobileSrc: "/assets/mobilehero.jpeg",
    alt: "Ather 450 electric scooter on city road",
    title: "The 2025 Ather",
    subtitle: "Bike of Scooters",
    duration: 5000, // 5 seconds for images
    primaryCTA: {
      label: "Book Test Ride",
      href: "/book-ride",
    },
    secondaryCTA: {
      label: "Explore offers",
      href: "/offers",
    },
  },
  {
    id: "2",
    type: "image",
    src: "/assets/Blog2.webp",
    mobileSrc: "/Ather-Assets/Home/Rizta-most-awarded-ev-m.webp",
    alt: "Ather electric scooter performance video",
    title: "Performance",
    subtitle: "Experience Electric Excellence",
    duration: 0, // 0 for videos (handled by onended event)
    fallbackSrc: "/Ather-Assets/450-apex/450apex.png", // Fallback image for video
    primaryCTA: {
      label: "Book Test Ride",
      href: "/book-ride",
    },
    secondaryCTA: {
      label: "Test Ride",
      href: "/test-ride",
    },
  },
  // {
  //   id: "3",
  //   type: "image",
  //   src: "/assets/Blog8.webp",
  //   mobileSrc: "/Ather-Assets/Home/Ride-Warp.gif", // Add mobile version
  //   alt: "Ather smart features and connectivity",
  //   title: "Smart Connected",
  //   subtitle: "Intelligent Mobility Solutions",
  //   duration: 3000, // 3 seconds for GIFs
  //   primaryCTA: {
  //     label: "Book Test Ride",
  //     href: "/book-ride",
  //   },
  //   secondaryCTA: {
  //     label: "Learn More",
  //     href: "/smart-features",
  //   },
  // },
  // {
  //   id: "4",
  //   type: "image",
  //   src: "/assets/Blog12.webp",
  //   mobileSrc: "/Ather-Assets/Home/Mob - BaaS Banner.webp",
  //   alt: "Ather charging network and ecosystem",
  //   title: "Ather Ecosystem",
  //   subtitle: "Charging Network & Beyond",
  //   duration: 5000, // 5 seconds for images
  //   primaryCTA: {
  //     label: "Book Test Ride",
  //     href: "/book-ride",
  //   },
  //   secondaryCTA: {
  //     label: "Join Network",
  //     href: "/ather-network",
  //   },
  // },
];
