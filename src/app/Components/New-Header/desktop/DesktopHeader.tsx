'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Zap, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { HeaderProps, NavItem, DropdownItem } from '../header.types';
import { useTestDriveModal } from '../../test-ride-form/TestDriveModalStore';

export default function DesktopHeader({ data }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

      // setIsScrolled is not defined in this component, so remove or define it if needed.
      // If you want to track scrolled state, define:
      // const [isScrolled, setIsScrolled] = useState(false);
      // For now, comment out or remove the following line to fix the error:
      // setIsScrolled(currentScrollY > 60);

      // Dynamic theme detection based on page sections
      const darkSections = document.querySelectorAll('[data-theme="dark"], .bg-black, .bg-gray-900, .bg-slate-900');
      const lightSections = document.querySelectorAll('[data-theme="light"], .bg-white, .bg-gray-50, .bg-slate-50');
      
      // let currentTheme = false; // Removed unused variable // default to light
      
      // Check which section we're currently in
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // currentTheme = true; // Removed unused variable // dark theme
        }
      });
      
      // Override with light if we're specifically in a light section
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // currentTheme = false; // light theme // Removed unused variable
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
            // currentTheme = true; // Removed unused variable
          }
        }
      }
      
      // setIsDarkTheme(currentTheme); // Removed unused state
      
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

  // Mouse tracking for glassmorphism effects
  useEffect(() => {
    const handleMouseMove = () => {
      // setMousePosition({ x: e.clientX, y: e.clientY }); // Removed unused state
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

  const openTestRideForm = () => {
    modal.openManually();
  };

  // Plain off-white header styles
  const getHeaderStyles = () => {
    return {
      className: 'bg-white shadow-lg border border-gray-200',
      hoverClassName: 'hover:bg-gray-50',
      textColor: 'text-gray-900',
      textColorSecondary: 'text-gray-700'
    };
  };

  const headerStyles = getHeaderStyles();

  return (
    <>
      {/* Desktop Header */}
      <header
        role="banner"
        aria-label="Main site header"
        className={`hidden lg:block fixed top-4 left-6 right-6 z-40 
          transition-all duration-700 ease-out
          ${headerStyles.className}
          rounded-3xl ${isVisible ? 'opacity-100 pointer-events-auto transform translate-y-0' : 'opacity-0 pointer-events-none transform -translate-y-full'}
          ${headerStyles.hoverClassName}`}
      >

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 relative z-10">
          <div className="flex items-center justify-between h-6 md:h-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={data.logo.href} className="hover:opacity-80 transition-opacity duration-300">
                <Image
                  src={data.logo.src}
                  alt={data.logo.alt}
                  width={48}
                  height={48}
                  className="h-6 w-auto sm:h-8 md:h-10 lg:h-12" 
                  style={{ height: 'auto' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation - NO SCROLL ISSUES */}
            <nav className="flex items-center space-x-1 xl:space-x-2 ml-4 xl:ml-6">
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
                          className="px-2 sm:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 text-xs sm:text-xs lg:text-xs xl:text-sm font-medium font-neurial rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 border text-white bg-green-600 hover:bg-green-700 border-green-500"
                        >
                          <span className="whitespace-nowrap">{item.label}</span>
                        </Link>
                      </motion.div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-2 sm:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 text-xs sm:text-xs lg:text-xs xl:text-sm font-medium font-neurial rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 ${
                          isNavItemActive(item)
                            ? 'text-gray-900 bg-gray-100 border border-gray-300'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                      </Link>
                    )
                  ) : (
                    <button
                      className={`flex items-center px-2 sm:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 text-xs sm:text-xs lg:text-xs xl:text-sm font-medium font-neurial rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 ${
                        isNavItemActive(item)
                          ? 'text-gray-900 bg-gray-100 border border-gray-300'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                      }`}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown className={`ml-0.5 sm:ml-1 lg:ml-1 xl:ml-2 w-2.5 sm:w-3 lg:w-3 h-2.5 sm:h-3 lg:h-3 transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      )}
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
                          className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-lg border border-gray-200 py-3 z-50 overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem: DropdownItem, idx) => (
                            <motion.div
                              key={dropdownItem.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className="block px-5 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="font-medium font-neurial">{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-600 mt-1">{dropdownItem.description}</div>
                                )}
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

            {/* Premium Desktop CTAs */}
            <div className="flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
              {data.ctas.map((cta) => (
                cta.label === 'Book Test Ride' ? (
                  <motion.button
                    key={cta.label}
                    onClick={openTestRideForm}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative inline-flex items-center px-2 sm:px-3 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-2.5 xl:py-2.5 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl font-medium font-neurial text-xs sm:text-xs lg:text-sm xl:text-sm transition-all duration-500 overflow-hidden ${
                      cta.type === 'primary'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50'
                        : 'text-black border border-gray-400 hover:bg-gray-100 rounded-xl'
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
                        : 'text-black border border-gray-400 hover:bg-gray-100 rounded-xl'
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
                className="p-1.5 sm:p-2 lg:p-2.5 xl:p-3 rounded-lg sm:rounded-xl lg:rounded-xl xl:rounded-2xl transition-all duration-300 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                aria-label="Open menu"
              >
                <Menu className="w-3 sm:w-4 lg:w-4 xl:w-5 h-3 sm:h-4 lg:h-4 xl:h-5 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer - Same as mobile header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 overflow-y-auto bg-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Link href={data.logo.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-80 transition-opacity duration-300">
                  <Image
                    src={data.logo.src}
                    alt={data.logo.alt}
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 border border-gray-300 hover:border-gray-400"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="relative p-6 space-y-3">
                {data.navigation.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <DesktopMobileNavItem
                      item={item}
                      onItemClick={() => setIsMobileMenuOpen(false)}
                      isActive={isNavItemActive(item)}
                    />
                  </motion.div>
                ))}

                {/* CTAs */}
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
                          onClick={() => {
                            modal.openManually();
                            setIsMobileMenuOpen(false);
                          }}
                          className="relative group block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50"
                        >
                          <span className="relative z-10">{cta.label}</span>
                        </button>
                      ) : (
                        <Link
                          href={cta.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="relative group block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 overflow-hidden text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm"
                        >
                          <span className="relative z-10">{cta.label}</span>
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
    </>
  );
}

interface DesktopMobileNavItemProps {
  item: NavItem;
  onItemClick: () => void;
  isActive: boolean;
}

function DesktopMobileNavItem({ item, onItemClick, isActive }: DesktopMobileNavItemProps) {
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
          className={`block px-5 py-4 rounded-2xl transition-all duration-300 border font-medium ${
            isActive 
              ? 'text-white bg-green-600 border-green-500' 
              : 'text-white bg-green-600 hover:bg-green-700 border-green-500'
          }`}
        >
          <span className="font-neurial">
            {item.label}
          </span>
        </Link>
      </motion.div>
    ) : (
      <Link
        href={item.href || '#'}
        onClick={onItemClick}
        className={`block px-5 py-4 rounded-2xl transition-all duration-300 border font-medium ${
          isActive 
            ? 'text-gray-900 bg-gray-100 border-gray-300' 
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}
      >
        <span className="font-neurial">
          {item.label}
        </span>
      </Link>
    )
  );
}
