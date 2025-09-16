import React from 'react';
import { RiztaKeyHighlightsClient } from './rizta-key-highlights-client';
import { Battery, Zap, Bike, Smartphone, Monitor, Gem } from 'lucide-react';

// Server component for Ather Rizta key highlights
export default function RiztaKeyHighlights() {
  // Key highlights data for Rizta Z and Rizta S
  const riztaHighlights = [
    {
      id: 'range',
      icon: <Battery className="w-8 h-8 text-green-600" />,
      title: 'Long Range',
      subtitle: 'Up to 123 km',
      description: 'True range that gets you through your daily commute without range anxiety',
      variant: 'rizta-z'
    },
    {
      id: 'charging',
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: 'Fast Charging',
      subtitle: '0-80% in 65 mins',
      description: 'Quick charging technology that fits your busy lifestyle',
      variant: 'rizta-z'
    },
    {
      id: 'performance',
      icon: <Bike className="w-8 h-8 text-red-500" />,
      title: 'Peak Performance',
      subtitle: '4.3 kW Motor',
      description: 'Powerful motor delivering smooth acceleration and reliable performance',
      variant: 'rizta-z'
    }
  ];

  const riztaSHighlights = [
    {
      id: 'range-s',
      icon: <Battery className="w-8 h-8 text-green-600" />,
      title: 'Extended Range',
      subtitle: 'Up to 160 km',
      description: 'Enhanced battery capacity for longer rides and extended adventures',
      variant: 'rizta-s'
    },
    {
      id: 'charging-s',
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: 'Rapid Charging',
      subtitle: '0-80% in 65 mins',
      description: 'Advanced charging technology with enhanced battery management',
      variant: 'rizta-s'
    },
    {
      id: 'performance-s',
      icon: <Bike className="w-8 h-8 text-red-500" />,
      title: 'Superior Power',
      subtitle: '4.3 kW Motor',
      description: 'Enhanced motor tuning for superior performance and efficiency',
      variant: 'rizta-s'
    },
    {
      id: 'features-s',
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      title: 'Smart Features',
      subtitle: 'Ather Stack Pro',
      description: 'Advanced connectivity, navigation, and smart features included',
      variant: 'rizta-s'
    },
    {
      id: 'display-s',
      icon: <Monitor className="w-8 h-8 text-purple-500" />,
      title: 'Smart Display',
      subtitle: '7" Touchscreen',
      description: 'Intuitive touchscreen with navigation and vehicle diagnostics',
      variant: 'rizta-s'
    },
    {
      id: 'design-s',
      icon: <Gem className="w-8 h-8 text-amber-500" />,
      title: 'Premium Build',
      subtitle: 'Superior Finish',
      description: 'Enhanced build quality with premium materials and finishes',
      variant: 'rizta-s'
    }
  ];

  const commonFeatures = [
    {
      id: 'warranty',
      icon: '🛡️',
      title: '8-Year Warranty',
      subtitle: 'Battery & Motor',
      description: 'Comprehensive warranty coverage for peace of mind'
    },
    {
      id: 'maintenance',
      icon: '🔧',
      title: 'Low Maintenance',
      subtitle: 'Hassle-Free',
      description: 'Electric powertrain requires minimal maintenance'
    },
    {
      id: 'safety',
      icon: '🛡️',
      title: 'Advanced Safety',
      subtitle: 'Multiple Systems',
      description: 'Comprehensive safety features for secure riding'
    },
    {
      id: 'network',
      icon: '📍',
      title: 'Charging Network',
      subtitle: '2000+ Points',
      description: 'Extensive Ather Grid charging network across India'
    }
  ];

  return (
    <section className="py-2 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        

        {/* Pass data to client component */}
        <RiztaKeyHighlightsClient 
          riztaHighlights={riztaHighlights}
          riztaSHighlights={riztaSHighlights}
          commonFeatures={commonFeatures}
        />
      </div>
    </section>
  );
}