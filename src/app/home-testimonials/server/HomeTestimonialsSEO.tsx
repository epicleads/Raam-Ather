import { Metadata } from 'next';
import { Testimonial } from '../home-testimonials.types';

interface HomeTestimonialsSEOProps {
  testimonials: Testimonial[];
}

export function generateHomeTestimonialsMetadata(testimonials: Testimonial[]): Partial<Metadata> {
  const reviewCount = testimonials.length;
  const avgRating = testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / reviewCount;

  return {
    title: `Raam Ather Testimonials - Real Reviews from ${reviewCount}+ Riders | Customer Experiences`,
    description: `Discover genuine reviews and testimonials from Ather electric scooter owners. Read real experiences from ${reviewCount}+ satisfied riders with an average rating of ${avgRating.toFixed(1)}/5 stars.`,
    keywords: [
      'Ather testimonials',
      'Ather reviews',
      'electric scooter reviews',
      'Ather customer experience',
      'Ather rider reviews',
      'electric vehicle testimonials',
      'Ather user feedback',
      'Ather satisfaction',
      'electric scooter ownership experience'
    ],
    openGraph: {
      title: `Raam Ather Testimonials - Hear from Our Riders`,
      description: `Real experiences from ${reviewCount}+ Ather riders. Average rating: ${avgRating.toFixed(1)}/5 stars. Discover why riders choose Ather electric scooters.`,
      type: 'website',
      images: [
        {
          url: '/Ather-Assets/testimonials/ather-riders-testimonials.jpg',
          width: 1200,
          height: 630,
          alt: 'Ather Electric Scooter Testimonials and Reviews'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Real Ather Reviews - ${reviewCount}+ Happy Riders`,
      description: `Genuine testimonials from Ather electric scooter owners. Average ${avgRating.toFixed(1)}/5 star rating.`,
      images: ['/Ather-Assets/testimonials/ather-riders-testimonials.jpg']
    }
  };
}

export function HomeTestimonialsSEO({ testimonials }: HomeTestimonialsSEOProps) {
  const avgRating = testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ather Electric Scooter Testimonials",
    "description": "Customer testimonials and reviews for Ather electric scooters",
    "numberOfItems": testimonials.length,
    "itemListElement": testimonials.map((testimonial, index) => ({
      "@type": "Review",
      "position": index + 1,
      "reviewBody": testimonial.review,
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        ...(testimonial.role && { "jobTitle": testimonial.role })
      },
      ...(testimonial.rating && {
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating,
          "bestRating": 5
        }
      }),
      "itemReviewed": {
        "@type": "Product",
        "name": "Ather Electric Scooter",
        "brand": {
          "@type": "Brand",
          "name": "Ather Energy"
        },
        "description": "Premium electric scooter with smart features and sustainable mobility",
        "category": "Electric Scooter",
        "offers": {
          "@type": "Offer",
          "price": "146999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-31",
          "seller": {
            "@type": "Organization",
            "name": "Raam Ather"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "2500",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": testimonials.length,
      "bestRating": 5,
      "itemReviewed": {
        "@type": "Product",
        "name": "Ather Electric Scooter",
        "brand": {
          "@type": "Brand",
          "name": "Ather Energy"
        },
        "description": "Premium electric scooter with smart features and sustainable mobility",
        "category": "Electric Scooter",
        "offers": {
          "@type": "Offer",
          "price": "146999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-31",
          "seller": {
            "@type": "Organization",
            "name": "Raam Ather"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "2500",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}