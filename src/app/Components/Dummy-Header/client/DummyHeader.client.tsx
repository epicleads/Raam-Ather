'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, X, Menu, Phone, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { DummyHeaderProps, NavItem, DropdownItem } from '../dummy-header.types';
import { useTestDriveModal } from '../../test-ride-form/TestDriveModalStore';
import { TestRideFormModal } from '../../test-ride-form';

export default function DummyHeaderClient({ data }: DummyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const modal = useTestDriveModal();
  const pathname = usePathname();
  
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to check if a nav item is active
  const isNavItemActive = (item: NavItem) => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.dropdown) {
      return item.dropdown.some(dropdownItem => pathname === dropdownItem.href);
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 60);
      
      // Dynamic theme detection based on page sections
      // Check if we're in a dark section (hero, cta sections, etc.)
      const darkSections = document.querySelectorAll('[data-theme="dark"], .bg-black, .bg-gray-900, .bg-slate-900');
      const lightSections = document.querySelectorAll('[data-theme="light"], .bg-white, .bg-gray-50, .bg-slate-50');
      
      let currentTheme = false; // default to light
      
      // Check which section we're currently in
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentTheme = true; // dark theme
        }
      });
      
      // Override with light if we're specifically in a light section
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentTheme = false; // light theme
        }
      });
      
      // If at the very top (hero section), check hero background
      if (currentScrollY < 100) {
        const hero = document.querySelector('.hero, [class*="hero"], [class*="banner"]');
        if (hero) {
          const heroStyles = window.getComputedStyle(hero);
          const bgColor = heroStyles.backgroundColor;
          // Check if background is dark
          if (bgColor.includes('rgb(0, 0, 0)') || bgColor.includes('rgb(17, 24, 39)') || hero.classList.contains('bg-black') || hero.classList.contains('bg-gray-900')) {
            currentTheme = true;
          }
        }
      }
      
      setIsDarkTheme(currentTheme);
      
      // Apple-style scroll behavior
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // Scrolling up or near top - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Mouse tracking for glassmorphism effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openTestRideForm = () => {
    modal.openManually();
    setIsMobileMenuOpen(false);
  };

  // Dynamic styles based on theme
  const getHeaderStyles = () => {
    if (isDarkTheme) {
      return {
        className: isScrolled 
          ? 'bg-black/20 backdrop-blur-2xl shadow-2xl border border-white/20' 
          : 'bg-black/10 backdrop-blur-xl shadow-xl border border-white/10',
        hoverClassName: 'hover:bg-black/30 hover:border-white/30 hover:shadow-3xl',
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%),
          rgba(0,0,0,0.2)
        `,
        textColor: 'text-white',
        textColorSecondary: 'text-white/80'
      };
    } else {
      return {
        className: isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl shadow-2xl border border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-xl shadow-xl border border-gray-200/30',
        hoverClassName: 'hover:bg-white/98 hover:border-gray-300/50 hover:shadow-3xl',
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.05) 0%, transparent 50%),
          linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%),
          rgba(255,255,255,0.95)
        `,
        textColor: 'text-gray-900',
        textColorSecondary: 'text-gray-700'
      };
    }
  };

  const headerStyles = getHeaderStyles();

  return (
    <>
      {/* Main Header */}
      <header
        role="banner"
        aria-label="Main site header"
        className={`fixed top-4 left-6 right-6 z-40 
          transition-all duration-700 ease-out
          ${headerStyles.className}
          rounded-3xl ${isVisible ? 'opacity-100 pointer-events-auto transform translate-y-0' : 'opacity-0 pointer-events-none transform -translate-y-full'}
          ${headerStyles.hoverClassName}`}
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          background: headerStyles.background,
        }}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isDarkTheme ? 'via-white/5' : 'via-gray-900/5'} to-transparent animate-pulse`}></div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${isDarkTheme ? 'bg-white/40' : 'bg-gray-900/40'} rounded-full`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 relative z-10">
          <div className="flex items-center justify-between h-6 md:h-8">
            {/* Logo with adaptive glow effect */}
            <div className="flex-shrink-0 relative group">
              <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-r from-blue-400/20 to-purple-400/20' : 'bg-gradient-to-r from-blue-400/10 to-purple-400/10'} rounded-full blur-lg group-hover:blur-xl transition-all duration-500`}></div>
              <Link href={data.logo.href} className="relative hover:scale-110 transition-all duration-300">
                <Image
                  src={data.logo.src}
                  alt={data.logo.alt}
                  width={48}
                  height={48}
                  className="h-6 w-auto sm:h-8 md:h-10 lg:h-12 drop-shadow-lg" 
                  style={{ height: 'auto' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation - FIXED: Removed overflow-x-auto and scrollbar-hide */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 ml-4 xl:ml-6">
              {data.navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                  onMouseLeave={() => item.dropdown && handleDropdownLeave()}
                >
                  {item.href ? (
                    item.label === 'Offers' ? (
                      <motion.div
                        animate={{
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`group relative px-2 sm:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 text-xs sm:text-xs lg:text-xs xl:text-sm font-medium font-neurial rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                            isDarkTheme
                              ? 'text-orange-100 bg-gradient-to-r from-orange-500/30 to-amber-500/30 border-orange-400/40 shadow-lg shadow-orange-500/20 hover:from-orange-500/40 hover:to-amber-500/40 hover:border-orange-400/60'
                              : 'text-orange-900 bg-gradient-to-r from-orange-400/20 to-amber-400/20 border-orange-300/40 shadow-lg shadow-orange-400/20 hover:from-orange-400/30 hover:to-amber-400/30 hover:border-orange-300/60'
                          }`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                          <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-500 bg-gradient-to-r from-orange-400/0 via-amber-400/0 to-orange-400/0 group-hover:from-orange-400/20 group-hover:via-amber-400/20 group-hover:to-orange-400/20"></div>
                        </Link>
                      </motion.div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`group relative px-2 sm:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 text-xs sm:text-xs lg:text-xs xl:text-sm font-medium font-neurial rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                          isNavItemActive(item)
                            ? isDarkTheme 
                              ? 'text-white bg-white/20 border-white/30 shadow-lg'
                              : 'text-gray-900 bg-gray-900/10 border-gray-900/30 shadow-lg'
                            : isDarkTheme
                              ? 'text-white/80 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20 hover:shadow-md'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-900/10 border-transparent hover:border-gray-900/20 hover:shadow-md'
                        }`}
                      >
                        <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-500"></div>
                      </Link>
                    )
                  ) : (
                    <button
                      className={`group relative flex items-center px-2 sm:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 text-xs sm:text-xs lg:text-xs xl:text-sm font-medium font-neurial rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                        isNavItemActive(item)
                          ? isDarkTheme 
                            ? 'text-white bg-white/20 border-white/30 shadow-lg'
                            : 'text-gray-900 bg-gray-900/10 border-gray-900/30 shadow-lg'
                          : isDarkTheme
                            ? 'text-white/80 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20 hover:shadow-md'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-900/10 border-transparent hover:border-gray-900/20 hover:shadow-md'
                      }`}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown className={`ml-0.5 sm:ml-1 lg:ml-1 xl:ml-2 w-2.5 sm:w-3 lg:w-3 h-2.5 sm:h-3 lg:h-3 transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-500"></div>
                    </button>
                  )}

                  {/* Enhanced Dropdown with glassmorphism */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
                          className={`absolute top-full left-0 mt-3 w-72 ${isDarkTheme ? 'bg-black/30' : 'bg-white/95'} backdrop-blur-2xl rounded-2xl shadow-2xl border ${isDarkTheme ? 'border-white/20' : 'border-gray-200/50'} py-3 z-50 overflow-hidden`}
                          style={{
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${isDarkTheme ? 'from-white/10 to-white/5' : 'from-gray-900/5 to-gray-900/2'} rounded-2xl`}></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl"></div>
                          {item.dropdown.map((dropdownItem: DropdownItem, idx) => (
                            <motion.div
                              key={dropdownItem.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className={`relative block px-5 py-3 text-sm ${isDarkTheme ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-900/10'} transition-all duration-200 group`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="relative z-10">
                                  <div className="font-medium font-neurial">{dropdownItem.label}</div>
                                  {dropdownItem.description && (
                                    <div className={`text-xs ${isDarkTheme ? 'text-white/60' : 'text-gray-600'} mt-1`}>{dropdownItem.description}</div>
                                  )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-300 rounded-lg"></div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Premium Desktop CTAs - responsive sizing */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
              {data.ctas.map((cta, index) => (
                cta.label === 'Book Test Ride' ? (
                  <motion.button
                    key={cta.label}
                    onClick={openTestRideForm}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative inline-flex items-center px-2 sm:px-3 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-2.5 xl:py-2.5 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl font-medium font-neurial text-xs sm:text-xs lg:text-sm xl:text-sm transition-all duration-500 overflow-hidden ${
                      cta.type === 'primary'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50'
                        : 'text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Zap className="w-3 sm:w-3 lg:w-4 xl:w-4 h-3 sm:h-3 lg:h-4 xl:h-4 mr-1 sm:mr-1 lg:mr-2 xl:mr-2 relative z-10" />
                    <span className="relative z-10 whitespace-nowrap">{cta.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </motion.button>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={`group relative inline-flex items-center px-2 sm:px-3 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-2.5 xl:py-2.5 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl font-medium font-neurial text-xs sm:text-xs lg:text-sm xl:text-sm transition-all duration-500 overflow-hidden ${
                      cta.type === 'primary'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50'
                        : 'text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {cta.icon && <span className="mr-1 sm:mr-1 lg:mr-2 xl:mr-2 relative z-10">{cta.icon}</span>}
                    <span className="relative z-10 whitespace-nowrap">{cta.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Link>
                )
              ))}
              
              {/* Premium Hamburger Menu */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-1.5 sm:p-2 lg:p-2.5 xl:p-3 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 backdrop-blur-sm border group ${
                  isDarkTheme 
                    ? 'hover:bg-white/10 border-white/20 hover:border-white/40' 
                    : 'hover:bg-gray-900/10 border-gray-900/20 hover:border-gray-900/40'
                }`}
                aria-label="Open menu"
              >
                <Menu className={`w-3 sm:w-4 lg:w-4 xl:w-5 h-3 sm:h-4 lg:h-4 xl:h-5 transition-colors ${isDarkTheme ? 'text-white group-hover:text-white' : 'text-gray-900 group-hover:text-gray-900'}`} />
                <div className={`absolute inset-0 bg-gradient-to-br rounded-2xl transition-all duration-300 ${
                  isDarkTheme 
                    ? 'from-white/5 to-transparent group-hover:from-white/10' 
                    : 'from-gray-900/5 to-transparent group-hover:from-gray-900/10'
                }`}></div>
              </motion.button>
            </div>

            {/* Mobile Header with premium design - compact sizing */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Premium Call Now Button */}
              <motion.a
                href={`tel:${data.contact.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg sm:rounded-xl font-medium font-neurial text-xs shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Phone className="w-2.5 sm:w-3 h-2.5 sm:h-3 mr-0.5 sm:mr-1 relative z-10" />
                <span className="relative z-10 whitespace-nowrap">{data.contact.displayText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </motion.a>
              
              {/* Premium Mobile Hamburger */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 backdrop-blur-sm border group ${
                  isDarkTheme 
                    ? 'hover:bg-white/10 border-white/20 hover:border-white/40' 
                    : 'hover:bg-gray-900/10 border-gray-900/20 hover:border-gray-900/40'
                }`}
                aria-label="Open menu"
              >
                <Menu className={`w-3 sm:w-4 lg:w-4 xl:w-5 h-3 sm:h-4 lg:h-4 xl:h-5 transition-colors ${isDarkTheme ? 'text-white group-hover:text-white' : 'text-gray-900 group-hover:text-gray-900'}`} />
                <div className={`absolute inset-0 bg-gradient-to-br rounded-2xl transition-all duration-300 ${
                  isDarkTheme 
                    ? 'from-white/5 to-transparent group-hover:from-white/10' 
                    : 'from-gray-900/5 to-transparent group-hover:from-gray-900/10'
                }`}></div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            {/* Enhanced Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              onClick={closeMobileMenu}
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)'
              }}
            />
            
            {/* Premium Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.9) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400/5 via-purple-400/5 to-pink-400/5"></div>
              
              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-white/10">
                <Link href={data.logo.href} onClick={closeMobileMenu} className="hover:scale-110 transition-transform duration-300">
                  <Image
                    src={data.logo.src}
                    alt={data.logo.alt}
                    width={40}
                    height={40}
                    className="h-10 w-auto drop-shadow-lg"
                  />
                </Link>
                <motion.button
                  onClick={closeMobileMenu}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="relative p-6 space-y-3">
                {data.navigation.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (data.navigation.findIndex(nav => nav.label === item.label)) * 0.1 }}
                  >
                    <MobileNavItem
                      item={item}
                      onItemClick={closeMobileMenu}
                      isActive={isNavItemActive(item)}
                    />
                  </motion.div>
                ))}

                {/* Premium CTAs */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  {data.ctas.map((cta, index) => (
                    <motion.div
                      key={cta.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (data.navigation.length + index) * 0.1 }}
                    >
                      {cta.label === 'Book Test Ride' ? (
                        <button
                          onClick={openTestRideForm}
                          className={`relative group block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 overflow-hidden ${
                            cta.type === 'primary'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50'
                              : 'text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <span className="relative z-10">{cta.label}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                      ) : (
                        <Link
                          href={cta.href}
                          onClick={closeMobileMenu}
                          className={`relative group block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 overflow-hidden ${
                            cta.type === 'primary'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50'
                              : 'text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <span className="relative z-10">{cta.label}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TestRideForm - Now controlled by the store */}
      <TestRideFormModal />
    </>
  );
}

interface MobileNavItemProps {
  item: NavItem;
  onItemClick: () => void;
  isActive: boolean;
}

function MobileNavItem({ item, onItemClick, isActive }: MobileNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.dropdown) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center justify-between w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
            isActive 
              ? 'text-white bg-white/20 border-white/30 shadow-lg' 
              : 'text-white/80 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 rounded-2xl transition-all duration-500"></div>
          <span className="relative z-10 font-medium font-neurial">
            {item.label}
          </span>
          <ChevronDown className={`relative z-10 w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pl-4 py-2 space-y-2">
                {item.dropdown.map((dropdownItem: DropdownItem, idx) => (
                  <motion.div
                    key={dropdownItem.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={dropdownItem.href}
                      onClick={onItemClick}
                      className="relative group block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20"
                    >
                      <span className="relative z-10">{dropdownItem.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 rounded-xl transition-all duration-300"></div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    item.label === 'Offers' ? (
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Link
          href={item.href || '#'}
          onClick={onItemClick}
          className={`group relative block px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border font-medium ${
            isActive 
              ? 'text-orange-100 bg-gradient-to-r from-orange-500/30 to-amber-500/30 border-orange-400/40 shadow-lg shadow-orange-500/20' 
              : 'text-orange-100 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-400/30 hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-amber-500/30 hover:border-orange-400/50'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-amber-400/0 to-orange-400/0 group-hover:from-orange-400/10 group-hover:via-amber-400/10 group-hover:to-orange-400/10 rounded-2xl transition-all duration-500"></div>
          <span className="relative z-10 font-neurial">
            {item.label}
          </span>
        </Link>
      </motion.div>
    ) : (
      <Link
        href={item.href || '#'}
        onClick={onItemClick}
        className={`group relative block px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border font-medium ${
          isActive 
            ? 'text-white bg-white/20 border-white/30 shadow-lg' 
            : 'text-white/80 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 rounded-2xl transition-all duration-500"></div>
        <span className="relative z-10 font-neurial">
          {item.label}
        </span>
      </Link>
    )
  );
}