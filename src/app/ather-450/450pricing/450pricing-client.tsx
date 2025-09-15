'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useTestDriveModal } from '../../Components/test-ride-form/TestDriveModalStore'

interface ModelSpec {
  id: string
  name: string
  variant: string
  exShowroomPrice: number
  features: string[]
  emiStarting: number
  city: string
}

const modelData: ModelSpec[] = [
  {
    id: 'ather-450s',
    name: 'Ather',
    variant: '450S',
    exShowroomPrice: 119841,
    features: ['Multi-mode Traction Control', '122km Range', 'DeepView™ Display'],
    emiStarting: 3200,
    city: 'Hyderabad'
  },
  {
    id: 'ather-450x',
    name: 'Ather',
    variant: '450X',
    exShowroomPrice: 146999,
    features: ['Multi-mode Traction Control', 'Magic Twist', '7" Touchscreen'],
    emiStarting: 3900,
    city: 'Hyderabad'
  }
]

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

export default function Pricing450Client() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const testDriveModal = useTestDriveModal()
  const [selectedModel, setSelectedModel] = useState(modelData[0])

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black py-8 sm:py-12 lg:py-16 font-neurial overflow-hidden"
    >
      {/* Futuristic grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Glowing corner accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-8 max-w-4xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-neurial mb-3 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Pricing & Finance</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-neurial font-light">
            Choose your perfect Ather and discover affordable electric mobility
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6 rounded-full"
          />
        </motion.div>

        {/* Pricing Cards - Rizta Style */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
          {modelData.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer group ${
                selectedModel.id === model.id
                  ? 'border-white bg-black text-white shadow-2xl shadow-white/25 transform scale-100 sm:scale-105 ring-2 ring-white/50'
                  : 'border-gray-600 bg-gray-900/50 text-white hover:border-gray-400 hover:shadow-xl backdrop-blur-sm'
              }`}
              onClick={() => setSelectedModel(model)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Recommended Badge */}
              {index === 1 && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-black text-white px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs font-semibold font-neurial shadow-lg">
                    RECOMMENDED
                  </div>
                </div>
              )}

              <div className="text-center space-y-4 sm:space-y-6 mt-2 sm:mt-0">
                {/* Variant Name */}
                <div>
                  <h3 className={`text-xl sm:text-2xl font-light mb-1 font-neurial ${
                    selectedModel.id === model.id ? 'text-white' : 'text-gray-200'
                  }`}>
                    {model.name} {model.variant}
                  </h3>
                  <p className={`text-sm font-neurial ${
                    selectedModel.id === model.id ? 'text-gray-300' : 'text-gray-400'
                  }`}>Starting from</p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight font-neurial ${
                    selectedModel.id === model.id ? 'text-white' : 'text-gray-200'
                  }`}>
                    <AnimatedNumber value={model.exShowroomPrice} />
                  </div>
                  <p className={`text-xs font-neurial ${
                    selectedModel.id === model.id ? 'text-gray-300' : 'text-gray-400'
                  }`}>Ex-showroom {model.city}</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {model.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center space-x-2">
                      <div className={`w-1 h-1 rounded-full ${
                        selectedModel.id === model.id ? 'bg-white' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm font-neurial ${
                        selectedModel.id === model.id ? 'text-gray-200' : 'text-gray-300'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* EMI */}
                <div className={`pt-4 border-t ${
                  selectedModel.id === model.id ? 'border-gray-700' : 'border-gray-600'
                }`}>
                  <p className={`text-xs mb-1 font-neurial ${
                    selectedModel.id === model.id ? 'text-gray-300' : 'text-gray-400'
                  }`}>EMI starts from</p>
                  <div className={`text-lg sm:text-xl font-medium font-neurial ${
                    selectedModel.id === model.id ? 'text-white' : 'text-gray-200'
                  }`}>
                    {formatCurrency(model.emiStarting)}<span className={`text-sm font-neurial ${
                      selectedModel.id === model.id ? 'text-gray-300' : 'text-gray-400'
                    }`}>/month</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Monthly Savings Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-xl mt-12"
        >
          <h3 className="text-xl sm:text-2xl font-light text-black mb-4 sm:mb-6 text-center font-neurial">Monthly Savings</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-neurial">Electric Cost</p>
              <div className="text-xl sm:text-2xl font-light text-black font-neurial">
                ₹0.30/km
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-neurial">Petrol Cost</p>
              <div className="text-xl sm:text-2xl font-light text-gray-800 line-through font-neurial">
                ₹3.00/km
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-neurial">Monthly Savings</p>
              <div className="text-xl sm:text-2xl font-medium text-black font-neurial">
                ₹2,025
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-8 sm:mt-12 max-w-2xl mx-auto"
        >
          <p className="text-sm sm:text-base text-gray-300 font-neurial mb-6">Ready to experience the future of mobility?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => testDriveModal.openManually()}
              className="relative group bg-white hover:bg-gray-100 text-black font-medium px-8 py-4 rounded-xl transition-all duration-500 shadow-2xl hover:shadow-white/25 font-neurial text-base border-2 border-transparent hover:border-white/30 backdrop-blur-sm"
            >
              <span className="relative z-10">Book Test Drive</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
            <motion.a
              href="tel:+919032333833"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl transition-all duration-500 font-neurial font-medium inline-flex items-center justify-center gap-2 text-base backdrop-blur-sm hover:shadow-2xl hover:shadow-white/25"
            >
              <Phone className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Call Now</span>
              <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}