// pages/api/faq.ts (API Route)
import { NextApiRequest, NextApiResponse } from 'next';

// SEO-optimized FAQ data with rich keywords for Hyderabad and Chennai
const faqData = {
  seoMeta: {
    title: "Raam Ather Dealership FAQ - Electric Scooters Hyderabad Chennai | Ather Energy",
    description: "Get answers to all your questions about Ather electric scooters at Raam dealership. Find Ather showrooms, service centers, pricing, and test rides in Hyderabad and Chennai.",
    keywords: "Ather electric scooter, Raam Ather dealership, Ather Hyderabad, Ather Chennai, electric vehicle dealer, Ather service center, Ather test drive, electric scooter price, Ather 450X, Ather charging stations",
    canonicalUrl: "https://raamather.com/faq",
    ogTitle: "Raam Ather Dealership - Your Trusted Ather Partner in Hyderabad & Chennai",
    ogDescription: "Discover Ather electric scooters at Raam dealership. Premium service, competitive pricing, and comprehensive support in Hyderabad and Chennai.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [] as Record<string, unknown>[]
    }
  },
  
  categories: [
    {
      id: "dealership-locations",
      title: "Dealership & Showroom Locations",
      icon: "map-pin",
      priority: 1,
      questions: [
        {
          id: "hyderabad-showrooms",
          question: "Where are Raam Ather dealership showrooms located in Hyderabad?",
          answer: "Raam Ather dealership operates multiple premium showrooms across Hyderabad including locations in Banjara Hills, Jubilee Hills, Kondapur, Gachibowli, and Kukatpally. Our flagship Hyderabad showroom offers complete Ather electric scooter experience with test rides, expert consultation, and immediate delivery options. Visit our Hyderabad Ather dealership for the best electric scooter buying experience in Telangana.",
          keywords: ["Raam Ather Hyderabad", "Ather dealership Hyderabad", "Ather showroom Hyderabad", "electric scooter dealer Hyderabad"],
          location: "hyderabad"
        },
        {
          id: "chennai-showrooms",
          question: "Which areas in Chennai have Raam Ather dealership outlets?",
          answer: "Raam Ather dealership proudly serves Chennai with strategically located showrooms in T. Nagar, Anna Nagar, Velachery, Porur, and OMR. Our Chennai Ather dealership provides comprehensive electric vehicle solutions including Ather 450X, Ather 450S, accessories, and dedicated service support. Experience India's smartest electric scooters at our premium Chennai locations.",
          keywords: ["Raam Ather Chennai", "Ather dealership Chennai", "Ather showroom Chennai", "electric scooter dealer Chennai"],
          location: "chennai"
        },
        {
          id: "showroom-timing",
          question: "What are the operating hours for Raam Ather dealership showrooms?",
          answer: "Raam Ather dealership showrooms in Hyderabad and Chennai operate from 9:00 AM to 8:00 PM, Monday through Sunday. Our extended hours ensure you can visit us at your convenience for Ather electric scooter test drives, purchases, service appointments, and consultations. Special holiday hours may apply - please contact your nearest Raam Ather location.",
          keywords: ["Ather dealership hours", "Raam Ather timing", "showroom hours Hyderabad Chennai"]
        }
      ]
    },
    
    {
      id: "ather-models-pricing",
      title: "Ather Electric Scooter Models & Pricing",
      icon: "zap",
      priority: 2,
      questions: [
        {
          id: "ather-models-available",
          question: "Which Ather electric scooter models are available at Raam dealership?",
          answer: "Raam Ather dealership offers the complete range of Ather electric scooters including the flagship Ather 450X with 105km range, Ather 450S with smart features, and the latest Ather models. All Ather scooters come with advanced touchscreen dashboard, smartphone connectivity, over-the-air updates, and India's fastest charging network. Compare all models at our Hyderabad and Chennai showrooms.",
          keywords: ["Ather 450X price", "Ather 450S features", "Ather models comparison", "electric scooter range"]
        },
        {
          id: "ather-pricing",
          question: "What is the price of Ather electric scooters at Raam dealership?",
          answer: "Raam Ather dealership offers competitive pricing on all Ather electric scooters with transparent pricing structure. Ather 450X starts from ₹1,46,926 (ex-showroom) and Ather 450S from ₹1,29,626 (ex-showroom). Prices include comprehensive warranty, charging access, and premium after-sales support. Visit our Hyderabad or Chennai showroom for detailed pricing, EMI options, and exclusive Raam dealership offers.",
          keywords: ["Ather price Hyderabad", "Ather price Chennai", "electric scooter EMI", "Ather financing options"]
        },
        {
          id: "ather-subsidies",
          question: "What government subsidies and incentives are available for Ather scooters?",
          answer: "Raam Ather dealership assists with all government subsidies including Central Government FAME II subsidy up to ₹15,000 and state-specific incentives. Telangana offers additional subsidies for electric vehicles purchased in Hyderabad, while Tamil Nadu provides benefits for Chennai purchases. Our team handles all subsidy documentation and ensures maximum savings on your Ather electric scooter purchase.",
          keywords: ["Ather subsidy Telangana", "Ather subsidy Tamil Nadu", "FAME II benefits", "electric vehicle incentives"]
        }
      ]
    },

    {
      id: "test-drive-booking",
      title: "Test Drive & Booking Process",
      icon: "calendar",
      priority: 3,
      questions: [
        {
          id: "test-drive-booking",
          question: "How can I book an Ather test drive at Raam dealership?",
          answer: "Booking an Ather test drive at Raam dealership is simple and convenient. Visit our website, call our Hyderabad or Chennai showrooms directly, or walk into any Raam Ather location. Test drives are available 7 days a week with flexible time slots. Experience the Ather 450X and 450S performance, smart features, and superior build quality before making your decision. Valid driving license required for test rides.",
          keywords: ["Ather test drive Hyderabad", "Ather test drive Chennai", "book Ather test ride", "Ather demo"]
        },
        {
          id: "delivery-timeline",
          question: "What is the delivery timeline for Ather scooters from Raam dealership?",
          answer: "Raam Ather dealership maintains excellent inventory management ensuring faster delivery times. Most Ather models are available for immediate to 2-week delivery in Hyderabad and Chennai locations. Popular color variants and accessories might have slightly longer timelines. We provide regular delivery updates and coordinate convenient delivery scheduling to your preferred location.",
          keywords: ["Ather delivery time", "Ather availability Hyderabad", "Ather stock Chennai"]
        },
        {
          id: "booking-process",
          question: "What is the booking and payment process at Raam Ather dealership?",
          answer: "Raam Ather dealership offers streamlined booking with minimal documentation. Booking amount starts from ₹2,500 with flexible payment options including cash, card, UPI, and EMI. Required documents include Aadhar card, PAN card, address proof, and driving license. Our finance partners offer attractive loan options with competitive interest rates for Hyderabad and Chennai customers.",
          keywords: ["Ather booking amount", "Ather loan options", "EMI for Ather", "Ather finance partners"]
        }
      ]
    },

    {
      id: "service-support",
      title: "Service & Support",
      icon: "wrench",
      priority: 4,
      questions: [
        {
          id: "service-centers",
          question: "Where are Raam Ather service centers located in Hyderabad and Chennai?",
          answer: "Raam Ather dealership operates dedicated service centers across Hyderabad and Chennai with certified technicians and genuine Ather parts. Our Hyderabad service centers cover Secunderabad, Madhapur, LB Nagar, and Uppal areas. Chennai service network includes Tambaram, Chromepet, Adyar, and Sholinganallur locations. All service centers offer doorstep service, periodic maintenance, and 24x7 roadside assistance.",
          keywords: ["Ather service center Hyderabad", "Ather service Chennai", "Ather doorstep service", "Ather roadside assistance"]
        },
        {
          id: "warranty-coverage",
          question: "What warranty coverage does Raam Ather dealership provide?",
          answer: "Raam Ather dealership provides comprehensive warranty coverage including 3-year/50,000 km vehicle warranty, 5-year battery warranty, and extended warranty options. Warranty covers battery performance, motor, controller, and all electrical components. Our Hyderabad and Chennai service teams ensure hassle-free warranty claims with genuine Ather parts and expert service support.",
          keywords: ["Ather warranty", "Ather battery warranty", "extended warranty Ather", "Ather service guarantee"]
        },
        {
          id: "maintenance-cost",
          question: "What are the maintenance costs for Ather scooters at Raam dealership?",
          answer: "Ather electric scooters have significantly lower maintenance costs compared to petrol scooters. Raam Ather dealership offers transparent service pricing with periodic maintenance packages starting from ₹899. Annual maintenance cost typically ranges ₹3,000-5,000 including software updates, brake adjustments, and tire rotations. No engine oil changes or complex mechanical servicing required for Ather electric vehicles.",
          keywords: ["Ather maintenance cost", "Ather service packages", "electric scooter maintenance", "Ather annual cost"]
        }
      ]
    },

    {
      id: "charging-network",
      title: "Charging Infrastructure & Range",
      icon: "battery",
      priority: 5,
      questions: [
        {
          id: "charging-stations",
          question: "Where can I find Ather charging stations in Hyderabad and Chennai?",
          answer: "Ather Grid, India's fastest public charging network, has extensive coverage in Hyderabad and Chennai. Major locations include malls, offices, restaurants, and residential complexes across Gachibowli, Hitech City, T.Nagar, Express Avenue, and Phoenix MarketCity. Raam Ather dealership provides detailed charging station maps and assists with home charging solutions. Ather mobile app shows real-time charging point availability.",
          keywords: ["Ather Grid Hyderabad", "Ather charging Chennai", "Ather charging stations", "home charging Ather"]
        },
        {
          id: "charging-time",
          question: "How long does it take to charge Ather scooters?",
          answer: "Ather electric scooters offer industry-leading fast charging capabilities. At Ather Grid fast chargers, achieve 0-80% charge in just 60 minutes. Home charging (0-100%) takes approximately 5.5 hours with standard charger. Ather 450X provides 105km range while Ather 450S offers 90km on single charge. Raam Ather dealership includes home charging setup with every purchase in Hyderabad and Chennai.",
          keywords: ["Ather fast charging", "Ather charging time", "Ather range per charge", "home charging installation"]
        },
        {
          id: "charging-cost",
          question: "What is the cost of charging Ather electric scooters?",
          answer: "Ather electric scooters offer exceptional cost efficiency with charging costs as low as ₹15-25 for full charge. This translates to less than ₹1 per kilometer running cost. Ather Grid fast chargers are competitively priced while home charging further reduces costs. Raam Ather customers in Hyderabad and Chennai enjoy free charging credits and special tariff rates during initial months of ownership.",
          keywords: ["Ather charging cost", "electric scooter running cost", "Ather vs petrol cost", "charging tariff rates"]
        }
      ]
    },

    {
      id: "features-technology",
      title: "Smart Features & Technology",
      icon: "smartphone",
      priority: 6,
      questions: [
        {
          id: "smart-features",
          question: "What smart features do Ather electric scooters offer?",
          answer: "Ather electric scooters from Raam dealership include cutting-edge smart features: 7-inch touchscreen dashboard, smartphone connectivity, Google Maps navigation, music control, call notifications, theft protection, remote diagnostics, over-the-air updates, and multiple riding modes. Ather mobile app provides vehicle tracking, charging station locator, service scheduling, and performance analytics.",
          keywords: ["Ather smart features", "Ather touchscreen", "Ather mobile app", "OTA updates Ather"]
        },
        {
          id: "performance-modes",
          question: "What are the different riding modes available in Ather scooters?",
          answer: "Ather electric scooters offer 4 distinct riding modes optimized for different scenarios: Eco mode for maximum range (up to 105km), City mode for daily commuting, Sport mode for performance riding with rapid acceleration, and Warp mode for ultimate performance experience. Each mode adjusts power delivery, regenerative braking, and energy consumption. Experience all modes during test ride at Raam Ather showrooms in Hyderabad and Chennai.",
          keywords: ["Ather riding modes", "Eco mode Ather", "Sport mode performance", "Warp mode acceleration"]
        }
      ]
    }
  ],

  locations: {
    hyderabad: {
      name: "Hyderabad",
      state: "Telangana",
      showrooms: [
        {
          area: "Banjara Hills",
          address: "Road No. 12, Banjara Hills, Hyderabad - 500034",
          phone: "+91-9876543210",
          coordinates: { lat: 17.4065, lng: 78.4691 }
        },
        {
          area: "Gachibowli",
          address: "Gachibowli Financial District, Hyderabad - 500032",
          phone: "+91-9876543211",
          coordinates: { lat: 17.4400, lng: 78.3489 }
        }
      ]
    },
    chennai: {
      name: "Chennai",
      state: "Tamil Nadu", 
      showrooms: [
        {
          area: "T. Nagar",
          address: "Ranganathan Street, T. Nagar, Chennai - 600017",
          phone: "+91-9876543212",
          coordinates: { lat: 13.0418, lng: 80.2341 }
        },
        {
          area: "Anna Nagar",
          address: "2nd Avenue, Anna Nagar, Chennai - 600040",
          phone: "+91-9876543213",
          coordinates: { lat: 13.0850, lng: 80.2101 }
        }
      ]
    }
  }
};

