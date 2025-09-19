// Hero Loading Components
export { default as HeroLoadingSkeleton } from './HeroLoadingSkeleton';
export { default as HeroLoadingMinimal } from './HeroLoadingMinimal';
export { default as HeroLoadingEnhanced } from './HeroLoadingEnhanced';

// Re-export types
export type { UseHeroLoadingOptions, UseHeroLoadingReturn } from '@/hooks/useHeroLoading';

// Loading component variants for different use cases
export const HeroLoadingVariants = {
  // Full-featured loading with animations and progress
  Enhanced: 'HeroLoadingEnhanced',
  
  // Detailed skeleton with all UI elements
  Skeleton: 'HeroLoadingSkeleton',
  
  // Minimal loading for fast loading scenarios
  Minimal: 'HeroLoadingMinimal'
} as const;

export type HeroLoadingVariant = typeof HeroLoadingVariants[keyof typeof HeroLoadingVariants];
