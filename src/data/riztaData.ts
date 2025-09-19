// Centralized data for Rizta page components
export interface RiztaVariant {
  id: string;
  name: string;
  price: number;
  range: string;
  chargingTime: string;
  motorPower: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface RiztaFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'performance' | 'comfort' | 'technology' | 'safety';
  image?: string;
}

export interface RiztaSafetyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  certifications?: string[];
}

export interface RiztaTestimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar?: string;
  verified: boolean;
}

// Rizta variants data
export const RIZTA_VARIANTS: RiztaVariant[] = [
  {
    id: 'rizta-base',
    name: 'Rizta',
    price: 109999,
    range: '123 km',
    chargingTime: '0-80% in 65 mins',
    motorPower: '4.3 kW',
    features: [
      '2.9 kWh Battery',
      '123km True Range',
      'Smart Dashboard',
      'Mobile Connectivity',
      'LED Headlights'
    ],
    image: '/Ather-Assets/Rizta/rizta-base.webp'
  },
  {
    id: 'rizta-z',
    name: 'Rizta Z',
    price: 129999,
    range: '159 km',
    chargingTime: '0-80% in 65 mins',
    motorPower: '5.4 kW',
    features: [
      '3.7kWh Battery',
      '159km True Range',
      '7" Touchscreen',
      'Google Maps Navigation',
      'Music & Calls',
      'Theft Protection'
    ],
    image: '/Ather-Assets/Rizta/rizta-z.webp',
    popular: true
  }
];

// Key features data
export const RIZTA_KEY_FEATURES: RiztaFeature[] = [
  {
    id: 'range',
    title: 'Long Range',
    description: 'Up to 159 km on a single charge for worry-free daily commutes',
    icon: 'battery',
    category: 'performance',
    image: '/Ather-Assets/Rizta/features/range.webp'
  },
  {
    id: 'charging',
    title: 'Fast Charging',
    description: '0-80% charge in just 65 minutes with Ather Grid',
    icon: 'zap',
    category: 'performance',
    image: '/Ather-Assets/Rizta/features/charging.webp'
  },
  {
    id: 'touchscreen',
    title: '7" Touchscreen',
    description: 'DeepView Display with Google Maps, music, and calls',
    icon: 'monitor',
    category: 'technology',
    image: '/Ather-Assets/Rizta/features/touchscreen.webp'
  },
  {
    id: 'spacious',
    title: 'Spacious Design',
    description: 'Family-friendly design with ample storage and comfortable seating',
    icon: 'bike',
    category: 'comfort',
    image: '/Ather-Assets/Rizta/features/spacious.webp'
  },
  {
    id: 'smart-features',
    title: 'Smart Features',
    description: 'Theft protection, remote diagnostics, and OTA updates',
    icon: 'smartphone',
    category: 'technology',
    image: '/Ather-Assets/Rizta/features/smart.webp'
  },
  {
    id: 'safety',
    title: 'Advanced Safety',
    description: 'Multiple safety certifications and robust build quality',
    icon: 'shield',
    category: 'safety',
    image: '/Ather-Assets/Rizta/features/safety.webp'
  }
];

// Safety features data
export const RIZTA_SAFETY_FEATURES: RiztaSafetyFeature[] = [
  {
    id: 'build-quality',
    title: 'Robust Build Quality',
    description: 'High-grade materials and rigorous testing ensure durability',
    icon: 'shield',
    certifications: ['ISO 9001', 'CE Certified']
  },
  {
    id: 'braking',
    title: 'Advanced Braking',
    description: 'Disc brakes with regenerative braking for maximum safety',
    icon: 'wrench',
    certifications: ['AIS-156 Compliant']
  },
  {
    id: 'lighting',
    title: 'LED Lighting',
    description: 'Full LED headlights and taillights for better visibility',
    icon: 'gem',
    certifications: ['ECE R10 Compliant']
  },
  {
    id: 'theft-protection',
    title: 'Theft Protection',
    description: 'GPS tracking, remote immobilization, and tamper alerts',
    icon: 'lock',
    certifications: ['Insurance Approved']
  }
];

// Customer testimonials
export const RIZTA_TESTIMONIALS: RiztaTestimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    review: 'Perfect for our family! The spacious design and long range make daily commutes a breeze. The kids love the smooth ride.',
    verified: true
  },
  {
    id: 'testimonial-2',
    name: 'Rajesh Kumar',
    location: 'Hyderabad',
    rating: 5,
    review: 'Impressed with the build quality and smart features. The 7" touchscreen is incredibly useful for navigation.',
    verified: true
  },
  {
    id: 'testimonial-3',
    name: 'Anitha Reddy',
    location: 'Chennai',
    rating: 5,
    review: 'Excellent value for money. The charging is fast and the range is more than sufficient for city rides.',
    verified: true
  }
];

// SEO and structured data
export const RIZTA_SEO_DATA = {
  title: 'Ather Rizta Z Electric Scooter - Price, Range, Features | Raam Ather',
  description: 'Discover Ather Rizta Z electric scooter with 159km range, 7" touchscreen, and family-friendly design. Starting from ₹1,29,999. Book test ride in Hyderabad & Chennai.',
  keywords: [
    'Ather Rizta Z',
    'electric scooter',
    'Ather Rizta price',
    'family scooter',
    'electric vehicle Chennai',
    'electric scooter Hyderabad',
    'Ather dealer',
    '159km range electric scooter',
    'touchscreen electric scooter'
  ],
  images: {
    og: '/Ather-Assets/Rizta/rizta-og-image.webp',
    twitter: '/Ather-Assets/Rizta/rizta-twitter-card.webp',
    hero: '/Ather-Assets/Rizta/rizta-hero-main.webp'
  }
};

export const RIZTA_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ather Rizta Z",
  "brand": {
    "@type": "Brand",
    "name": "Ather Energy"
  },
  "category": "Electric Scooter",
  "description": "Family-friendly electric scooter with 159km range, 7-inch touchscreen, and spacious design perfect for daily commuting and family rides.",
  "image": [
    "https://raamather.com/Ather-Assets/Rizta/rizta-main-image.webp",
    "https://raamather.com/Ather-Assets/Rizta/rizta-dashboard.webp",
    "https://raamather.com/Ather-Assets/Rizta/rizta-family-riding.webp"
  ],
  "offers": {
    "@type": "Offer",
    "name": "Ather Rizta Z",
    "price": "129999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2024-12-31",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Raam Ather",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Range",
      "value": "159 km"
    },
    {
      "@type": "PropertyValue",
      "name": "Charging Time",
      "value": "0-80% in 65 minutes"
    },
    {
      "@type": "PropertyValue",
      "name": "Motor Power",
      "value": "5.4 kW"
    }
  ]
};
