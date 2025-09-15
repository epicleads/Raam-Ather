import { PerformanceClient } from './performance-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ather 450X Performance - Electric Scooter in Hyderabad & Chennai | Raam Ather',
  description: 'Experience peak performance with Ather 450X electric scooter. 6 kW motor, 26 Nm torque, advanced suspension. Available in Hyderabad and Chennai. Book test ride today.',
  keywords: 'Ather 450X performance, electric scooter Hyderabad, electric scooter Chennai, 6kW motor, instant torque, monoshock suspension, aluminium chassis, Raam Ather dealership',
  openGraph: {
    title: 'Ather 450X Performance Features - Hyderabad & Chennai',
    description: 'Discover the motorsports-inspired performance of Ather 450X with advanced engineering and cutting-edge technology.',
    images: ['/Ather-Assets/450/performance/performance1.webp'],
  },
};

interface PerformanceData {
  class1Cards: Array<{
    title: string;
    description: string;
    image?: string;
    isEngineMotor?: boolean;
  }>;
  class2Cards: Array<{
    title: string;
    description: string;
  }>;
  seoContent: {
  structuredData: Record<string, unknown>;
    locationInfo: {
      hyderabad: string;
      chennai: string;
    };
  };
}

export default function Performance() {
  const performanceData: PerformanceData = {
    class1Cards: [
      {
        title: 'Motorsports-inspired form',
        description: 'Clean, futuristic design that packs all the speed you would need. Experience premium electric mobility in Hyderabad and Chennai.',
        image: '/Ather-Assets/450/performance/performance1.webp'
      },
      {
        title: 'Engine → Motor',
        description: '6 kW power, 26 Nm instant torque. Take off in a blink. Available at Raam Ather showrooms across Hyderabad and Chennai.',
        image: '/Ather-Assets/450/performance/performance2.webp',
        isEngineMotor: true
      }
    ],
    class2Cards: [
      {
        title: 'Monoshock Suspension',
        description: 'Bumps. Potholes. Bad roads. Hold steady, breeze through them all. Perfect for Hyderabad and Chennai road conditions.'
      },
      {
        title: 'Aluminium Chassis',
        description: 'Lightweight. Heavy-duty. Built to glide and handle like a dream. Engineered for Indian urban mobility.'
      },
      {
        title: 'Balanced Weight Distribution',
        description: 'Sharp turns. Steep curves. Tight corners. Hold steady on them all. Navigate city traffic with confidence.'
      },
      {
        title: 'Low Centre of Gravity',
        description: 'Better balance and control to switch lanes and dodge obstacles. Smart engineering for smart cities.'
      }
    ],
    seoContent: {
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Ather 450X Electric Scooter",
        "description": "High-performance electric scooter with 6kW motor and advanced features",
        "brand": {
          "@type": "Brand",
          "name": "Ather Energy"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "areaServed": ["Hyderabad", "Chennai"]
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
        hyderabad: "Experience Ather 450X performance in Hyderabad - the perfect electric scooter for navigating the bustling streets of the City of Pearls.",
        chennai: "Discover Ather 450X in Chennai - engineered for the dynamic urban landscape of the Detroit of South India."
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(performanceData.seoContent.structuredData),
        }}
      />
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PerformanceClient data={performanceData} />
        </div>
      </section>
    </>
  );
}