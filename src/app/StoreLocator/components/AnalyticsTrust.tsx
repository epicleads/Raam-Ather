"use client";
import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { motion } from 'framer-motion';
import { 
  UsersIcon,
  ClockIcon,
  StarIcon,
  MapPinIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Outlet } from '../StoreLocatorClient';

interface AnalyticsTrustProps {
  outlets: Outlet[];
}

const AnalyticsTrust: React.FC<AnalyticsTrustProps> = ({
  outlets
}) => {
  const t = {
    trustIndicators: 'Why Choose Raam Ather',
    description: 'Trusted by thousands of customers across Hyderabad and Chennai',
    stats: {
      totalTestRides: 'Test Rides This Month',
      avgRating: 'Customer Rating',
      responseTime: 'Avg Response Time',
      locations: 'Service Locations',
      happyCustomers: 'Happy Customers',
      yearsExperience: 'Years Experience',
      modelsAvailable: 'Models Available',
      cityPresence: 'Cities We Serve'
    },
    features: {
      expertGuidance: {
        title: 'Expert Guidance',
        description: 'Our certified consultants help you choose the perfect electric scooter'
      },
      trustedService: {
        title: 'Trusted Service',
        description: 'Authorized Ather dealer with comprehensive warranty support'
      },
      quickResponse: {
        title: 'Quick Response',
        description: 'Fast response times for all your queries and service needs'
      },
      premiumExperience: {
        title: 'Premium Experience',
        description: 'State-of-the-art showrooms with comfortable test ride facilities'
      }
    }
  };

  // Calculate aggregate stats
  const totalTestRides = outlets.reduce((sum, outlet) => sum + outlet.testRidesThisWeek, 0) * 4; // Monthly estimate
  const avgRating = outlets.reduce((sum, outlet) => sum + outlet.rating, 0) / outlets.length;
  const allModels = [...new Set(outlets.flatMap(outlet => outlet.modelsAvailable))];

  const stats = [
    {
      icon: UsersIcon,
      value: totalTestRides.toLocaleString(),
      label: t.stats.totalTestRides,
      color: 'from-blue-500 to-blue-600',
      trend: '+12%'
    },
    {
      icon: StarIcon,
      value: avgRating.toFixed(1),
      label: t.stats.avgRating,
      color: 'from-yellow-500 to-yellow-600',
      trend: '★★★★★'
    },
    {
      icon: ClockIcon,
      value: '< 5 min',
      label: t.stats.responseTime,
      color: 'from-green-500 to-green-600',
      trend: 'Fast'
    },
    {
      icon: MapPinIcon,
      value: outlets.length.toString(),
      label: t.stats.locations,
      color: 'from-purple-500 to-purple-600',
      trend: 'Growing'
    },
    {
      icon: HeartIcon,
      value: '5000+',
      label: t.stats.happyCustomers,
      color: 'from-red-500 to-red-600',
      trend: '+25%'
    },
    {
      icon: TrophyIcon,
      value: '3+',
      label: t.stats.yearsExperience,
      color: 'from-orange-500 to-orange-600',
      trend: 'Trusted'
    },
    {
      icon: ChartBarIcon,
      value: allModels.length.toString(),
      label: t.stats.modelsAvailable,
      color: 'from-indigo-500 to-indigo-600',
      trend: 'Latest'
    },
    {
      icon: ShieldCheckIcon,
      value: '2',
      label: t.stats.cityPresence,
      color: 'from-teal-500 to-teal-600',
      trend: 'Expanding'
    }
  ];

  const features = [
    {
      icon: UsersIcon,
      title: t.features.expertGuidance.title,
      description: t.features.expertGuidance.description,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: t.features.trustedService.title,
      description: t.features.trustedService.description,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: ClockIcon,
      title: t.features.quickResponse.title,
      description: t.features.quickResponse.description,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrophyIcon,
      title: t.features.premiumExperience.title,
      description: t.features.premiumExperience.description,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Keen slider for stats
  const [statsSlide, setStatsSlide] = React.useState(0);
  const [statsSliderRef, statsInstanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4, spacing: 32 },
      },
    },
    slideChanged(slider) {
      setStatsSlide(slider.track.details.rel);
    },
  });

  // Keen slider for features
  const [featuresSlide, setFeaturesSlide] = React.useState(0);
  const [featuresSliderRef, featuresInstanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 24 },
      },
    },
    slideChanged(slider) {
      setFeaturesSlide(slider.track.details.rel);
    },
  });

  // Removed unused activitySliderRef and setActivitySlide reference

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.trustIndicators}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Stats Slider */}
        <div ref={statsSliderRef} className="keen-slider mb-6">
          {stats.map((stat, index) => (
            <div className="keen-slider__slide" key={index}>
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {stat.trend}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        {/* Stats Dots */}
        <div className="flex justify-center mb-10 sm:hidden">
          {stats.map((_, idx) => (
            <button
              key={idx}
              onClick={() => statsInstanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-200 ${statsSlide === idx ? 'bg-[#2962FF]' : 'bg-gray-300'}`}
              aria-label={`Go to stat ${idx + 1}`}
            />
          ))}
        </div>

        {/* Features Slider */}
        <div ref={featuresSliderRef} className="keen-slider mb-6">
          {features.map((feature, index) => (
            <div className="keen-slider__slide" key={index}>
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
        {/* Features Dots */}
        <div className="flex justify-center mb-10 sm:hidden">
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={() => featuresInstanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-200 ${featuresSlide === idx ? 'bg-[#2962FF]' : 'bg-gray-300'}`}
              aria-label={`Go to feature ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AnalyticsTrust;