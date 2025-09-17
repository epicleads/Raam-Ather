// rizta-pricing-client.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useTestDriveModal } from '../../Components/test-ride-form/TestDriveModalStore'

interface PricingData {
  id: string
  variant: string
  exShowroomPrice: number
  city: string
  onRoadPrice: number
  subsidy?: number
  emiStarting: number
  features: string[]
}

interface EMIConfig {
  minDownPayment: number
  maxDownPayment: number
  tenureOptions: number[]
  interestRates: {
    [key: number]: number
  }
  processingFee: number
}

interface ComparisonData {
  electricCostPerKm: number
  petrolCostPerKm: number
  dailyCommute: number
  monthlySavings: number
}

interface DealerBadge {
  id: string
  title: string
  description: string
  icon: string
}

interface RiztaPricingClientProps {
  variants: PricingData[]
  emiConfig: EMIConfig
  comparisonData: ComparisonData
  dealerBadges: DealerBadge[]
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('₹', '₹')
}

const AnimatedNumber = ({ value, duration = 0.8 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = startValue + (value - startValue) * easeOutCubic
      setDisplayValue(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, displayValue])

  return <span>{formatCurrency(displayValue)}</span>
}


export function RiztaPricingClient({ variants, comparisonData }: RiztaPricingClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const testDriveModal = useTestDriveModal()

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  // EMI Calculation
  // const emi = ((selectedVariant.onRoadPrice - downPayment) * ((emiConfig.interestRates[tenure] || 9.5) / 100 / 12) * Math.pow(1 + ((emiConfig.interestRates[tenure] || 9.5) / 100 / 12), tenure)) / (Math.pow(1 + ((emiConfig.interestRates[tenure] || 9.5) / 100 / 12), tenure) - 1)

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      {/* Pricing Cards */}
      <div className="grid gap-8 sm:gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer group ${
              selectedVariant.id === variant.id
                ? 'border-black bg-black text-white shadow-2xl transform scale-100 sm:scale-105'
                : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-xl'
            }`}
            onClick={() => setSelectedVariant(variant)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Recommended Badge - Hidden on Mobile */}
            {index === 1 && (
              <div className="hidden sm:block absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-black text-white px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs font-semibold font-neurial shadow-lg">
                  RECOMMENDED
                </div>
              </div>
            )}

            <div className="text-center space-y-4 sm:space-y-6 mt-2 sm:mt-0">
              {/* Variant Name */}
              <div>
                <h3 className={`text-xl sm:text-2xl font-light mb-1 font-neurial ${
                  selectedVariant.id === variant.id ? 'text-white' : 'text-black'
                }`}>
                  Ather {variant.variant}
                </h3>
                <p className={`text-sm font-neurial ${
                  selectedVariant.id === variant.id ? 'text-gray-300' : 'text-gray-600'
                }`}>Starting from</p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight font-neurial ${
                  selectedVariant.id === variant.id ? 'text-white' : 'text-black'
                }`}>
                  <AnimatedNumber value={variant.exShowroomPrice} />
                </div>
                <p className={`text-xs font-neurial ${
                  selectedVariant.id === variant.id ? 'text-gray-300' : 'text-gray-500'
                }`}>Ex-showroom {variant.city}</p>
                {variant.subsidy && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-neurial ${
                    selectedVariant.id === variant.id 
                      ? 'bg-white text-black' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    Save {formatCurrency(variant.subsidy)} with FAME
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                {variant.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-center space-x-2">
                    <div className={`w-1 h-1 rounded-full ${
                      selectedVariant.id === variant.id ? 'bg-white' : 'bg-black'
                    }`}></div>
                    <span className={`text-sm font-neurial ${
                      selectedVariant.id === variant.id ? 'text-gray-200' : 'text-gray-700'
                    }`}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* EMI */}
              <div className={`pt-4 border-t ${
                selectedVariant.id === variant.id ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <p className={`text-xs mb-1 font-neurial ${
                  selectedVariant.id === variant.id ? 'text-gray-300' : 'text-gray-600'
                }`}>EMI starts from</p>
                <div className={`text-lg sm:text-xl font-medium font-neurial ${
                  selectedVariant.id === variant.id ? 'text-white' : 'text-black'
                }`}>
                  {formatCurrency(variant.emiStarting)}<span className={`text-sm font-neurial ${
                    selectedVariant.id === variant.id ? 'text-gray-300' : 'text-gray-600'
                  }`}>/month</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    

      
      {/* Cost Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-xl"
      >
        <h3 className="text-xl sm:text-2xl font-light text-black mb-4 sm:mb-6 text-center font-neurial">Monthly Savings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-neurial">Electric Cost</p>
            <div className="text-xl sm:text-2xl font-light text-black font-neurial">
              ₹{comparisonData.electricCostPerKm}/km
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-neurial">Petrol Cost</p>
            <div className="text-xl sm:text-2xl font-light text-gray-800 line-through font-neurial">
              ₹{comparisonData.petrolCostPerKm}/km
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-neurial">Monthly Savings</p>
            <div className="text-xl sm:text-2xl font-medium text-black font-neurial">
              <AnimatedNumber value={comparisonData.monthlySavings} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-center space-y-4 sm:space-y-6"
      >
        <div className="space-y-4">
          <motion.button 
            onClick={() => testDriveModal.openManually()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-medium text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl font-neurial"
          >
            <span>Book Test Ride</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
        
        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed font-neurial">
          EMI calculations are indicative. Final rates may vary based on credit profile and dealer offers.
        </p>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .slider::-webkit-slider-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #e5e7eb;
          border-radius: 4px;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .slider::-moz-range-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #e5e7eb;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </motion.div>
  )
}

export default function RiztaPricing() {
  const pricingVariants: PricingData[] = [
    {
      id: 'rizta-base',
      variant: 'Rizta',
      exShowroomPrice: 109999,
      city: 'Hyderabad',
      onRoadPrice: 118000,
      subsidy: 5000,
      emiStarting: 2899,
      features: ['3.7kWh Battery', '123km Range', 'Smart Dashboard']
    },
    {
      id: 'rizta-s',
      variant: 'Rizta S',
      exShowroomPrice: 129999,
      city: 'Hyderabad',
      onRoadPrice: 142000,
      subsidy: 5000,
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

  return (
    <section 
      className="bg-gray-50 py-16 md:py-20"
      style={{ fontFamily: 'Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-black mb-4"
          >
            Pricing & Finance
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-700 font-light"
          >
            Choose your perfect Rizta and discover affordable electric mobility
          </motion.p>
        </div>
        
        <RiztaPricingClient 
          variants={pricingVariants}
          emiConfig={emiConfig}
          comparisonData={comparisonData}
          dealerBadges={dealerBadges}
        />
      </div>
    </section>
  )
}