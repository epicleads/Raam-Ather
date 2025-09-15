export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  review: string;
  rating?: number;
  image?: string;
  video?: string;
  type?: 'text' | 'video';
}

export interface HomeTestimonialsData {
  sectionTitle: string;
  sectionSubtitle?: string;
  testimonials: Testimonial[];
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}