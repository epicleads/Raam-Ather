import { Metadata } from 'next'
import Script from 'next/script'

interface LocalSEOProps {
  location: 'hyderabad' | 'chennai'
  specificArea?: string
  pageType?: 'landing' | 'product' | 'service' | 'showroom'
  productName?: string
}

export function generateLocalMetadata({
  location,
  specificArea,
  pageType = 'landing',
  productName
}: LocalSEOProps): Metadata {
  const locationName = location === 'hyderabad' ? 'Hyderabad' : 'Chennai'
  const stateCode = location === 'hyderabad' ? 'Telangana' : 'Tamil Nadu'
  const areaName = specificArea ? specificArea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : ''
  
  let title: string
  let description: string
  let keywords: string[]

  switch (pageType) {
    case 'product':
      title = `${productName} ${locationName} - Raam Ather Dealer | Best Price & Test Ride`
      description = `Buy ${productName} in ${locationName} at Raam Ather dealership. Best prices, immediate delivery, free test rides, and comprehensive warranty. ${areaName ? `Available in ${areaName}.` : ''}`
      keywords = [
        `${productName} ${locationName}`,
        `${productName} price ${locationName}`,
        `buy ${productName} ${locationName}`,
        `${productName} dealer ${locationName}`,
        `${productName} showroom ${locationName}`,
        'Raam Ather',
        `electric scooter ${locationName}`,
        `EV dealer ${locationName}`
      ]
      break

    case 'service':
      title = `Ather Service Center ${locationName} - Raam Ather | Expert Maintenance & Repair`
      description = `Professional Ather service center in ${locationName}. Expert technicians, genuine parts, doorstep service, and 24x7 support. Book service appointment at Raam Ather.`
      keywords = [
        `Ather service center ${locationName}`,
        `electric scooter service ${locationName}`,
        `Ather repair ${locationName}`,
        `EV maintenance ${locationName}`,
        'Raam Ather service',
        `doorstep service ${locationName}`
      ]
      break

    case 'showroom':
      title = `Raam Ather Showroom ${locationName} ${areaName} - Experience Electric Mobility`
      description = `Visit Raam Ather showroom in ${areaName}, ${locationName}. Experience all Ather models, free test rides, expert consultation, and immediate delivery. ${stateCode}'s trusted electric vehicle dealer.`
      keywords = [
        `Ather showroom ${locationName}`,
        `Raam Ather ${areaName}`,
        `electric scooter showroom ${locationName}`,
        `Ather dealer ${areaName}`,
        `EV showroom ${locationName}`,
        `test ride ${locationName}`
      ]
      break

    default: // landing
      title = specificArea 
        ? `Ather ${areaName} ${locationName} - Raam Dealer | Electric Scooters & Service`
        : `Raam Ather ${locationName} - #1 Electric Scooter Dealer | Best Prices & Service`
      description = specificArea
        ? `Raam Ather dealer in ${areaName}, ${locationName}. Premium electric scooters, competitive pricing, free test rides, and expert service. Your trusted EV partner in ${areaName}.`
        : `Leading Ather electric scooter dealer in ${locationName}. Experience Ather 450X, Rizta with best prices, immediate delivery, and comprehensive service across ${stateCode}.`
      keywords = [
        `Raam Ather ${locationName}`,
        `Ather dealer ${locationName}`,
        `Ather showroom ${locationName}`,
        `electric scooter ${locationName}`,
        `EV dealer ${locationName}`,
        `Ather ${locationName}`,
        `electric vehicle ${locationName}`,
        `Ather Energy ${locationName}`,
        ...(specificArea ? [`Ather ${areaName}`, `electric scooter ${areaName}`] : [])
      ]
  }

  const canonicalUrl = specificArea 
    ? `https://raamather.com/ather-${specificArea}-${location}`
    : `https://raamather.com/${location}`

  return {
    title: `${title} | raamather.com`,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Raam Ather', url: 'https://raamather.com' }],
    creator: 'Raam Ather',
    publisher: 'Raam Group',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://raamather.com'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        'hi-IN': canonicalUrl,
        'te-IN': location === 'hyderabad' ? canonicalUrl : undefined,
        'ta-IN': location === 'chennai' ? canonicalUrl : undefined,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Raam Ather',
      images: [
        {
          url: 'https://raamather.com/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Raam Ather Electric Scooter Dealer ${locationName}`,
        },
        {
          url: 'https://raamather.com/assets/ather-showroom.jpg',
          width: 800,
          height: 600,
          alt: `Raam Ather Showroom ${locationName}`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://raamather.com/assets/og-image.jpg'],
      creator: '@raamather',
      site: '@raamather',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    category: 'Electric Vehicle Dealer',
    classification: 'Business',
  }
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ 
  location, 
  specificArea, 
  pageType,
  productName 
}: LocalSEOProps) {
  const locationName = location === 'hyderabad' ? 'Hyderabad' : 'Chennai'
  const areaName = specificArea ? specificArea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : ''

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://raamather.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": locationName,
      "item": `https://raamather.com/${location}`
    }
  ]

  if (specificArea) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": areaName,
      "item": `https://raamather.com/ather-${specificArea}-${location}`
    })
  }

  if (productName && pageType === 'product') {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": breadcrumbItems.length + 1,
      "name": productName,
      "item": `https://raamather.com/${productName.toLowerCase().replace(/\s+/g, '-')}-${location}`
    })
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  }

  return (
    <Script
      id={`breadcrumb-${location}${specificArea ? `-${specificArea}` : ''}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2),
      }}
    />
  )
}

// FAQ structured data for location-specific queries
export function LocationFAQStructuredData({ location }: { location: 'hyderabad' | 'chennai' }) {
  const locationName = location === 'hyderabad' ? 'Hyderabad' : 'Chennai'
  const stateCode = location === 'hyderabad' ? 'Telangana' : 'Tamil Nadu'

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Where is Raam Ather showroom located in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Raam Ather has multiple showrooms across ${locationName}. Our main showroom in ${locationName} offers complete Ather electric scooter experience with test rides and expert consultation.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the price of Ather electric scooters in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ather electric scooter prices in ${locationName} start from ₹1,09,999 for Ather Rizta and ₹1,46,926 for Ather 450X. Prices include ${stateCode} state benefits and subsidies.`
        }
      },
      {
        "@type": "Question",
        "name": `How to book Ather test ride in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Book your free Ather test ride in ${locationName} by visiting our website, calling +91 90323 33833, or visiting any Raam Ather showroom. Test rides are available 7 days a week.`
        }
      },
      {
        "@type": "Question",
        "name": `Does Raam Ather provide service in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Raam Ather provides comprehensive service support in ${locationName} including doorstep service, periodic maintenance, genuine parts, and 24x7 roadside assistance.`
        }
      }
    ]
  }

  return (
    <Script
      id={`faq-${location}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2),
      }}
    />
  )
}