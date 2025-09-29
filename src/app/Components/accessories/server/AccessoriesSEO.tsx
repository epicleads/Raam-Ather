import { Metadata } from 'next';

export const accessoriesMetadata: Metadata = {
  title: 'Raam Ather Accessories – Smart Helmets, Chargers & More',
  description: 'Shop official Ather accessories including smart helmets, portable chargers, and premium seat covers. Enhance your electric scooter experience.',
  keywords: ['Raam Ather', 'accessories', 'smart helmet', 'chargers', 'seat covers', 'EV accessories'],
};

interface AccessoriesSEOProps {
  children?: React.ReactNode;
}

export default function AccessoriesSEO({ children }: AccessoriesSEOProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Raam Ather Accessories',
            description: 'Official Ather accessories and gear for electric scooters',
            url: 'https://raamather.com/accessories',
            mainEntity: {
              '@type': 'ItemList',
              name: 'Ather Accessories Collection',
              itemListElement: [
                {
                  '@type': 'Product',
                  position: 1,
                  name: 'Smart Helmet',
                  description: 'Bluetooth-enabled smart helmet for safe riding',
                  brand: {
                    '@type': 'Brand',
                    name: 'Ather Energy'
                  },
                  image: [
                    'https://raamather.com/Ather-Assets/accessories/smart-helmet-main.webp',
                    'https://raamather.com/Ather-Assets/accessories/smart-helmet-features.webp'
                  ],
                  offers: {
                    '@type': 'Offer',
                    price: '4999',
                    priceCurrency: 'INR',
                    availability: 'https://schema.org/InStock',
                    priceValidUntil: '2025-12-31',
                    seller: {
                      '@type': 'Organization',
                      name: 'Raam Ather'
                    },
                    hasMerchantReturnPolicy: {
                      '@type': 'MerchantReturnPolicy',
                      applicableCountry: 'IN',
                      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                      merchantReturnDays: 7,
                      returnMethod: 'https://schema.org/ReturnByMail',
                      returnFees: 'https://schema.org/FreeReturn'
                    },
                    shippingDetails: {
                      '@type': 'OfferShippingDetails',
                      shippingRate: {
                        '@type': 'MonetaryAmount',
                        value: '0',
                        currency: 'INR'
                      },
                      shippingDestination: {
                        '@type': 'DefinedRegion',
                        addressCountry: 'IN'
                      },
                      deliveryTime: {
                        '@type': 'ShippingDeliveryTime',
                        handlingTime: {
                          '@type': 'QuantitativeValue',
                          minValue: 1,
                          maxValue: 2,
                          unitCode: 'DAY'
                        },
                        transitTime: {
                          '@type': 'QuantitativeValue',
                          minValue: 2,
                          maxValue: 5,
                          unitCode: 'DAY'
                        }
                      }
                    }
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.5',
                    reviewCount: '85',
                    bestRating: '5',
                    worstRating: '1'
                  },
                  review: [
                    {
                      '@type': 'Review',
                      reviewRating: {
                        '@type': 'Rating',
                        ratingValue: '5',
                        bestRating: '5'
                      },
                      author: {
                        '@type': 'Person',
                        name: 'Happy Customer'
                      },
                      reviewBody: 'Excellent smart helmet with great connectivity features.'
                    }
                  ]
                },
                {
                  '@type': 'Product',
                  position: 2,
                  name: 'Portable Charger',
                  description: 'Charge your Ather scooter anywhere',
                  brand: {
                    '@type': 'Brand',
                    name: 'Ather Energy'
                  },
                  image: [
                    'https://raamather.com/Ather-Assets/accessories/portable-charger-main.webp',
                    'https://raamather.com/Ather-Assets/accessories/portable-charger-use.webp'
                  ],
                  offers: {
                    '@type': 'Offer',
                    price: '2999',
                    priceCurrency: 'INR',
                    availability: 'https://schema.org/InStock',
                    priceValidUntil: '2025-12-31',
                    seller: {
                      '@type': 'Organization',
                      name: 'Raam Ather'
                    },
                    hasMerchantReturnPolicy: {
                      '@type': 'MerchantReturnPolicy',
                      applicableCountry: 'IN',
                      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                      merchantReturnDays: 7,
                      returnMethod: 'https://schema.org/ReturnByMail',
                      returnFees: 'https://schema.org/FreeReturn'
                    },
                    shippingDetails: {
                      '@type': 'OfferShippingDetails',
                      shippingRate: {
                        '@type': 'MonetaryAmount',
                        value: '0',
                        currency: 'INR'
                      },
                      shippingDestination: {
                        '@type': 'DefinedRegion',
                        addressCountry: 'IN'
                      },
                      deliveryTime: {
                        '@type': 'ShippingDeliveryTime',
                        handlingTime: {
                          '@type': 'QuantitativeValue',
                          minValue: 1,
                          maxValue: 2,
                          unitCode: 'DAY'
                        },
                        transitTime: {
                          '@type': 'QuantitativeValue',
                          minValue: 2,
                          maxValue: 5,
                          unitCode: 'DAY'
                        }
                      }
                    }
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.3',
                    reviewCount: '62',
                    bestRating: '5',
                    worstRating: '1'
                  },
                  review: [
                    {
                      '@type': 'Review',
                      reviewRating: {
                        '@type': 'Rating',
                        ratingValue: '4',
                        bestRating: '5'
                      },
                      author: {
                        '@type': 'Person',
                        name: 'Verified Buyer'
                      },
                      reviewBody: 'Convenient portable charger, works well for emergency charging.'
                    }
                  ]
                },
                {
                  '@type': 'Product',
                  position: 3,
                  name: 'Premium Seat Cover',
                  description: 'Comfortable and stylish seat cover',
                  brand: {
                    '@type': 'Brand',
                    name: 'Ather Energy'
                  },
                  image: [
                    'https://raamather.com/Ather-Assets/accessories/premium-seat-cover-main.webp',
                    'https://raamather.com/Ather-Assets/accessories/premium-seat-cover-installed.webp'
                  ],
                  offers: {
                    '@type': 'Offer',
                    price: '1999',
                    priceCurrency: 'INR',
                    availability: 'https://schema.org/InStock',
                    priceValidUntil: '2025-12-31',
                    seller: {
                      '@type': 'Organization',
                      name: 'Raam Ather'
                    },
                    hasMerchantReturnPolicy: {
                      '@type': 'MerchantReturnPolicy',
                      applicableCountry: 'IN',
                      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                      merchantReturnDays: 7,
                      returnMethod: 'https://schema.org/ReturnByMail',
                      returnFees: 'https://schema.org/FreeReturn'
                    },
                    shippingDetails: {
                      '@type': 'OfferShippingDetails',
                      shippingRate: {
                        '@type': 'MonetaryAmount',
                        value: '0',
                        currency: 'INR'
                      },
                      shippingDestination: {
                        '@type': 'DefinedRegion',
                        addressCountry: 'IN'
                      },
                      deliveryTime: {
                        '@type': 'ShippingDeliveryTime',
                        handlingTime: {
                          '@type': 'QuantitativeValue',
                          minValue: 1,
                          maxValue: 2,
                          unitCode: 'DAY'
                        },
                        transitTime: {
                          '@type': 'QuantitativeValue',
                          minValue: 2,
                          maxValue: 5,
                          unitCode: 'DAY'
                        }
                      }
                    }
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.4',
                    reviewCount: '73',
                    bestRating: '5',
                    worstRating: '1'
                  },
                  review: [
                    {
                      '@type': 'Review',
                      reviewRating: {
                        '@type': 'Rating',
                        ratingValue: '5',
                        bestRating: '5'
                      },
                      author: {
                        '@type': 'Person',
                        name: 'Satisfied Customer'
                      },
                      reviewBody: 'High quality seat cover with excellent comfort and style.'
                    }
                  ]
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}