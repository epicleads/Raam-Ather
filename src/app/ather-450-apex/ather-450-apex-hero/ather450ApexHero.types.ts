export interface HeroItem {
    id: string;
    type: "image" | "video";
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    primaryCTA: {
      label: string;
      href: string;
    };
    secondaryCTA?: {
      label: string;
      href: string;
    };
  }
  