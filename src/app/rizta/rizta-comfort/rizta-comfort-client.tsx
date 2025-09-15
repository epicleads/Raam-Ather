// rizta-comfort-client.tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ComfortFeature } from './rizta-comfort'

interface RiztaComfortClientProps {
  features: ComfortFeature[]
}

const icons = {
  mode: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  suspension: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path d="M6 16L18 16M6 20L18 20M12 4L12 16M8 8L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  seat: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path d="M5 12V7a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v5M3 20h2l1-8h12l1 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  backrest: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path d="M8 20V10a4 4 0 0 1 8 0v10M4 20h16M12 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  storage: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 10v4M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function FeatureCard({ feature, index }: { feature: ComfortFeature; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const shouldReduceMotion = useReducedMotion()

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 60, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: shouldReduceMotion ? 0 : index * 0.15
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: shouldReduceMotion ? 0 : (index * 0.15) + 0.3
      }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 1,
        delay: shouldReduceMotion ? 0 : (index * 0.15) + 0.5
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
    >
      {/* Image Section */}
      {feature.imagePath && (
        <div className="relative h-48 md:h-52 overflow-hidden">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full h-full"
          >
            <Image
              src={feature.imagePath}
              alt={feature.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Icon Badge */}
          <div className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm border border-gray-100 group-hover:border-green-200 group-hover:bg-green-50 transition-all duration-300">
            <div className="text-gray-600 group-hover:text-green-600 transition-colors">
              {icons[feature.icon as keyof typeof icons]}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 md:p-6 text-left">
        <div className="space-y-3">
          <div className="relative">
            <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-[Inter] leading-tight">
              {feature.title}
            </h3>
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="h-0.5 w-12 bg-green-500 origin-left"
            />
          </div>
          
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm">
            {feature.description}
          </p>

          {feature.stats && (
            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-black bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors duration-200">
                {feature.stats.value}
              </span>
              {feature.stats.subtext && (
                <span className="text-sm text-gray-500">
                  {feature.stats.subtext}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

    </motion.div>
  )
}

export function RiztaComfortClient({ features }: RiztaComfortClientProps) {
  const rideFeatures = features.filter(f => f.category === 'ride')
  const familyFeatures = features.filter(f => f.category === 'family')
  const storageFeatures = features.filter(f => f.category === 'storage')

  return (
    <div className="space-y-2">
      {/* First row - Two main comfort features */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {rideFeatures.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>

      {/* Second row - Three family/storage features */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {[...familyFeatures, ...storageFeatures].map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index + rideFeatures.length} />
        ))}
      </div>
    </div>
  )
}