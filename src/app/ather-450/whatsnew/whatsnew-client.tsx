'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { WhatsNewData, VideoFeature } from './whatsnew-server'

interface WhatsNewClientProps {
  data: WhatsNewData
}

// Icon components for smart features
const FeatureIcons = {
  whatsapp: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.215"/>
    </svg>
  ),
  location: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ping: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9.879 8.464a5 5 0 000 7.072m-2.83-9.9a9 9 0 000 12.728M12 12h.01" />
    </svg>
  ),
  alexa: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a10 10 0 1110 10A10 10 0 0112 2zm-1 4a1 1 0 012 0v8a1 1 0 01-2 0V6z"/>
    </svg>
  ),
  call: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  charging: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  range: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

// Video Feature Card Component
function VideoFeatureCard({ feature, index }: { feature: VideoFeature; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut" as const
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-500/50 transition-all duration-500"
    >
      {/* Video Background */}
      <div className="relative aspect-[16/9] sm:aspect-[4/3] overflow-hidden h-48 sm:h-auto max-h-64 sm:max-h-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src={feature.videoPath} type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500" />
        
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="space-y-1">
          <h3 className="text-xs md:text-sm font-semibold text-white leading-tight group-hover:text-green-400 transition-colors duration-300">
            {feature.title}
          </h3>
          <div className="w-6 h-0.5 bg-green-500 group-hover:w-10 transition-all duration-500" />
          <p className="text-gray-300 text-xs leading-tight max-w-sm">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-500" />
    </motion.div>
  )
}


// Animated Metric Card Component
function AnimatedMetricCard({ 
  icon, 
  title, 
  targetValue, 
  suffix, 
  description, 
  index 
}: { 
  icon: React.ReactNode; 
  title: string; 
  targetValue: number; 
  suffix?: string; 
  description?: string; 
  index: number 
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-30px' })
  const [currentValue, setCurrentValue] = useState<number>(0)

  // Animate counter when in view
  useEffect(() => {
    if (isInView) {
      let start: number | null = null
      const duration = 1200
      const animate = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const value = Math.floor(easeOutQuart * targetValue)
        setCurrentValue(value)
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, targetValue])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut" as const
      }}
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.3 }
      }}
      className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 cursor-pointer group h-full flex flex-col relative"
    >
      {/* Icon + Title at top */}
      <div className="flex items-center justify-center space-x-3">
        <div className="text-gray-400 group-hover:text-green-400 transition-colors duration-300">
          {icon}
        </div>
        <h4 className="text-xl md:text-2xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h4>
      </div>

      {/* Spacer to push content to bottom */}
      <div className="flex-1"></div>

      {/* Bottom section: Counter + Description */}
      <div className="text-center space-y-2">
        {/* Animated Counter */}
        <div>
          <span className="text-4xl md:text-5xl font-bold text-green-400 tabular-nums">
            {currentValue}{suffix}
          </span>
        </div>
        {/* Description */}
        <p className="text-lg text-white font-bold">
          {description}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </motion.div>
  )
}


export function WhatsNewClient({ data }: WhatsNewClientProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <div ref={sectionRef} className="space-y-20 relative">
      
      {/* First Section: Video Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
      >
        <div className="hidden md:grid gap-8 md:gap-10 grid-cols-2 xl:grid-cols-3">
          {data.videoFeatures.map((feature, index) => (
            <VideoFeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden space-y-8 px-4">
          {data.videoFeatures.map((feature, index) => (
            <VideoFeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>

      {/* Second Section: Three Separate Grids */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" as const }}
      >
        {/* Desktop Grid */}
        <div className="hidden lg:grid gap-8 grid-cols-3 h-64">
          {/* First Grid: All Connectivity Features in One Column */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 cursor-pointer group h-full flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 mb-4 text-center flex-shrink-0">
              Smart Connectivity
            </h3>
            
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <div className="space-y-2 overflow-y-auto scrollbar-hide">
                {data.smartFeatures.connectivity.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 flex-shrink-0">
                    <div className="text-gray-400 group-hover:text-green-400 transition-colors duration-300 flex-shrink-0">
                      {FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
                    </div>
                    <span className="text-white font-medium text-sm group-hover:text-green-400 transition-colors duration-300 truncate">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>

          {/* Second Grid: Charging */}
          <AnimatedMetricCard 
            icon={FeatureIcons[data.smartFeatures.charging.icon as keyof typeof FeatureIcons]}
            title={data.smartFeatures.charging.title}
            targetValue={80}
            suffix="%"
            description="in 3 hr*"
            index={1}
          />

          {/* Third Grid: Range */}
          <AnimatedMetricCard 
            icon={FeatureIcons[data.smartFeatures.range.icon as keyof typeof FeatureIcons]}
            title={data.smartFeatures.range.title}
            targetValue={161}
            suffix=" km"
            description="IDC Range"
            index={2}
          />
        </div>

        {/* Mobile Vertical Layout */}
        <div className="lg:hidden space-y-8 px-4">
          {/* Connectivity Features */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Smart Connectivity
            </h3>
            <div className="space-y-3">
              {data.smartFeatures.connectivity.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30">
                  <div className="text-gray-400">
                    {FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
                  </div>
                  <span className="text-white font-medium text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Charging */}
          <AnimatedMetricCard 
            icon={FeatureIcons[data.smartFeatures.charging.icon as keyof typeof FeatureIcons]}
            title={data.smartFeatures.charging.title}
            targetValue={80}
            suffix="%"
            description="in 3 hr*"
            index={1}
          />

          {/* Range */}
          <AnimatedMetricCard 
            icon={FeatureIcons[data.smartFeatures.range.icon as keyof typeof FeatureIcons]}
            title={data.smartFeatures.range.title}
            targetValue={161}
            suffix=" km"
            description="IDC Range"
            index={2}
          />
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}