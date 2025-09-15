import { DealerInfo, FeaturedStory, GoogleReviewData, InsightMetric } from './testimonials.types';

export const dealers: DealerInfo[] = [
  {
    id: 'hyd',
    name: 'Hyderabad Showroom',
    city: 'Hyderabad',
    rating: 4.7,
    reviewCount: 1243
  },
  {
    id: 'chn', 
    name: 'Chennai Showroom',
    city: 'Chennai',
    rating: 4.6,
    reviewCount: 987
  }
];

export const models = [
  'Ather 450S',
  'Ather 450X', 
  'Ather 450 Apex',
  'Ather Rizta'
];

export const cities = [
  'Hyderabad',
  'Chennai'
];

export const experienceOptions = [
  { value: 'purchase', label: 'Purchase Journey' },
  { value: 'service', label: 'Service Experience' },
  { value: 'community', label: 'Community Events' }
];

export const googleReviews: Record<string, GoogleReviewData> = {
  Hyderabad: {
    rating: 4.7,
    count: 2000
  },
  Chennai: {
    rating: 4.6,
    count: 2500
  }
};

export const featuredStory: FeaturedStory = {
  title: 'From Skeptic to Advocate',
  subtitle: 'Rajesh\'s Journey with Ather 450X',
  description: 'Watch how a traditional petrol scooter user became an electric advocate after experiencing the Ather difference.',
  poster: '/Ather-Assets/Home/The-2025-ather-450-launch.webp',
  video: '/Ather-Assets/thumbnails/Ather 450x in 4 New Colours.mp4'
};

export const insightMetrics: InsightMetric[] = [
  {
    title: 'Avg Resolution Time',
    value: '2.3',
    unit: 'hours',
    description: 'Average time to resolve service requests'
  },
  {
    title: 'Repeat Customers',
    value: '89',
    unit: '%',
    description: 'Customers who return for additional purchases'
  },
  {
    title: 'Service Satisfaction',
    value: '4.8',
    unit: '/5',
    description: 'Average rating for service experience'
  }
];