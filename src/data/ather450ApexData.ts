// Centralized data for Ather 450 Apex page
export interface ApexPerformanceMetric {
  id: string;
  value: string;
  unit: string;
  label: string;
  description: string;
  icon: string;
  category: 'speed' | 'power' | 'range' | 'acceleration';
}

export interface ApexTechFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'performance' | 'connectivity' | 'safety' | 'efficiency';
  benefits: string[];
}

export interface ApexSafetyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  accentColor: string;
  certifications?: string[];
}

export interface ApexComfortFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  benefits: string[];
}

// Performance metrics data
export const APEX_PERFORMANCE_METRICS: ApexPerformanceMetric[] = [
  {
    id: 'acceleration',
    value: '3.3',
    unit: 's',
    label: '0-40 kmph',
    description: 'Lightning-fast acceleration with Warp+™ mode',
    icon: 'zap',
    category: 'acceleration'
  },
  {
    id: 'top-speed',
    value: '90',
    unit: ' kmph',
    label: 'Top Speed',
    description: 'Unleash the beast with maximum velocity',
    icon: 'bike',
    category: 'speed'
  },
  {
    id: 'range',
    value: '150',
    unit: ' km',
    label: 'True Range',
    description: 'IDC certified range for real-world conditions',
    icon: 'battery',
    category: 'range'
  },
  {
    id: 'power',
    value: '6.4',
    unit: ' kW',
    label: 'Peak Power',
    description: 'Maximum power output in Warp+™ mode',
    icon: 'gem',
    category: 'power'
  }
];

// Move these declarations to the end of the file after APEX_TECH_FEATURES is defined

// Convert metrics to match original structure
export const performanceMetrics = APEX_PERFORMANCE_METRICS.map(metric => ({
  value: metric.value,
  unit: metric.unit,
  label: metric.label,
  description: metric.description,
  icon: metric.icon
}));

// Technology features data
export const APEX_TECH_FEATURES: ApexTechFeature[] = [
  {
    id: 'warp-plus',
    title: 'Warp+™ Mode',
    description: 'Unleash maximum performance with our most aggressive riding mode for ultimate acceleration and speed',
    icon: 'zap',
    category: 'performance',
    benefits: [
      'Maximum acceleration',
      'Peak power delivery',
      'Enhanced throttle response',
      'Sport-tuned dynamics'
    ]
  },
  {
    id: 'atherstack-pro',
    title: 'AtherStack Pro',
    description: '5-year complimentary plan with advanced connectivity features and premium services',
    icon: 'smartphone',
    category: 'connectivity',
    benefits: [
      'Google Maps navigation',
      'Music & call controls',
      'Remote diagnostics',
      'OTA updates',
      'Theft protection'
    ]
  },
  {
    id: 'regenerative-braking',
    title: 'Regenerative Braking',
    description: 'Advanced energy recovery system that extends your range while providing smooth deceleration',
    icon: 'wrench',
    category: 'efficiency',
    benefits: [
      'Extended range',
      'Energy recovery',
      'Smooth braking',
      'Reduced brake wear'
    ]
  },
  {
    id: 'smart-dashboard',
    title: 'Smart Dashboard',
    description: 'TFT display with real-time performance analytics and comprehensive vehicle information',
    icon: 'monitor',
    category: 'connectivity',
    benefits: [
      'Real-time analytics',
      'Performance metrics',
      'Navigation display',
      'Customizable interface'
    ]
  }
];

// Safety features data
export const APEX_SAFETY_FEATURES: ApexSafetyFeature[] = [
  {
    id: 'abs-braking',
    title: 'ABS Braking',
    description: 'Advanced Anti-lock Braking System prevents wheel lock-up for maximum safety',
    icon: 'shield',
    position: { top: '20%', left: '15%' },
    accentColor: '#10B981',
    certifications: ['AIS-156 Phase 2', 'ARAI Certified']
  },
  {
    id: 'traction-control',
    title: 'Traction Control',
    description: 'Smart grip management system optimizes power delivery for all road conditions',
    icon: 'wrench',
    position: { top: '40%', right: '20%' },
    accentColor: '#10B981',
    certifications: ['Electronic Stability Control']
  },
  {
    id: 'reinforced-frame',
    title: 'Reinforced Frame',
    description: 'Crash-tested aluminum chassis engineered for maximum protection and durability',
    icon: 'shield',
    position: { bottom: '30%', left: '25%' },
    accentColor: '#10B981',
    certifications: ['Crash Test Approved', 'High Strength Steel']
  },
  {
    id: 'dynamic-stability',
    title: 'Dynamic Stability',
    description: 'Real-time balance optimization system for enhanced riding confidence',
    icon: 'gem',
    position: { bottom: '20%', right: '15%' },
    accentColor: '#10B981',
    certifications: ['Electronic Stability Program']
  }
];

