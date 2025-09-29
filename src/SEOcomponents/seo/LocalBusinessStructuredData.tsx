import Script from 'next/script'

interface LocalBusinessProps {
  location: 'hyderabad' | 'chennai'
  specificArea?: string
  showroomData?: {
    name: string
    address: string
    phone: string
    hours: string
  }
}

export default function LocalBusinessStructuredData({ 
  location, 
  specificArea, 
  showroomData 
}: LocalBusinessProps) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://raamather.com/${location}#business`,
    "name": `Raam Ather - Premium Electric Scooter Dealer ${location === 'hyderabad' ? 'Hyderabad' : 'Chennai'}`,
    "image": [
      "https://raamather.com/assets/raam-ather-showroom.jpg",
      "https://raamather.com/assets/ather-electric-scooters.jpg",
      "https://raamather.com/assets/raam-dealership.jpg"
    ],
    "description": `Leading Ather electric scooter dealer in ${location === 'hyderabad' ? 'Hyderabad' : 'Chennai'}. Experience premium electric mobility with Ather 450X, Ather Rizta, and comprehensive service support.`,
    "url": `https://raamather.com/${location}`,
    "telephone": "+919032333833",
    "priceRange": "₹₹₹",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Net Banking", "EMI"],
    "currenciesAccepted": "INR",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": location === 'hyderabad' ? 'Telangana' : 'Tamil Nadu',
      "addressLocality": location === 'hyderabad' ? 'Hyderabad' : 'Chennai',
      "streetAddress": showroomData?.address || (location === 'hyderabad' 
        ? "Plot no: 311 & 312, Phase 3, Sri Nagar Colony, Banjara Hills"
        : "Ranganathan Street, T. Nagar"),
      "postalCode": location === 'hyderabad' ? '500073' : '600017'
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location === 'hyderabad' ? "17.4065" : "13.0827",
      "longitude": location === 'hyderabad' ? "78.4772" : "80.2707"
    },
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": location === 'hyderabad' ? "17.4065" : "13.0827",
          "longitude": location === 'hyderabad' ? "78.4772" : "80.2707"
        },
        "geoRadius": "50000"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electric Scooters",
      "itemListElement": [
        {
          "@type": "Offer",
          "price": "146926",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "itemOffered": {
            "@type": "Product",
            "name": "Ather 450X",
            "description": "Premium electric scooter with 105km range and smart features",
            "brand": {
              "@type": "Brand",
              "name": "Ather Energy"
            },
            "category": "Electric Scooter",
            "offers": {
              "@type": "Offer",
              "price": "146926",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2025-12-31",
              "seller": {
                "@type": "Organization",
                "name": "Raam Ather"
              },
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
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "reviewCount": "1500",
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
                  "name": "Premium Customer"
                },
                "reviewBody": "Outstanding premium scooter with excellent smart features and performance."
              }
            ]
          }
        },
        {
          "@type": "Offer",
          "price": "129999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "itemOffered": {
            "@type": "Product",
            "name": "Ather Rizta",
            "description": "Family electric scooter with excellent storage and comfort",
            "brand": {
              "@type": "Brand",
              "name": "Ather Energy"
            },
            "category": "Electric Scooter",
            "offers": {
              "@type": "Offer",
              "price": "129999",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2025-12-31",
              "seller": {
                "@type": "Organization",
                "name": "Raam Ather"
              },
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
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "800",
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
                  "name": "Family Rider"
                },
                "reviewBody": "Perfect family electric scooter with amazing comfort and storage space."
              }
            ]
          }
        }
      ]
    },
    "serviceArea": location === 'hyderabad' ? [
      "Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City", "Kondapur",
      "Kukatpally", "Secunderabad", "Begumpet", "Somajiguda", "Madhapur",
      "Uppal", "LB Nagar", "Kompally", "Miyapur"
    ] : [
      "T. Nagar", "Anna Nagar", "Velachery", "OMR", "Porur", "Tambaram",
      "Chromepet", "Adyar", "Sholinganallur", "Thoraipakkam", "Perungudi",
      "Guindy", "Nungambakkam", "Mylapore"
    ],
    "sameAs": [
      "https://www.facebook.com/raamather",
      "https://www.instagram.com/raamather",
      "https://www.youtube.com/@raamather",
      "https://www.linkedin.com/company/raamather"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "brand": {
      "@type": "Brand",
      "name": "Raam Ather",
      "logo": "https://raamather.com/assets/raam-ather-logo.png"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Raam Group",
      "url": "https://raamgroup.com"
    }
  }

  // Add specific showroom data if provided
  if (showroomData) {
    baseData.name = showroomData.name
    baseData.address.streetAddress = showroomData.address
    baseData.telephone = showroomData.phone.replace(/\s/g, '')
  }

  // Add area-specific data
  if (specificArea) {
    baseData["@id"] = `https://raamather.com/${location}/${specificArea}#business`
    baseData.url = `https://raamather.com/ather-${specificArea}-${location}`
    baseData.name += ` - ${specificArea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
  }

  return (
    <Script
      id={`local-business-${location}${specificArea ? `-${specificArea}` : ''}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseData, null, 2),
      }}
    />
  )
}

// Organization structured data for parent company
export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://raamather.com#organization",
    "name": "Raam Ather",
    "alternateName": "Raam Group Ather Dealership",
    "url": "https://raamather.com",
    "logo": "https://raamather.com/assets/raam-ather-logo.png",
    "image": "https://raamather.com/assets/raam-ather-hero.jpg",
    "description": "Leading Ather Energy dealer in Hyderabad and Chennai, offering premium electric scooters with world-class service and support.",
    "foundingDate": "2020",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "50-100"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+919032333833",
        "contactType": "sales",
        "areaServed": ["IN-TG", "IN-TN"],
        "availableLanguage": ["en", "hi", "te", "ta"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+919032333833",
        "contactType": "customer service",
        "areaServed": ["IN-TG", "IN-TN"],
        "availableLanguage": ["en", "hi", "te", "ta"]
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Plot no: 311 & 312, Phase 3, Sri Nagar Colony, Banjara Hills",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500073",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Ranganathan Street, T. Nagar",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu", 
        "postalCode": "600017",
        "addressCountry": "IN"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/raamather",
      "https://www.instagram.com/raamather",
      "https://www.youtube.com/@raamather",
      "https://www.linkedin.com/company/raamather"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electric Vehicle Dealership Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electric Scooter Sales",
            "description": "New electric scooter sales with comprehensive warranty"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Test Ride Booking",
            "description": "Free test rides for all electric scooter models"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "After Sales Service",
            "description": "Professional maintenance and repair services"
          }
        }
      ]
    }
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData, null, 2),
      }}
    />
  )
}