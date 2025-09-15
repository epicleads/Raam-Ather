    // Main exports
export { default as Hero } from './Hero';

// Types
export type { HeroItem } from './home-hero.types';

// Server Components
export { HeroSEO } from './server/HeroSEO';
export { HeroMedia } from './server/HeroMedia';
export { HeroHeading } from './server/HeroHeading';
export { HeroCTAGroup } from './server/HeroCTAGroup';

// Client Components
export { default as HeroSlider } from './client/HeroSlider.client';
export { HeroScrollIndicator } from './client/HeroScrollIndicator.client';
export { HeroParallax } from './client/HeroParallax.client';