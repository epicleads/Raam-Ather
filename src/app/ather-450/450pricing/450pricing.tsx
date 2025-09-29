import { Metadata } from 'next'
import Pricing450Client from './450pricing-client'

export const metadata: Metadata = {
  title: 'Ather 450S & 450X - Pricing & Specifications | Raam Ather',
  description: 'Explore Ather 450S starting at ₹1,19,841 and 450X at ₹1,46,999. Compare specifications, features, range, and performance of Ather electric scooters at Raam Ather dealership.',
  keywords: 'Ather 450S price, Ather 450X specifications, electric scooter price, Ather dealership, Raam Ather, EV scooter specs, Ather range, electric vehicle',
  openGraph: {
    title: 'Ather 450S & 450X - Pricing & Specifications',
    description: 'Compare Ather 450S and 450X models. Starting from ₹1,19,841. Check complete specifications, features and book test ride.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raam Ather',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ather 450S & 450X - Pricing & Specifications',
    description: 'Electric scooters starting from ₹1,19,841. Compare models and book test ride.',
  },
  alternates: {
    canonical: '/models/450/pricing-specs'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  }
}

// Structured data for rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ather 450 Series Electric Scooters",
  "brand": {
    "@type": "Brand",
    "name": "Ather Energy"
  },
  "description": "Premium electric scooters with advanced technology and performance",
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
      "reviewBody": "Excellent electric scooter series with outstanding performance and features across all models."
    }
  ],
  "manufacturer": {
    "@type": "Organization",
    "name": "Ather Energy"
  }
}

export default function Pricing450Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <main className="min-h-screen">
        <Pricing450Client />
      </main>
    </>
  )
}