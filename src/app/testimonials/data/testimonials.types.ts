export type Dealer = 'Hyderabad' | 'Chennai';

export type ExperienceType = 'purchase' | 'service' | 'community';

export type TestimonialType = 'text' | 'photo' | 'video' | 'audio';

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  dealer: Dealer;
  model?: string;
  rating?: number;
  type: TestimonialType;
  title?: string;
  content: string;
  date?: string;
  avatar?: string;        // /public path
  photo?: string;         // optional content image
  video?: string;         // for video type
  audio?: string;         // for audio type
  instagramReelUrl?: string; // for Instagram reel embeds
  dealerVerified?: boolean;
  tags?: string[];
  experience: ExperienceType;
}

export interface Filters {
  city?: string;
  model?: string;
  experience?: ExperienceType;
  dealer?: Dealer;
}

export interface DealerInfo {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
}

export interface FeaturedStory {
  title: string;
  subtitle: string;
  description: string;
  poster: string;
  video: string;
}

export interface GoogleReviewData {
  rating: number;
  count: number;
}

export interface InsightMetric {
  title: string;
  value: string;
  unit?: string;
  description?: string;
}

export interface UGCPost {
  id: string;
  image: string;
  caption?: string;
  instagramUrl?: string;
  dealer?: Dealer;
}

export interface ReactionData {
  helpful: number;
  loved: number;
  trusted: number;
}