// Generate structured data for each FAQ
faqData.categories.forEach(category => {
  category.questions.forEach(question => {
    faqData.seoMeta.structuredData.mainEntity.push({
      "@type": "Question",
      "name": question.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": question.answer
      }
    });
  });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  try {
    switch (method) {
      case 'GET':
        // Handle different endpoints based on query parameters
        if (query.action === 'search') {
          return handleSearch(req, res);
        } else if (query.category) {
          return handleCategory(req, res);
        } else {
          return handleGetFAQ(req, res);
        }
      
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({
          success: false,
          error: `Method ${method} not allowed`
        });
    }
  } catch (error) {
    console.error('FAQ API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Something went wrong'
    });
  }
}

function handleGetFAQ(req: NextApiRequest, res: NextApiResponse) {
  const { location } = req.query;
  
  const filteredData = { ...faqData };
  
  // Filter by location if specified
  if (location && location !== 'all') {
    filteredData.categories = faqData.categories.map(category => ({
      ...category,
      questions: category.questions.filter(question => 
        !question.location || question.location === location
      )
    })).filter(category => category.questions.length > 0);
  }

  res.status(200).json({
    success: true,
    data: filteredData,
    timestamp: new Date().toISOString(),
    location: location || 'all'
  });
}

function handleCategory(req: NextApiRequest, res: NextApiResponse) {
  const { category: categoryId } = req.query;
  
  const category = faqData.categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return res.status(404).json({
      success: false,
      error: 'Category not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: category,
    timestamp: new Date().toISOString()
  });
}

function handleSearch(req: NextApiRequest, res: NextApiResponse) {
  const { q, location } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Search query is required'
    });
  }
  
  const searchResults: Array<{ question: string; answer: string; category: string; relevanceScore: number }> = [];
  const searchTerm = q.toLowerCase();
  
  faqData.categories.forEach(category => {
    category.questions.forEach(question => {
      const matchQuestion = question.question.toLowerCase().includes(searchTerm);
      const matchAnswer = question.answer.toLowerCase().includes(searchTerm);
      const matchKeywords = question.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      const matchLocation = !location || location === 'all' || question.location === location;
      
      if ((matchQuestion || matchAnswer || matchKeywords) && matchLocation) {
        searchResults.push({
  question: question.question,
  answer: question.answer,
  category: category.title,
  relevanceScore: (matchQuestion ? 2 : 0) + (matchAnswer ? 1 : 0) + (matchKeywords ? 1 : 0)
});
      }
    });
  });
  
  res.status(200).json({
    success: true,
    data: searchResults,
    query: q,
    location: location || 'all',
    totalResults: searchResults.length,
    timestamp: new Date().toISOString()
  });
}

// Export the FAQ data for use in other parts of the application
export { faqData };