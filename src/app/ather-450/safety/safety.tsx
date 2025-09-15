import { SafetyClient } from './safety-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ather 450X Safety Features - Advanced Electric Scooter Safety in Hyderabad & Chennai | Raam Ather',
  description: 'Experience cutting-edge safety with Ather 450X - Emergency Stop Signal, Dual Disc Brakes, FallSafe" technology, and Tow & Theft alerts. Premium electric scooter safety in Hyderabad and Chennai.',
  keywords: 'Ather 450X safety, electric scooter safety, emergency stop signal, dual disc brakes, FallSafe technology, theft protection, Hyderabad electric scooter, Chennai electric scooter, Raam Ather safety features',
  openGraph: {
    title: 'Ather 450X Safety Features - Advanced Protection Technology',
    description: 'Discover advanced safety features including Emergency Stop Signal, Dual Disc Brakes, and FallSafe" technology in Ather 450X electric scooter.',
    images: ['/Ather-Assets/450/safety/dualdiskbrake.webp'],
  },
};

export interface SafetyFeature {
  id: string;
  title: string;
  subtitle: string;
  type: 'video' | 'image';
  mediaPath: string;
  alt: string;
  priority?: boolean;
}

export interface SafetyData {
  features: SafetyFeature[];
  seoContent: {
    structuredData: object;
    locationInfo: {
      hyderabad: string;
      chennai: string;
    };
    safetyBenefits: string[];
  };
}

export default function Safety() {
  const safetyData: SafetyData = {
    features: [
      {
        id: 'emergency-stop',
        title: 'Emergency Stop Signal',
        subtitle: 'Sudden braking, less sudden for riders behind. With taillight alerts.',
        type: 'video',
        mediaPath: '/Ather-Assets/450/safety/emergency-stop.mp4',
        alt: 'Emergency Stop Signal demonstration showing taillight alerts during sudden braking',
        priority: true
      },
      {
        id: 'tow-theft',
        title: 'Tow & Theft Alerts',
        subtitle: 'Get alerts when your scooter is moved, even when out of sight.',
        type: 'video',
        mediaPath: '/Ather-Assets/450/safety/twoTheft.webm',
        alt: 'Tow and Theft alert system demonstrating real-time notifications'
      },
      {
        id: 'dual-disc-brakes',
        title: 'Dual Disc Brakes',
        subtitle: 'Stop (almost) as quickly as you take off with sharp, responsive brakes.',
        type: 'image',
        mediaPath: '/Ather-Assets/450/safety/dualdiskbrake.webp',
        alt: 'Ather 450X dual disc brake system for superior stopping power'
      },
      {
        id: 'fallsafe',
        title: 'FallSafe"',
        subtitle: 'In case of falls, the motor is cut off to prevent accidental acceleration.',
        type: 'video',
        mediaPath: '/Ather-Assets/450/safety/fall-safe.mp4',
        alt: 'FallSafe technology demonstration showing motor cut-off during falls'
      }
    ],
    seoContent: {
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Ather 450X Electric Scooter Safety Features",
        "description": "Advanced safety features including Emergency Stop Signal, Dual Disc Brakes, FallSafe™ technology, and comprehensive theft protection",
        "brand": {
          "@type": "Brand",
          "name": "Ather Energy"
        },
        "hasFeature": [
          {
            "@type": "ProductFeature",
            "name": "Emergency Stop Signal",
            "description": "Smart taillight alerts for sudden braking situations"
          },
          {
            "@type": "ProductFeature", 
            "name": "Dual Disc Brakes",
            "description": "Superior stopping power with responsive dual disc brake system"
          },
          {
            "@type": "ProductFeature",
            "name": "FallSafe™ Technology",
            "description": "Intelligent motor cut-off system to prevent accidental acceleration during falls"
          },
          {
            "@type": "ProductFeature",
            "name": "Tow & Theft Protection",
            "description": "Real-time alerts and notifications for unauthorized vehicle movement"
          }
        ],
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "areaServed": ["Hyderabad", "Chennai", "Telangana", "Tamil Nadu"]
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Ather Energy",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Telangana, Tamil Nadu"
          }
        }
      },
      locationInfo: {
        hyderabad: "Experience next-generation safety in Hyderabad with Ather 450X's advanced protection systems, designed for the bustling traffic conditions of the Cyberabad metropolitan area.",
        chennai: "Navigate Chennai's dynamic urban environment with confidence using Ather 450X's comprehensive safety suite, engineered for the busy streets of the Detroit of South India."
      },
      safetyBenefits: [
        "Advanced Emergency Stop Signal technology alerts other riders during sudden braking",
        "Dual disc brake system provides superior stopping power in all weather conditions",
        "FallSafe™ technology prevents accidental acceleration during mishaps",
        "Real-time theft protection with instant mobile alerts and GPS tracking",
        "Smart safety features specifically designed for Indian urban riding conditions",
        "Comprehensive protection system for riders in Hyderabad and Chennai metropolitan areas"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(safetyData.seoContent.structuredData),
        }}
      />
      <section className="bg-black text-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-manrope tracking-tight mb-6">
              Safety Redefined
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Advanced protection systems that think ahead, react instantly, and keep you secure on every journey through Hyderabad and Chennai.
            </p>
          </div>
          
          <SafetyClient data={safetyData} />
          
          {/* Safety Benefits Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-green-400">
              Why Choose Ather 450X Safety?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {safetyData.seoContent.safetyBenefits.map((benefit, index) => (
                <div key={index} className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <p className="text-sm text-gray-300 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}