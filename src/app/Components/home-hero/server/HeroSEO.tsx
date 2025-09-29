interface HeroSEOProps {
  title: string;
  description: string;
}

export function HeroSEO({ title, description }: HeroSEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://raamather.com/#organization",
        "name": "Raam Ather",
        "url": "https://raamather.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://raamather.com/logo.png",
          "width": 300,
          "height": 100
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "customer service",
            "areaServed": ["Chennai", "Hyderabad"],
            "availableLanguage": ["English", "Tamil", "Telugu", "Hindi"]
          }
        ],
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "Your Chennai Address",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600001",
            "addressCountry": "IN"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Your Hyderabad Address",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500001",
            "addressCountry": "IN"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/raamather",
          "https://www.instagram.com/raamather",
          "https://www.youtube.com/raamather"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://raamather.com/#website",
        "url": "https://raamather.com",
        "name": "Raam Ather",
        "description": description,
        "publisher": {
          "@id": "https://raamather.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://raamather.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://raamather.com/#localbusiness",
        "name": "Raam Ather",
        "description": "Premium Ather Electric Scooter Dealership",
        "url": "https://raamather.com",
        "telephone": "+91-XXXXXXXXXX",
        "priceRange": "₹₹₹",
        "image": "https://raamather.com/store-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Main Store Address",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "13.0827",
          "longitude": "80.2707"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "18:00"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Ather Electric Scooters",
          "itemListElement": [
            {
              "@type": "Offer",
              "price": "119841",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
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
              },
              "itemOffered": {
                "@type": "Product",
                "name": "Ather 450S",
                "description": "Entry-level smart electric scooter with essential features and reliable performance",
                "category": "Electric Scooter",
                "image": [
                  "https://raamather.com/Ather-Assets/450S/ather-450s-main.webp",
                  "https://raamather.com/Ather-Assets/450S/ather-450s-dashboard.webp"
                ],
                "brand": {
                  "@type": "Brand",
                  "name": "Ather Energy"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "119841",
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
                  "ratingValue": "4.5",
                  "reviewCount": "150",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            },
            {
              "@type": "Offer",
              "price": "146999",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
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
              },
              "itemOffered": {
                "@type": "Product",
                "name": "Ather 450X",
                "description": "Premium smart electric scooter with advanced features, touchscreen dashboard, and superior performance",
                "category": "Electric Scooter",
                "image": [
                  "https://raamather.com/Ather-Assets/450X/ather-450x-main.webp",
                  "https://raamather.com/Ather-Assets/450X/ather-450x-dashboard.webp"
                ],
                "brand": {
                  "@type": "Brand",
                  "name": "Ather Energy"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "146999",
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
                  "reviewCount": "200",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            },
            {
              "@type": "Offer",
              "price": "129999",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
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
              },
              "itemOffered": {
                "@type": "Product",
                "name": "Ather Rizta",
                "description": "Family-friendly electric scooter with spacious design, 159km range, and comfortable seating for two",
                "category": "Electric Scooter",
                "image": [
                  "https://raamather.com/Ather-Assets/Rizta/rizta-main-image.webp",
                  "https://raamather.com/Ather-Assets/Rizta/rizta-family-riding.webp"
                ],
                "brand": {
                  "@type": "Brand",
                  "name": "Ather Energy"
                },
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
                  "reviewCount": "127",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            }
          ]
        }
      },
      {
        "@type": "ProductGroup",
        "productGroupID": "ather-electric-scooters",
        "name": title,
        "description": description,
        "brand": {
          "@type": "Brand",
          "name": "Ather Energy",
          "logo": "https://raamather.com/ather-logo.png"
        },
        "category": "Electric Scooter",
        "manufacturer": {
          "@type": "Organization",
          "name": "Ather Energy",
          "url": "https://www.atherenergy.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.6",
          "reviewCount": "470",
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
            "reviewBody": "Excellent electric scooters with outstanding performance and service from Raam Ather."
          }
        ],
        "hasVariant": [
          {
            "@type": "Product",
            "name": "Ather 450S",
            "description": "Entry-level smart electric scooter with essential features and reliable performance",
            "productGroupID": "ather-450-series",
            "model": "450S",
            "sku": "ATHER-450S",
            "mpn": "450S-2024",
            "image": [
              "https://raamather.com/Ather-Assets/450S/ather-450s-main.webp",
              "https://raamather.com/Ather-Assets/450S/ather-450s-side-view.webp"
            ],
            "offers": {
              "@type": "Offer",
              "url": "https://raamather.com/ather-450",
              "priceCurrency": "INR",
              "price": "119999",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@id": "https://raamather.com/#organization"
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
              "ratingValue": "4.5",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          {
            "@type": "Product",
            "name": "Ather 450X",
            "description": "Premium smart electric scooter with advanced features, touchscreen dashboard, and superior performance",
            "productGroupID": "ather-450-series",
            "model": "450X",
            "sku": "ATHER-450X",
            "mpn": "450X-2024",
            "image": [
              "https://raamather.com/Ather-Assets/450X/ather-450x-main.webp",
              "https://raamather.com/Ather-Assets/450X/ather-450x-dashboard.webp"
            ],
            "offers": {
              "@type": "Offer",
              "url": "https://raamather.com/ather-450",
              "priceCurrency": "INR",
              "price": "139999",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@id": "https://raamather.com/#organization"
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
              "reviewCount": "200",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          {
            "@type": "Product",
            "name": "Ather Rizta",
            "description": "Family-friendly electric scooter with spacious design, 159km range, and comfortable seating for two",
            "productGroupID": "ather-rizta-series",
            "model": "Rizta",
            "sku": "ATHER-RIZTA",
            "mpn": "RIZTA-2024",
            "image": [
              "https://raamather.com/Ather-Assets/Rizta/rizta-main-image.webp",
              "https://raamather.com/Ather-Assets/Rizta/rizta-family-riding.webp"
            ],
            "offers": {
              "@type": "Offer",
              "url": "https://raamather.com/rizta",
              "priceCurrency": "INR",
              "price": "109999",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@id": "https://raamather.com/#organization"
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
              "ratingValue": "4.6",
              "reviewCount": "120",
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}