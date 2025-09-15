// src/app/Components/home-hero/server/fetchHeroData.ts
import { heroFallbackData } from './heroFallbackData';
import type { HeroItem } from '@/app/Components/home-hero/home-hero.types';

export async function fetchHeroData(): Promise<HeroItem[]> {
  try {
    // Temporarily return only fallback data to avoid Supabase issues
    console.log('Using fallback hero data');
    return heroFallbackData;
  } catch (error) {
    console.error('Error in fetchHeroData:', error);
    console.log('Falling back to local hero data');
    return heroFallbackData;
  }
}
