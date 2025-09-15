'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, X, Menu, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { HeaderProps, NavItem, DropdownItem } from '../header.types';
import { useTestDriveModal } from '../../test-ride-form/TestDriveModalStore';

export default function MobileHeader({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const modal = useTestDriveModal();
  const pathname = usePathname();

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
      // Removed setIsScrolled because it is not defined or used elsewhere

      // Theme detection
      const darkSections = document.querySelectorAll('[data-theme="dark"], .bg-black, .bg-gray-900');
      let currentTheme = false;
      
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentTheme = true;
        }
      });
      
      setIsDarkTheme(currentTheme);
      
      // Hide/show header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openTestRideForm = () => {
    modal.openManually();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header
        className={`lg:hidden fixed top-4 left-6 right-6 z-40 
          transition-all duration-700 ease-out
          ${isDarkTheme 
            ? 'bg-black/20 backdrop-blur-2xl shadow-2xl border border-white/20' 
            : 'bg-white/95 backdrop-blur-2xl shadow-2xl border border-gray-200/50'}
          rounded-3xl ${isVisible ? 'opacity-100 pointer-events-auto transform translate-y-0' : 'opacity-0 pointer-events-none transform -translate-y-full'}`}
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 relative z-10">
          <div className="flex items-center justify-between h-6">
            {/* Logo */}
            <div className="flex-shrink-0 relative group">
              <Link href={data.logo.href} className="relative hover:scale-110 transition-all duration-300">
                <Image
                  src={data.logo.src}
                  alt={data.logo.alt}
                  width={48}
                  height={48}
                  className="h-6 w-auto drop-shadow-lg" 
                  style={{ height: 'auto' }}
                />
              </Link>
            </div>

            {/* Mobile CTAs */}
            <div className="flex items-center space-x-2">
              {/* Call Now Button */}
              <motion.a
                href={`tel:${data.contact.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center px-2 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium font-neurial text-xs shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-500 overflow-hidden"
              >
                <Phone className="w-2.5 h-2.5 mr-0.5 relative z-10" />
                <span className="relative z-10 whitespace-nowrap">{data.contact.displayText}</span>
              </motion.a>
              
              {/* Mobile Hamburger */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-1.5 rounded-lg transition-all duration-300 backdrop-blur-sm border group ${
                  isDarkTheme 
                    ? 'hover:bg-white/10 border-white/20 hover:border-white/40' 
                    : 'hover:bg-gray-900/10 border-gray-900/20 hover:border-gray-900/40'
                }`}
                aria-label="Open menu"
              >
                <Menu className={`w-3 h-3 transition-colors ${isDarkTheme ? 'text-white group-hover:text-white' : 'text-gray-900 group-hover:text-gray-900'}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
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
              onClick={closeMobileMenu}
            />
            
            {/* Drawer */}
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
                {data.navigation.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MobileNavItem
                      item={item}
                      onItemClick={closeMobileMenu}
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
                          onClick={openTestRideForm}
                          className="relative group block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50"
                        >
                          <span className="relative z-10">{cta.label}</span>
                        </button>
                      ) : (
                        <Link
                          href={cta.href}
                          onClick={closeMobileMenu}
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
          className={`group relative block px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border font-medium ${
            isActive 
              ? 'text-orange-100 bg-gradient-to-r from-orange-500/30 to-amber-500/30 border-orange-400/40 shadow-lg shadow-orange-500/20' 
              : 'text-orange-100 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-400/30 hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-amber-500/30 hover:border-orange-400/50'
          }`}
        >
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
        <span className="relative z-10 font-neurial">
          {item.label}
        </span>
      </Link>
    )
  );
}
