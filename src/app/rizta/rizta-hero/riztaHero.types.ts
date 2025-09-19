export interface HeroItem {
  id: string;
  type: "image" | "video";
  src: string;
  mobileSrc?: string; // Mobile-specific image source
  poster?: string; // Video poster image
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
