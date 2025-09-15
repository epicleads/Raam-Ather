export interface HeroItem {
    id: string;
    type: 'image' | 'video' | 'gif';
    src: string;
    mobileSrc?: string; // Mobile-specific image source
    alt?: string;
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
    duration?: number; // NEW: in milliseconds, used for autoplay timing
    fallbackSrc?: string; // NEW: fallback image for videos when autoplay fails
  }
  
  export interface HeroProps {
    heroItems: HeroItem[];
    autoPlayInterval?: number;
  }
  
  export interface HeroSliderProps {
    heroItems: HeroItem[];
    autoPlayInterval?: number;
    onSlideChange?: (index: number) => void;
  }
  
  export interface HeroMediaProps {
    item: HeroItem;
    isActive: boolean;
    priority?: boolean;
    onVideoLoad?: (duration: number, videoId: string) => void;
    onVideoEnd?: () => void;
    onVideoRegister?: (videoElement: HTMLVideoElement) => void;
  }
  
  export interface HeroCTAGroupProps {
    primaryCTA: {
      label: string;
      href: string;
    };
    secondaryCTA?: {
      label: string;
      href: string;
    };
  }
  
  export interface HeroHeadingProps {
    title: string;
    subtitle: string;
  }
  
  export interface HeroScrollIndicatorProps {
    isVisible: boolean;
  }