// rizta-pricing.tsx
import { RiztaPricingClient } from './rizta-pricing-client'

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
  
  const pricingVariants: PricingData[] = [
    {
      id: 'rizta-base',
      variant: 'Rizta',
      exShowroomPrice: 109999,
      city: 'Hyderabad',
      onRoadPrice: 118000,
      
      emiStarting: 2899,
      features: ['3.7kWh Battery', '123km Range', 'Smart Dashboard']
    },
    {
      id: 'rizta-s',
      variant: 'Rizta S',
      exShowroomPrice: 129999,
      city: 'Hyderabad',
      onRoadPrice: 142000,
      
      emiStarting: 3499,
      features: ['4.8kWh Battery', '159km Range', '7" Touchscreen']
    }
  ]

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

  // JSON-LD for SEO
  const pricingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Ather Rizta',
    'brand': {
      '@type': 'Brand',
      'name': 'Ather Energy'
    },
    'offers': pricingVariants.map(variant => ({
      '@type': 'Offer',
      'name': variant.variant,
      'price': variant.exShowroomPrice.toString(),
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'priceValidUntil': '2024-12-31',
      'seller': {
        '@type': 'Organization',
        'name': 'Ather Energy'
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 font-neurial">
              Pricing & Finance
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-neurial">
              Choose your perfect Rizta and discover how affordable electric mobility can be
            </p>
          </div>
          
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