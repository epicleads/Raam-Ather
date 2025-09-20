"use client";

import React, { memo, useMemo } from 'react';
import { iconMap, type IconType } from '../components/icons/RiztaIcons';

// Optimized interface with icon type
interface HighlightItem {
  id: string;
  iconType: IconType;
  title: string;
  subtitle: string;
  description: string;
  variant: 'rizta-z' | 'rizta-s';
}

// Memoized highlight card component
const HighlightCard = memo(({
  highlight
}: {
  highlight: HighlightItem;
}) => {
  const IconComponent = iconMap[highlight.iconType];

  return (
    <article
      className="highlight-card group"
      tabIndex={0}
      role="article"
      aria-labelledby={`highlight-${highlight.id}-title`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Handle card activation
        }
      }}
    >
      <div className="highlight-icon-container">
        <IconComponent
          className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform duration-300"
          aria-hidden={true}
        />
      </div>

      <div className="highlight-content">
        <h3
          id={`highlight-${highlight.id}-title`}
          className="highlight-title"
        >
          {highlight.title}
        </h3>
        <p className="highlight-subtitle">
          {highlight.subtitle}
        </p>
        <p className="highlight-description">
          {highlight.description}
        </p>
      </div>

      <div className="highlight-variant-badge">
        {highlight.variant === 'rizta-z' ? 'Rizta Z' : 'Rizta S'}
      </div>
    </article>
  );
});

HighlightCard.displayName = 'HighlightCard';

// Server component for Ather Rizta key highlights
export default function RiztaKeyHighlights() {
  // Memoized highlights data to prevent re-creation
  const riztaHighlights = useMemo<HighlightItem[]>(() => [
    {
      id: 'range',
      iconType: 'battery',
      title: 'Long Range',
      subtitle: 'Up to 123 km',
      description: 'True range that gets you through your daily commute without range anxiety',
      variant: 'rizta-z'
    },
    {
      id: 'charging',
      iconType: 'zap',
      title: 'Fast Charging',
      subtitle: '0-80% in 65 mins',
      description: 'Quick charging technology that fits your busy lifestyle',
      variant: 'rizta-z'
    },
    {
      id: 'performance',
      iconType: 'bike',
      title: 'Peak Performance',
      subtitle: '4.3 kW Motor',
      description: 'Powerful motor delivering smooth acceleration and reliable performance',
      variant: 'rizta-z'
    }
  ], []);

  const riztaSHighlights = useMemo<HighlightItem[]>(() => [
    {
      id: 'range-s',
      iconType: 'battery',
      title: 'Extended Range',
      subtitle: 'Up to 160 km',
      description: 'Enhanced battery capacity for longer rides and extended adventures',
      variant: 'rizta-s'
    },
    {
      id: 'charging-s',
      iconType: 'zap',
      title: 'Rapid Charging',
      subtitle: '0-80% in 65 mins',
      description: 'Advanced charging technology with enhanced battery management',
      variant: 'rizta-s'
    },
    {
      id: 'performance-s',
      iconType: 'bike',
      title: 'Superior Performance',
      subtitle: '5.4 kW Motor',
      description: 'Enhanced motor power for exceptional performance and riding experience',
      variant: 'rizta-s'
    }
  ], []);

  // Combined highlights for better performance
  const allHighlights = useMemo(() => [
    ...riztaHighlights,
    ...riztaSHighlights
  ], [riztaHighlights, riztaSHighlights]);

  // Smart features data
  const smartFeatures = useMemo<HighlightItem[]>(() => [
    {
      id: 'touchscreen',
      iconType: 'monitor',
      title: '7" Touchscreen',
      subtitle: 'DeepView Display',
      description: 'Crystal clear touchscreen with intuitive interface and advanced connectivity',
      variant: 'rizta-z'
    },
    {
      id: 'connectivity',
      iconType: 'smartphone',
      title: 'Smart Connectivity',
      subtitle: 'Ather App Integration',
      description: 'Seamless smartphone integration with remote monitoring and controls',
      variant: 'rizta-z'
    },
    {
      id: 'security',
      iconType: 'shield',
      title: 'Advanced Security',
      subtitle: 'Multi-layer Protection',
      description: 'Comprehensive security features including GPS tracking and theft protection',
      variant: 'rizta-z'
    }
  ], []);

  // Structured data for highlights
  const highlightsSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ather Rizta Key Features",
    "description": "Key highlights and features of Ather Rizta electric scooters",
    "itemListElement": allHighlights.map((highlight, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": highlight.title,
      "description": `${highlight.subtitle} - ${highlight.description}`
    }))
  }), [allHighlights]);

  return (
    <>
      {/* Structured Data for Features */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(highlightsSchema) }}
      />

      <section
        className="highlights-section bg-gray-50 py-12 sm:py-16 lg:py-24"
        aria-labelledby="highlights-heading"
      >
        <div className="highlights-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <header className="highlights-header text-center mb-12">
            <h2
              id="highlights-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4"
            >
              Key Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes Ather Rizta the perfect choice for modern families
            </p>
          </header>

          {/* Performance Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Performance & Range
            </h3>
            <div
              className="highlights-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Performance highlights"
            >
              {riztaHighlights.map((highlight) => (
                <HighlightCard
                  key={highlight.id}
                  highlight={highlight}
                />
              ))}
            </div>
          </div>

          {/* Smart Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Smart Features
            </h3>
            <div
              className="highlights-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Smart features"
            >
              {smartFeatures.map((feature) => (
                <HighlightCard
                  key={feature.id}
                  highlight={feature}
                />
              ))}
            </div>
          </div>

          {/* Premium Rizta S Highlights */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Rizta S Premium Features
            </h3>
            <div
              className="highlights-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Premium features"
            >
              {riztaSHighlights.map((highlight) => (
                <HighlightCard
                  key={highlight.id}
                  highlight={highlight}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optimized CSS */}
      <style jsx>{`
        .highlight-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
          will-change: transform;
        }

        .highlight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #10b981;
        }

        .highlight-card:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .highlight-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .highlight-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827 !important;
          margin-bottom: 8px;
        }

        .highlight-subtitle {
          font-size: 1rem;
          font-weight: 600;
          color: #059669 !important;
          margin-bottom: 8px;
        }

        .highlight-description {
          font-size: 0.875rem;
          color: #374151 !important;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .highlight-variant-badge {
          display: inline-block;
          background: #f3f4f6;
          color: #374151 !important;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .highlights-grid {
          gap: 24px;
        }

        @media (max-width: 768px) {
          .highlight-card {
            padding: 20px;
          }

          .highlights-grid {
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}