// Comfort features data
export const APEX_COMFORT_FEATURES: ApexComfortFeature[] = [
  {
    id: 'ergonomic-design',
    title: 'Ergonomic Design',
    description: 'Thoughtfully designed for comfort during long rides with optimal riding position',
    icon: 'bike',
    image: '/Ather-Assets/450-apex/comfort/ergonomic-seating.webp',
    benefits: [
      'Comfortable riding position',
      'Reduced fatigue',
      'Optimal weight distribution',
      'Premium seat cushioning'
    ]
  },
  {
    id: 'suspension',
    title: 'Advanced Suspension',
    description: 'Telescopic front forks and monoshock rear for smooth ride quality',
    icon: 'wrench',
    image: '/Ather-Assets/450-apex/comfort/suspension.webp',
    benefits: [
      'Smooth ride quality',
      'Better road handling',
      'Reduced vibrations',
      'Enhanced stability'
    ]
  },
  {
    id: 'storage',
    title: 'Smart Storage',
    description: 'Ample under-seat storage with dedicated phone charging compartment',
    icon: 'lock',
    image: '/Ather-Assets/450-apex/comfort/storage.webp',
    benefits: [
      '22L under-seat storage',
      'Phone charging dock',
      'Secure compartments',
      'Weather protection'
    ]
  },
  {
    id: 'connectivity',
    title: 'Premium Connectivity',
    description: 'Seamless smartphone integration with Ather app and cloud services',
    icon: 'smartphone',
    image: '/Ather-Assets/450-apex/comfort/connectivity.webp',
    benefits: [
      'Bluetooth connectivity',
      'App integration',
      'Remote monitoring',
      'Smart notifications'
    ]
  }
];

// SEO and metadata
export const APEX_SEO_DATA = {
  title: 'Ather 450 Apex Electric Scooter - Ultimate Performance | Raam Ather',
  description: 'Experience the fastest Ather ever! 450 Apex with 6.4kW power, 90kmph top speed, 150km range. Warp+™ mode, ABS braking, traction control. Book test ride in Hyderabad & Chennai.',
  keywords: [
    'Ather 450 Apex',
    'electric scooter',
    'fastest Ather',
    'Warp+ mode',
    '90 kmph scooter',
    'ABS braking',
    'traction control',
    'electric vehicle Hyderabad',
    'electric scooter Chennai',
    'Ather dealer',
    'high performance scooter'
  ],
  images: {
    og: '/Ather-Assets/450-apex/ather-450-apex-og-image.webp',
    twitter: '/Ather-Assets/450-apex/ather-450-apex-twitter-card.webp',
    hero: '/Ather-Assets/450-apex/ather-450-apex-hero-main.webp'
  }
};

export const APEX_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ather 450 Apex",
  "brand": {
    "@type": "Brand",
    "name": "Ather Energy"
  },
  "category": "Electric Scooter",
  "description": "Ultimate performance electric scooter with 6.4kW power, 90kmph top speed, 150km range, Warp+™ mode, ABS braking, and traction control.",
  "image": [
    "https://raamather.com/Ather-Assets/450-apex/ather-450-apex-main.webp",
    "https://raamather.com/Ather-Assets/450-apex/ather-450-apex-performance.webp",
    "https://raamather.com/Ather-Assets/450-apex/ather-450-apex-safety.webp"
  ],
  "offers": {
    "@type": "Offer",
    "name": "Ather 450 Apex",
    "price": "189999",
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
    "itemCondition": "https://schema.org/NewCondition",
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 15,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "INR"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "IN"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 3,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 5,
          "maxValue": 7,
          "unitCode": "DAY"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89",
    "bestRating": "5",
    "worstRating": "1"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Top Speed",
      "value": "90 kmph"
    },
    {
      "@type": "PropertyValue",
      "name": "Range",
      "value": "150 km"
    },
    {
      "@type": "PropertyValue",
      "name": "Peak Power",
      "value": "6.4 kW"
    },
    {
      "@type": "PropertyValue",
      "name": "Acceleration",
      "value": "0-40 kmph in 3.3s"
    }
  ]
};

// Convert tech features to match original structure (moved to end to avoid hoisting issues)
export const techFeatures = APEX_TECH_FEATURES.map(feature => ({
  title: feature.title,
  description: feature.description,
  icon: feature.icon
}));
