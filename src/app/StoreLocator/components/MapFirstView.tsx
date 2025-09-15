"use client";
import React, { useState, useEffect, useRef } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  StarIcon, 
  PhoneIcon, 
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Outlet } from '../StoreLocatorClient';

interface MapFirstViewProps {
  outlets: Outlet[];
  selectedOutlet: Outlet | null;
  setSelectedOutlet: (outlet: Outlet | null) => void;
  userLocation: { lat: number; lng: number } | null;
}

const MapFirstView: React.FC<MapFirstViewProps> = ({
  outlets,
  selectedOutlet,
  setSelectedOutlet,
  userLocation
}) => {
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCity, setCurrentCity] = useState<'Hyderabad' | 'Chennai' | 'All'>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keen slider for mobile pin cards
  const [mobilePinSlide, setMobilePinSlide] = useState(0);
  const [mobilePinSliderRef, mobilePinInstanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 12 },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 16 },
      },
    },
    slideChanged(slider) {
      setMobilePinSlide(slider.track.details.rel);
    },
  });
  useEffect(() => {
    if (searchQuery.toLowerCase().includes('hyderabad')) {
      setCurrentCity('Hyderabad');
    } else if (searchQuery.toLowerCase().includes('chennai')) {
      setCurrentCity('Chennai');
    } else if (searchQuery === '') {
      setCurrentCity('All');
    }
  }, [searchQuery]);

  // Filter outlets by search and city
  const filteredOutlets = outlets.filter(outlet => {
    const matchesSearch = searchQuery === '' || 
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = currentCity === 'All' || outlet.city === currentCity;
    
    return matchesSearch && matchesCity;
  });

  // Calculate distance (simplified calculation)
  const calculateDistance = (outlet: Outlet) => {
    if (!userLocation) return Math.floor(Math.random() * 20) + 1;
    
    const dx = outlet.coordinates.lat - userLocation.lat;
    const dy = outlet.coordinates.lng - userLocation.lng;
    const distance = Math.sqrt(dx * dx + dy * dy) * 111; // Rough km conversion
    return Math.round(distance * 10) / 10;
  };

  // Sort outlets by distance
  const sortedOutlets = filteredOutlets
    .map(outlet => ({ ...outlet, distance: calculateDistance(outlet) }))
    .sort((a, b) => a.distance - b.distance);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentCity('All');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle city selection
  const handleCitySelect = (city: 'Hyderabad' | 'Chennai') => {
    setCurrentCity(city);
    setSearchQuery(city);
  };

  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = (isOpen: boolean) => {
    return isOpen ? 'Open' : 'Closed';
  };

  return (
    <section className="relative h-screen bg-gray-100">
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-4">
        <motion.div 
          className="relative bg-white rounded-2xl shadow-xl border border-gray-200"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Hyderabad, Chennai or location..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl border-0 focus:ring-2 focus:ring-[#00B248] focus:outline-none text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {/* Quick City Buttons */}
          <div className="flex gap-2 p-3 border-t border-gray-100">
            <button
              onClick={() => handleCitySelect('Hyderabad')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                currentCity === 'Hyderabad'
                  ? 'bg-[#4A4A4A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hyderabad
            </button>
            <button
              onClick={() => handleCitySelect('Chennai')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                currentCity === 'Chennai'
                  ? 'bg-[#2962FF] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chennai
            </button>
          </div>
        </motion.div>
      </div>

      {/* Desktop Split View */}
      <div className="hidden md:flex h-full">
        {/* Map Side (Left) */}
        <div className="flex-1 relative bg-gradient-to-br from-[#00B248]/10 to-[#2962FF]/10 overflow-hidden">
          {/* Enhanced Map Background with City-based Styling */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: currentCity === 'Hyderabad' 
                ? 'linear-gradient(135deg, rgba(74, 74, 74, 0.05), rgba(41, 98, 255, 0.05))'
                : currentCity === 'Chennai'
                ? 'linear-gradient(135deg, rgba(41, 98, 255, 0.05), rgba(0, 178, 72, 0.05))'
                : 'linear-gradient(135deg, rgba(0, 178, 72, 0.05), rgba(41, 98, 255, 0.05))'
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Map-like Grid Background */}
            <div className="absolute inset-0">
              <div
                className="w-full h-full opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px),
                    linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px'
                }}
              />
            </div>
            
            {/* City-specific Street Pattern */}
            {currentCity === 'Hyderabad' && (
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  {/* Hyderabad-like street pattern */}
                  <path d="M0 100 L400 100" stroke="#4A4A4A" strokeWidth="2" />
                  <path d="M0 200 L400 200" stroke="#4A4A4A" strokeWidth="3" />
                  <path d="M0 300 L400 300" stroke="#4A4A4A" strokeWidth="2" />
                  <path d="M100 0 L100 400" stroke="#4A4A4A" strokeWidth="2" />
                  <path d="M200 0 L200 400" stroke="#4A4A4A" strokeWidth="3" />
                  <path d="M300 0 L300 400" stroke="#4A4A4A" strokeWidth="2" />
                  {/* Curved roads */}
                  <path d="M50 50 Q200 100 350 150" stroke="#666" strokeWidth="1.5" fill="none" />
                  <path d="M50 350 Q200 300 350 250" stroke="#666" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            )}
            
            {currentCity === 'Chennai' && (
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  {/* Chennai-like coastal and grid pattern */}
                  <path d="M0 120 L400 120" stroke="#2962FF" strokeWidth="2" />
                  <path d="M0 180 L400 180" stroke="#2962FF" strokeWidth="3" />
                  <path d="M0 280 L400 280" stroke="#2962FF" strokeWidth="2" />
                  <path d="M80 0 L80 400" stroke="#2962FF" strokeWidth="2" />
                  <path d="M160 0 L160 400" stroke="#2962FF" strokeWidth="3" />
                  <path d="M280 0 L280 400" stroke="#2962FF" strokeWidth="2" />
                  {/* Coastal curves */}
                  <path d="M0 50 Q100 80 200 60 Q300 40 400 70" stroke="#00B248" strokeWidth="2" fill="none" />
                  <path d="M0 350 Q150 320 300 340 Q350 350 400 330" stroke="#00B248" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            )}
            
            {currentCity === 'All' && (
              <div className="absolute inset-0 opacity-8">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  {/* All cities - mixed pattern */}
                  <path d="M0 150 L400 150" stroke="#666" strokeWidth="2" />
                  <path d="M0 250 L400 250" stroke="#666" strokeWidth="2" />
                  <path d="M150 0 L150 400" stroke="#666" strokeWidth="2" />
                  <path d="M250 0 L250 400" stroke="#666" strokeWidth="2" />
                  <path d="M50 50 Q200 100 350 150 Q200 200 50 250 Q200 300 350 350" stroke="#888" strokeWidth="1" fill="none" />
                </svg>
              </div>
            )}
            
            {/* Subtle landmark indicators */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gray-500 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/2 w-10 h-4 bg-gray-400 rounded"></div>
            </div>
            
            {/* City Indicator */}
            <div className="absolute top-20 left-4 z-20">
              <motion.div 
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
                  currentCity === 'Hyderabad' 
                    ? 'bg-[#4A4A4A]/90 text-white'
                    : currentCity === 'Chennai'
                    ? 'bg-[#2962FF]/90 text-white'
                    : 'bg-white/90 text-gray-800'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {currentCity === 'All' ? `${sortedOutlets.length} Total Locations` : `${currentCity} • ${sortedOutlets.length} Locations`}
              </motion.div>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 z-20">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-[#4A4A4A] rounded-full"></div>
                  <span className="text-gray-700">Hyderabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2962FF] rounded-full"></div>
                  <span className="text-gray-700">Chennai</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Map Pins with City-based Positioning */}
          <div className="absolute inset-0">
            {sortedOutlets.map((outlet, index) => {
              // Calculate position based on actual coordinates or fallback to grid
              const getPositionFromCoords = (outlet: Outlet) => {
                if (currentCity === 'Hyderabad' && outlet.city === 'Hyderabad') {
                  return {
                    left: `${45 + (outlet.coordinates.lng - 78.4) * 2000}%`,
                    top: `${40 + (17.4 - outlet.coordinates.lat) * 2000}%`
                  };
                } else if (currentCity === 'Chennai' && outlet.city === 'Chennai') {
                  return {
                    left: `${45 + (outlet.coordinates.lng - 80.2) * 2000}%`,
                    top: `${40 + (13.1 - outlet.coordinates.lat) * 2000}%`
                  };
                } else {
                  // Grid fallback for mixed view
                  return {
                    left: `${30 + index * 15}%`,
                    top: `${30 + (index % 3) * 20}%`
                  };
                }
              };
              
              const position = getPositionFromCoords(outlet);
              
              return (
                <motion.div
                  key={outlet.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={position}
                  onMouseEnter={() => setHoveredPin(outlet.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={() => setSelectedOutlet(outlet)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Pin Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full blur-lg opacity-30 ${
                      outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A]' : 'bg-[#2962FF]'
                    }`}
                    animate={{
                      scale: hoveredPin === outlet.id ? [1, 1.5, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Enhanced Pin with Showroom Image Background */}
                  <motion.div 
                    className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${outlet.coverImage})` }}
                    animate={{
                      rotate: selectedOutlet?.id === outlet.id ? 360 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Dark overlay for better text visibility */}
                    <div className={`absolute inset-0 rounded-full ${
                      selectedOutlet?.id === outlet.id 
                        ? 'bg-[#FF6B00]/80' 
                        : 'bg-black/40'
                    }`} />
                    <MapPinIcon className="w-6 h-6 text-white relative z-10" />
                    
                    {/* Enhanced Badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className={`text-xs font-bold ${
                        outlet.city === 'Hyderabad' ? 'text-[#4A4A4A]' : 'text-[#2962FF]'
                      }`}>{index + 1}</span>
                    </div>
                    
                    {/* City Indicator Dot */}
                    <div className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full border-2 border-white ${
                      outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A]' : 'bg-[#2962FF]'
                    }`} />
                  </motion.div>

                  {/* Pin Popover */}
                  <AnimatePresence>
                    {hoveredPin === outlet.id && (
                      <motion.div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-4 min-w-[200px] z-50"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      >
                        <div className="text-center">
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                            outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A] text-white' : 'bg-[#2962FF] text-white'
                          }`}>
                            {outlet.city}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{outlet.name}</h4>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{outlet.rating}</span>
                            <span className="text-xs text-gray-500">({outlet.reviewCount})</span>
                          </div>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            outlet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(outlet.isOpen)}`} />
                            {getStatusText(outlet.isOpen)}
                          </div>
                          <p className="text-xs text-gray-600 mt-2 mb-3">{outlet.address}</p>
                          <div className="flex gap-2">
                            <button 
                              className={`flex-1 text-white px-3 py-2 rounded-lg text-xs font-medium ${
                                outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A] hover:bg-[#3A3A3A]' : 'bg-[#2962FF] hover:bg-[#1E88E5]'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                const query = encodeURIComponent(`${outlet.name}, ${outlet.address}`);
                                window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                              }}
                            >
                              Directions
                            </button>
                            <button 
                              className={`flex-1 bg-[#00B248] hover:bg-[#00A043] text-white px-3 py-2 rounded-lg text-xs font-medium`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOutlet(outlet);
                              }}
                            >
                              Details
                            </button>
                          </div>
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-3 h-3 bg-white transform rotate-45 shadow-lg" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button className="bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow">
              <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Cards Side (Right) */}
        <div className="w-96 bg-white shadow-xl overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {sortedOutlets.length} locations found
            </h3>
            <p className="text-sm text-gray-600">
              {currentCity === 'All' ? 'All cities' : `in ${currentCity}`} • Sorted by distance
            </p>
          </div>
          
          <div className="space-y-4 p-4">
            {sortedOutlets.map((outlet, index) => (
              <motion.div
                key={outlet.id}
                className={`rounded-xl border-2 cursor-pointer transition-all bg-cover bg-center relative overflow-hidden ${
                  selectedOutlet?.id === outlet.id
                    ? 'border-[#2962FF] shadow-lg'
                    : 'border-gray-200 hover:border-[#00B248] hover:shadow-md'
                }`}
                style={{ backgroundImage: `url(${outlet.coverImage})` }}
                onClick={() => setSelectedOutlet(outlet)}
                whileHover={{ y: -2 }}
              >
                {/* Background overlay for text readability */}
                <div className={`absolute inset-0 rounded-xl ${
                  selectedOutlet?.id === outlet.id
                    ? 'bg-[#2962FF]/90'
                    : 'bg-black/60 hover:bg-black/50'
                } transition-all`} />
                
                <div className="relative z-10 p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold ${
                      outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A]' : 'bg-[#2962FF]'
                    }`}>
                      {index + 1}
                    </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{outlet.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A] text-white' : 'bg-[#2962FF] text-white'
                      }`}>
                        {outlet.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{outlet.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-white">{outlet.distance} km</span>
                    </div>
                    <p className="text-sm text-gray-200 mb-3">{outlet.address}</p>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      outlet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(outlet.isOpen)}`} />
                      {outlet.isOpen ? `Open • ${outlet.hours.split(' - ')[1]}` : 'Closed'}
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Map with Bottom Sheet */}
      <div className="md:hidden h-full relative">
        {/* Enhanced Mobile Map Background */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: currentCity === 'Hyderabad' 
              ? 'linear-gradient(135deg, rgba(74, 74, 74, 0.1), rgba(41, 98, 255, 0.1))'
              : currentCity === 'Chennai'
              ? 'linear-gradient(135deg, rgba(41, 98, 255, 0.1), rgba(0, 178, 72, 0.1))'
              : 'linear-gradient(135deg, rgba(0, 178, 72, 0.1), rgba(41, 98, 255, 0.1))'
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Mobile Map Grid */}
          <div className="absolute inset-0 opacity-15">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
          
          {/* Mobile Street Pattern */}
          <div className="absolute inset-0 opacity-12">
            <svg className="w-full h-full" viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 150 L300 150" stroke={currentCity === 'Chennai' ? '#2962FF' : '#4A4A4A'} strokeWidth="2" />
              <path d="M0 300 L300 300" stroke={currentCity === 'Chennai' ? '#2962FF' : '#4A4A4A'} strokeWidth="3" />
              <path d="M0 450 L300 450" stroke={currentCity === 'Chennai' ? '#2962FF' : '#4A4A4A'} strokeWidth="2" />
              <path d="M150 0 L150 600" stroke={currentCity === 'Chennai' ? '#2962FF' : '#4A4A4A'} strokeWidth="2" />
              <path d="M75 100 Q150 200 225 300 Q150 400 75 500" stroke="#666" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          {/* Mobile City Indicator */}
          <div className="absolute top-24 left-4 z-20">
            <motion.div 
              className={`px-3 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                currentCity === 'Hyderabad' 
                  ? 'bg-[#4A4A4A]/90 text-white'
                  : currentCity === 'Chennai'
                  ? 'bg-[#2962FF]/90 text-white'
                  : 'bg-white/90 text-gray-800'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentCity === 'All' ? `${sortedOutlets.length} Locations` : `${currentCity} • ${sortedOutlets.length}`}
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Map Pins */}
        <div className="absolute inset-0">
          {sortedOutlets.slice(0, 6).map((outlet, index) => (
            <motion.div
              key={outlet.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${20 + index * 12}%`,
                top: `${20 + (index % 3) * 20}%`,
              }}
              onClick={() => {
                setSelectedOutlet(outlet);
                setIsMobileSheetOpen(true);
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-3 border-white bg-cover bg-center overflow-hidden relative"
                style={{ backgroundImage: `url(${outlet.coverImage})` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                <div className="absolute inset-0 bg-black/40 rounded-full" />
                <MapPinIcon className="w-5 h-5 text-white relative z-10" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Bottom Sheet with keen-slider */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
          initial={{ y: isMobileSheetOpen ? 0 : '80%' }}
          animate={{ y: isMobileSheetOpen ? 0 : '80%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Sheet Handle */}
          <button
            className="w-full py-4 flex items-center justify-center"
            onClick={() => setIsMobileSheetOpen(!isMobileSheetOpen)}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
            {isMobileSheetOpen ? (
              <ChevronDownIcon className="w-6 h-6 text-gray-400 ml-2" />
            ) : (
              <ChevronUpIcon className="w-6 h-6 text-gray-400 ml-2" />
            )}
          </button>

          {/* Sheet Header */}
          <div className="px-6 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {sortedOutlets.length} locations {currentCity !== 'All' ? `in ${currentCity}` : 'nearby'}
            </h3>
            <p className="text-sm text-gray-600">Tap a pin or swipe up to explore</p>
          </div>

          {/* Sheet Content with keen-slider */}
          <div ref={mobilePinSliderRef} className="keen-slider p-4">
            {sortedOutlets.map((outlet) => (
              <div className="keen-slider__slide" key={outlet.id}>
                <motion.div
                  className="rounded-xl bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${outlet.coverImage})` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOutlet(outlet)}
                >
                  {/* Background overlay for text readability */}
                  <div className="absolute inset-0 bg-black/60 rounded-xl" />
                  <div className="relative z-10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm">{outlet.name}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A] text-white' : 'bg-[#2962FF] text-white'
                          }`}>
                            {outlet.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-white">{outlet.rating}</span>
                          <span className="text-xs text-gray-300">• {outlet.distance} km</span>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                          outlet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(outlet.isOpen)}`} />
                          {getStatusText(outlet.isOpen)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className={`p-2 text-white rounded-lg ${
                            outlet.city === 'Hyderabad' ? 'bg-[#4A4A4A]' : 'bg-[#2962FF]'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:${outlet.phone}`, '_self');
                          }}
                        >
                          <PhoneIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-[#00B248] text-white rounded-lg">
                          <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          {/* Slider Dots for mobile pin cards */}
          <div className="flex justify-center mt-4 sm:hidden">
            {sortedOutlets.map((_, idx) => (
              <button
                key={idx}
                onClick={() => mobilePinInstanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-200 ${mobilePinSlide === idx ? 'bg-[#2962FF]' : 'bg-gray-300'}`}
                aria-label={`Go to pin card ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapFirstView;