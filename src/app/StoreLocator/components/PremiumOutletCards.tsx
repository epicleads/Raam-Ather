"use client";
import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  PhoneIcon, 
  ClockIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Outlet } from '../StoreLocatorClient';
import { useTestDriveModal } from '../../Components/test-ride-form/TestDriveModalStore';

interface PremiumOutletCardsProps {
  outlets: Outlet[];
  selectedOutlet: Outlet | null;
  setSelectedOutlet: (outlet: Outlet | null) => void;
  setShowWhatsAppChat: (show: boolean) => void;
}

const PremiumOutletCards: React.FC<PremiumOutletCardsProps> = ({
  outlets,
  selectedOutlet,
  setSelectedOutlet,
  
}) => {
  const modal = useTestDriveModal();
  const [selectedCity, setSelectedCity] = React.useState<'Hyderabad' | 'Chennai'>('Hyderabad');

  // Filter outlets by selected city
  const filteredOutlets = outlets.filter(outlet => outlet.city === selectedCity);

  const t = {
    premiumExperience: 'Premium Experience Centers',
    description: 'Visit our state-of-the-art facilities',
    bookTestRide: 'Book Test Ride',
    getDirections: 'Get Directions',
    whatsappSupport: 'WhatsApp Support',
    callNow: 'Call Now',
    viewDetails: 'View Details',
    available: 'Available',
    openUntil: 'Open until',
    closed: 'Closed',
    testRidesThisWeek: 'test rides this week',
    responseTime: 'Avg response time',
    amenities: 'Amenities',
    modelsAvailable: 'Models Available'
  };

  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? 'bg-green-500' : 'bg-red-500';
  };

  // Keen slider setup for mobile view only
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        disabled: true, // Disable slider on desktop
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.premiumExperience}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* City Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-100 rounded-2xl p-2 flex">
            {(['Hyderabad', 'Chennai'] as const).map((city) => (
              <motion.button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  selectedCity === city
                    ? 'bg-white text-[#2962FF] shadow-lg'
                    : 'text-gray-600 hover:text-[#2962FF] hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {city}
                {selectedCity === city && (
                  <motion.div
                    className="absolute inset-0 bg-white rounded-xl shadow-lg"
                    layoutId="cityTabSelector"
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Outlet Cards Grid for Desktop, Slider for Mobile */}
        <div className="block">
          {/* Mobile Slider */}
          <div ref={sliderRef} className="keen-slider block lg:hidden">
            {filteredOutlets.map((outlet, index) => (
              <div
                className="keen-slider__slide"
                key={outlet.id}
                style={{ minWidth: '100%', maxWidth: '100%', display: 'flex' }}
              >
              <motion.div
                className={`flex flex-col w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  selectedOutlet?.id === outlet.id ? 'ring-2 ring-[#2962FF] shadow-2xl' : ''
                }`}
                style={{ minHeight: '100%' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Card Header Image */}
                <div
                  className="relative h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${outlet.coverImage})` }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      outlet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(outlet.isOpen)}`} />
                      {outlet.isOpen ? 'Open' : t.closed}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{outlet.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-black">{outlet.rating}</span>
                          <span className="text-sm text-gray-500">({outlet.reviewCount})</span>
                        </div>
                        {outlet.distance && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{outlet.distance} km</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Address */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{outlet.address}</p>
                  </div>
                  {/* Hours */}
                  <div className="flex items-center gap-2 mb-4">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {outlet.isOpen ? `${t.openUntil} ${outlet.hours.split(' - ')[1] ?? outlet.hours}` : t.closed}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="space-y-3 mt-auto">
                    {/* Primary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        onClick={() => modal.openManually()}
                        className="bg-[#00B248] hover:bg-[#00A041] text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PlayIcon className="w-4 h-4" />
                        {t.bookTestRide}
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          const query = encodeURIComponent(`${outlet.name}, ${outlet.address}`);
                          window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                        }}
                        className="bg-[#2962FF] hover:bg-[#1E88E5] text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MapPinIcon className="w-4 h-4" />
                        {t.getDirections}
                      </motion.button>
                    </div>
                    {/* Secondary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.a
                        href={`https://wa.me/${outlet.whatsapp.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#00B248] text-[#00B248] hover:bg-[#00B248] hover:text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                        WhatsApp
                      </motion.a>
                      <motion.button
                        onClick={() => window.open(`tel:${outlet.phone}`, '_self')}
                        className="border border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF] hover:text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PhoneIcon className="w-4 h-4" />
                        {t.callNow}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {filteredOutlets.map((outlet, index) => (
              <motion.div
                key={outlet.id}
                className={`flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  selectedOutlet?.id === outlet.id ? 'ring-2 ring-[#2962FF] shadow-2xl' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedOutlet(outlet)}
              >
                {/* Card Header Image */}
                <div
                  className="relative h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${outlet.coverImage})` }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      outlet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(outlet.isOpen)}`} />
                      {outlet.isOpen ? 'Open' : t.closed}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{outlet.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-black">{outlet.rating}</span>
                          <span className="text-sm text-gray-500">({outlet.reviewCount})</span>
                        </div>
                        {outlet.distance && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{outlet.distance} km</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{outlet.address}</p>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex items-center gap-2 mb-4">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {outlet.isOpen ? `${t.openUntil} ${outlet.hours.split(' - ')[1] ?? outlet.hours}` : t.closed}
                    </span>
                  </div>
                  
                  
                  {/* Actions */}
                  <div className="space-y-3 mt-auto">
                    {/* Primary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          modal.openManually();
                        }}
                        className="bg-[#00B248] hover:bg-[#00A041] text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PlayIcon className="w-4 h-4" />
                        {t.bookTestRide}
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          const query = encodeURIComponent(`${outlet.name}, ${outlet.address}`);
                          window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                        }}
                        className="bg-[#2962FF] hover:bg-[#1E88E5] text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MapPinIcon className="w-4 h-4" />
                        {t.getDirections}
                      </motion.button>
                    </div>
                    {/* Secondary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.a
                        href={`https://wa.me/${outlet.whatsapp.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#00B248] text-[#00B248] hover:bg-[#00B248] hover:text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                        WhatsApp
                      </motion.a>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${outlet.phone}`, '_self');
                        }}
                        className="border border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF] hover:text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PhoneIcon className="w-4 h-4" />
                        {t.callNow}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Slider Dots for mobile */}
        <div className="flex justify-center mt-6 lg:hidden">
          {filteredOutlets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-200 ${currentSlide === idx ? 'bg-[#2962FF]' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumOutletCards;
