// rizta-pricing.tsx
import { RiztaPricingClient } from './rizta-pricing-client'
import { RIZTA_VARIANTS, RIZTA_STRUCTURED_DATA } from '@/data/riztaData'

export interface PricingData {
  id: string
  variant: string
  exShowroomPrice: number
  city: string
  onRoadPrice: number
  subsidy?: number
  emiStarting: number
  features: string[]
}

export interface EMIConfig {
  minDownPayment: number
  maxDownPayment: number
  tenureOptions: number[]
  interestRates: {
    [key: number]: number // tenure -> rate
  }
  processingFee: number
}

export interface ComparisonData {
  electricCostPerKm: number
  petrolCostPerKm: number
  dailyCommute: number
  monthlySavings: number
}

export interface DealerBadge {
  id: string
  title: string
  description: string
  icon: string
}

export default function RiztaPricing() {
  
  const pricingVariants: PricingData[] = RIZTA_VARIANTS.map(variant => ({
    id: variant.id,
    variant: variant.name,
    exShowroomPrice: variant.price,
    city: 'Hyderabad',
    onRoadPrice: variant.price + (variant.price * 0.08), // Estimated on-road price
    emiStarting: Math.floor(variant.price / 36), // Estimated EMI for 36 months
    features: variant.features
  }))

  const emiConfig: EMIConfig = {
    minDownPayment: 10000,
    maxDownPayment: 50000,
    tenureOptions: [12, 24, 36, 48],
    interestRates: {
      12: 8.5,
      24: 9.0,
      36: 9.5,
      48: 10.0
    },
    processingFee: 2000
  }

  const comparisonData: ComparisonData = {
    electricCostPerKm: 0.30,
    petrolCostPerKm: 3.00,
    dailyCommute: 25,
    monthlySavings: 2025
  }

  const dealerBadges: DealerBadge[] = [
    {
      id: 'warranty',
      title: '8-Year Warranty',
      description: 'Battery & Motor covered',
      icon: 'shield'
    },
    {
      id: 'finance',
      title: 'Easy Loan Approval',
      description: '90% approval rate',
      icon: 'check'
    },
    {
      id: 'transparent',
      title: 'Zero Hidden Charges',
      description: 'Complete transparency',
      icon: 'dollar'
    }
  ]

  // JSON-LD for SEO - Enhanced with multiple offers
  const pricingJsonLd = {
    ...RIZTA_STRUCTURED_DATA,
    'offers': pricingVariants.map(variant => ({
      '@type': 'Offer',
      'name': variant.variant,
      'price': variant.exShowroomPrice.toString(),
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'priceValidUntil': '2024-12-31',
      'seller': {
        '@type': 'LocalBusiness',
        'name': 'Raam Ather',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Hyderabad',
          'addressRegion': 'Telangana',
          'addressCountry': 'IN'
        }
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <section 
        className="bg-white py-12 sm:py-16 lg:py-24"
        id="pricing"
        aria-labelledby="pricing-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <header className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 
              id="pricing-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 font-neurial"
            >
              Pricing & Finance
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-neurial">
              Choose your perfect Rizta and discover how affordable electric mobility can be
            </p>
          </header>
          
          <RiztaPricingClient 
            variants={pricingVariants}
            emiConfig={emiConfig}
            comparisonData={comparisonData}
            dealerBadges={dealerBadges}
          />
        </div>
      </section>
    </>
  )
}