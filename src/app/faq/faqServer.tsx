import { FaqClient } from './faqClient'
import { riztaFaq } from '@/data/faq/riztaFaq'

export interface FaqItem {
  question: string
  answer: string
  id?: string
}

interface FaqServerProps {
  faqs: FaqItem[]
  title?: string
  subtitle?: string
  location?: string
  productName?: string
}

export function FaqServer({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Get answers to the most common questions about our electric scooters",
  location,
  productName = "Ather Electric Scooter"
}: FaqServerProps) {

  // Generate structured data for SEO
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  // Generate location-specific structured data
  const locationStructuredData = location ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Ather Energy ${location}`,
    "url": "https://www.atherenergy.com",
    "areaServed": location,
    "brand": {
      "@type": "Brand",
      "name": "Ather Energy"
    },
    "product": {
      "@type": "Product",
      "name": productName,
      "category": "Electric Scooter",
      "brand": {
        "@type": "Brand",
        "name": "Ather Energy"
      },
      "offers": {
        "@type": "Offer",
        "price": "146999",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Raam Ather"
        },
        "priceValidUntil": "2025-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  } : null

  return (
    <>
      {/* SEO Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      {locationStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(locationStructuredData)
          }}
        />
      )}

      {/* FAQ Section */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-6 font-[Inter] tracking-tight">
                {location ? `${title} - ${location}` : title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
              {location && (
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                  =� Serving {location} and surrounding areas
                </div>
              )}
            </div>

            {/* FAQ Content */}
            <FaqClient faqs={faqs} />

            {/* Location-specific CTA */}
            {location && (
              <div className="mt-16 text-center p-8 bg-gray-50 border border-gray-100">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Ready to experience {productName} in {location}?
                </h3>
                <p className="text-gray-600 mb-6">
                  Book a test ride at our {location} experience center
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors duration-200">
                  Book Test Ride in {location}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// Convenience component for Rizta FAQ
export function RiztaFaqServer({ location }: { location?: string }) {
  return (
    <FaqServer
      faqs={riztaFaq}
      title="Ather Rizta FAQ"
      subtitle="Everything you need to know about India's smartest family scooter"
      location={location}
      productName="Ather Rizta"
    />
  )
}
