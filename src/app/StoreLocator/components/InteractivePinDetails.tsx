"use client";
import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  XMarkIcon,
  StarIcon,
  PhoneIcon,
  ClockIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon,
  HeartIcon,
  ShareIcon,
  PhotoIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { Outlet } from '../StoreLocatorClient';
import { usePopup } from '../../Components/popups/PopupProvider';

interface InteractivePinDetailsProps {
  outlet: Outlet | null;
  onClose: () => void;
}

const InteractivePinDetails: React.FC<InteractivePinDetailsProps> = ({
  outlet,
  onClose
}) => {
  const { openFormPopup } = usePopup();
  const [activeTab, setActiveTab] = useState('overview');
  // Keen slider for gallery images
  const [gallerySlide, setGallerySlide] = useState(0);
  const [gallerySliderRef, galleryInstanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 8 },
    slideChanged(slider) {
      setGallerySlide(slider.track.details.rel);
    },
  });

  const t = {
    overview: 'Overview',
    gallery: 'Gallery',
    reviews: 'Reviews',
    contact: 'Contact',
    bookTestRide: 'Book Test Ride',
    getDirections: 'Get Directions',
    whatsappSupport: 'WhatsApp Support',
    callNow: 'Call Now',
    shareLocation: 'Share Location',
    addToFavorites: 'Add to Favorites',
    openUntil: 'Open until',
    closed: 'Closed',
    testRidesThisWeek: 'test rides this week',
    responseTime: 'Avg response time',
    amenities: 'Amenities',
    modelsAvailable: 'Models Available',
    offers: 'Current Offers',
    staff: 'Our Team',
    nextSlot: 'Next available slot'
  };

  if (!outlet) return null;

  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? 'bg-green-500' : 'bg-red-500';
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      default: return <MapPinIcon className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      {outlet && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-64 bg-gradient-to-br from-[#00B248]/20 to-[#2962FF]/20">
              <div className="absolute inset-0 bg-black/20" />
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>

              {/* Gallery keen-slider */}
              <div ref={gallerySliderRef} className="keen-slider absolute inset-0">
                {outlet.gallery.map((img, idx) => (
                  <div className="keen-slider__slide h-full w-full" key={idx}>
                    <Image
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="object-cover w-full h-full rounded-t-3xl"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
              {/* Gallery Dots */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {outlet.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => galleryInstanceRef.current?.moveToIdx(index)}
                      className={`w-3 h-3 rounded-full transition-all ${gallerySlide === index ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
                <button className="bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <PhotoIcon className="w-4 h-4" />
                  View All
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  outlet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(outlet.isOpen)}`} />
                  {outlet.isOpen ? 'Open' : t.closed}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
              {/* Title Section */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{outlet.name}</h2>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{outlet.rating}</span>
                      <span className="text-gray-500">({outlet.reviewCount} reviews)</span>
                    </div>
                    {outlet.distance && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-600">{outlet.distance} km away</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{outlet.address}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#2962FF] hover:bg-blue-50 rounded-lg transition-all">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#00B248]">{outlet.testRidesThisWeek}</div>
                  <div className="text-xs text-gray-600">{t.testRidesThisWeek}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2962FF]">{outlet.responseTime}</div>
                  <div className="text-xs text-gray-600">{t.responseTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-500">
                    <ClockIcon className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-xs text-gray-600">
                    {outlet.isOpen ? `${t.openUntil} ${outlet.hours.split(' - ')[1]}` : t.closed}
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
                {['overview', 'gallery', 'reviews', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-white text-[#2962FF] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t[tab as keyof typeof t] as string}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mb-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Models Available */}
                    {outlet.modelsAvailable.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t.modelsAvailable}</h4>
                        <div className="flex flex-wrap gap-2">
                          {outlet.modelsAvailable.map((model) => (
                            <span
                              key={model}
                              className="bg-[#00B248]/10 text-[#00B248] px-3 py-2 rounded-lg text-sm font-medium"
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Amenities */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">{t.amenities}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {outlet.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2 text-gray-600">
                            {getAmenityIcon(amenity)}
                            <span className="text-sm capitalize">{amenity.replace('-', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Offers */}
                    {outlet.offers.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t.offers}</h4>
                        <div className="space-y-2">
                          {outlet.offers.map((offer, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                              <span className="text-sm text-yellow-800">{offer}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Available Slot */}
                    {outlet.nextTestRideSlot && (
                      <div className="p-4 bg-[#2962FF]/5 border border-[#2962FF]/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarDaysIcon className="w-5 h-5 text-[#2962FF]" />
                          <span className="font-semibold text-[#2962FF]">{t.nextSlot}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{outlet.nextTestRideSlot}</span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <PhoneIcon className="w-5 h-5 text-[#2962FF]" />
                      <div>
                        <div className="font-medium text-gray-900">{outlet.phone}</div>
                        <div className="text-sm text-gray-600">Phone</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-[#00B248]" />
                      <div>
                        <div className="font-medium text-gray-900">{outlet.whatsapp}</div>
                        <div className="text-sm text-gray-600">WhatsApp</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <ClockIcon className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="font-medium text-gray-900">{outlet.hours}</div>
                        <div className="text-sm text-gray-600">Opening Hours</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    onClick={() => {
                      openFormPopup('testdrive');
                      onClose();
                    }}
                    className="bg-[#00B248] hover:bg-[#00A041] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlayIcon className="w-5 h-5" />
                    {t.bookTestRide}
                  </motion.button>

                  <motion.button
                    onClick={() => outlet?.directionsUrl && window.open(outlet.directionsUrl, '_blank')}
                    className="bg-[#2962FF] hover:bg-[#1E88E5] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    {t.getDirections}
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-[#00B248] text-[#00B248] hover:bg-[#00B248] hover:text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
                    <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                    WhatsApp
                  </button>

                  <button className="border border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF] hover:text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
                    <PhoneIcon className="w-4 h-4" />
                    {t.callNow}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InteractivePinDetails;