import type { Metadata } from 'next';
import Ather450Hero from "./ather-450-hero/Ather450Hero";
import Pricing450Page from "./450pricing/450pricing";
import WhatsNewServer from "./whatsnew";
import Performance from "./performance/performance";
import Safety from "./safety/safety";
import ComfortSection from "./comfort/comfort";
import FinalCTA from "./FinalCTA";
import { Ather450FAQ } from "./faq";
import FooterClient from "../Components/footer/footerclient";

export const metadata: Metadata = {
  title: 'Ather 450 Electric Scooter - Smart, Powerful & Efficient | Best EV in India',
  description: 'Experience the revolutionary Ather 450 electric scooter with 90 km/h top speed, 161 km range, and smart features. Book a test ride today. Starting at ₹1,19,841. Zero emissions, maximum performance.',
  keywords: [
    'Ather 450',
    'electric scooter',
    'EV scooter India',
    'Ather 450 price',
    'smart scooter',
    'electric vehicle',
    'zero emission scooter',
    'Ather 450 range',
    'Ather 450 speed',
    'Ather 450 specifications',
    'best electric scooter India',
    'Ather scooter features',
    'eco-friendly transport',
    'sustainable mobility',
    'smart dashboard scooter'
  ],
  authors: [{ name: 'Raam Ather' }],
  twitter: {
    card: 'summary_large_image',
    title: 'Ather 450 Electric Scooter - Smart & Powerful EV',
    description: 'Experience the future with Ather 450: 90 km/h speed, 161 km range, smart features. Zero emissions, maximum performance. Test ride now!',
    siteId: '@RaamAther',
    creator: '@RaamAther',
    creatorId: '@RaamAther',
    images: ['/images/ather-450-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  alternates: {
    canonical: 'https://raamather.com/ather-450',
  },
  manifest: '/manifest.json',
  category: 'technology',
  classification: 'Electric Vehicles, Transportation, Technology'
};

// Next.js 13+ separate exports for viewport and themeColor
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};


export default function Ather450Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://raamather.com/ather-450#product",
        "name": "Ather 450 Electric Scooter",
        "description": "Revolutionary electric scooter with smart features, 90 km/h top speed, and 161 km range. Zero emissions, maximum performance.",
        "productGroupID": "ather-450-series",
        "brand": {
          "@type": "Brand",
          "name": "Ather Energy",
          "logo": "https://raamather.com/images/ather-logo.png"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Ather Energy",
          "url": "https://atherenergy.com"
        },
        "category": "Electric Scooter",
        "offers": [
          {
            "@type": "Offer",
            "name": "Ather 450S",
            "price": "119841",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Raam Ather"
            },
            "validFrom": "2025-01-01",
            "priceValidUntil": "2025-12-31",
            "url": "https://raamather.com/ather-450#450s",
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "IN",
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
          {
            "@type": "Offer",
            "name": "Ather 450X",
            "price": "146999",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Raam Ather"
            },
            "validFrom": "2025-01-01",
            "priceValidUntil": "2025-12-31",
            "url": "https://raamather.com/ather-450#450x",
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "IN",
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
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "2847",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Satisfied Customer"
            },
            "reviewBody": "Outstanding electric scooter with amazing smart features and excellent performance. Highly recommended!"
          }
        ],
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Top Speed",
            "value": "90 km/h"
          },
          {
            "@type": "PropertyValue",
            "name": "Range",
            "value": "161 km"
          },
          {
            "@type": "PropertyValue",
            "name": "Acceleration",
            "value": "0-40 km/h in 3.3s"
          },
          {
            "@type": "PropertyValue",
            "name": "Battery Type",
            "value": "Lithium-ion"
          },
          {
            "@type": "PropertyValue",
            "name": "Charging Time",
            "value": "5.5 hours"
          }
        ],
        "image": [
          "https://raamather.com/images/ather-450-hero.jpg",
          "https://raamather.com/images/ather-450-side-view.jpg",
          "https://raamather.com/images/ather-450-dashboard.jpg"
        ],
        "url": "https://raamather.com/ather-450"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://raamather.com/#organization",
        "name": "Raam Ather",
        "description": "Authorized Ather Energy dealer offering premium electric scooters with exceptional service and support.",
        "url": "https://raamather.com",
        "telephone": "+91-XXX-XXX-XXXX",
        "email": "info@raamather.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "17.3850",
          "longitude": "78.4867"
        },
        "openingHours": [
          "Mo-Sa 09:00-19:00",
          "Su 10:00-17:00"
        ],
        "priceRange": "₹₹₹",
        "servedCuisine": "Electric Vehicles",
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@id": "https://raamather.com/ather-450#product"
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://raamather.com/ather-450#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://raamather.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Ather 450",
            "item": "https://raamather.com/ather-450"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://raamather.com/ather-450#webpage",
        "url": "https://raamather.com/ather-450",
        "name": "Ather 450 Electric Scooter - Smart, Powerful & Efficient",
        "description": "Experience the revolutionary Ather 450 electric scooter with smart features, premium performance, and zero emissions. Book your test ride today.",
        "datePublished": "2024-01-01",
        "dateModified": "2024-12-01",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://raamather.com/images/ather-450-hero.jpg",
          "width": 1200,
          "height": 630
        },
        "mainEntity": {
          "@id": "https://raamather.com/ather-450#product"
        },
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://raamather.com/#website"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "WebSite",
        "@id": "https://raamather.com/#website",
        "url": "https://raamather.com",
        "name": "Raam Ather",
        "description": "Authorized Ather Energy dealer offering premium electric scooters, exceptional service, and sustainable mobility solutions.",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": "https://raamather.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/raamather",
          "https://www.instagram.com/raamather",
          "https://www.twitter.com/raamather",
          "https://www.linkedin.com/company/raamather"
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Ather450Hero />
        <Pricing450Page />  
        <WhatsNewServer />
        <Performance />
        <Safety />
        <ComfortSection />
        
        {/* Pass model name here */}
        <FinalCTA model="450" />
        
        {/* FAQ Section */}
        <Ather450FAQ />
        <FooterClient />
      </div>
    </>
  );
}
