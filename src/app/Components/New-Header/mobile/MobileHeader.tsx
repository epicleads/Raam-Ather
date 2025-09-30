'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, X, Menu, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { HeaderProps, NavItem, DropdownItem } from '../header.types';
import { useTestDriveModal } from '../../test-ride-form/TestDriveModalStore';
import { useSidebar } from '../../contexts/SidebarContext';
import '../../../../styles/mobile-header.css';

export default function MobileHeader({ data }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const modal = useTestDriveModal();
  const pathname = usePathname();
  const { setIsSidebarOpen } = useSidebar();

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
      // let currentTheme = false; // Removed unused variable
      
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // currentTheme = true; // Removed unused variable
        }
      });
      
      // setIsDarkTheme(currentTheme); // Removed unused state
      
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
      document.body.classList.remove('no-horizontal-scroll');
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const openTestRideForm = () => {
    modal.openManually();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div
        className={`lg:hidden mobile-header-emergency mobile-header-fixed z-40 
          transition-all duration-700 ease-out ${isVisible ? 'opacity-100 pointer-events-auto transform translate-y-0' : 'opacity-0 pointer-events-none transform -translate-y-full'}`}
        style={{ 
          top: '0.5rem',
          position: 'fixed',
          left: '0',
          right: '0',
          width: '100vw',
          maxWidth: '100vw',
          boxSizing: 'border-box',
          padding: '0 0.5rem'
        }}
      >
        <header
          className="bg-white shadow-lg border border-gray-200 rounded-3xl overflow-hidden"
          style={{ 
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div className="px-2 sm:px-3" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', paddingTop: '0.45rem', paddingBottom: '0.45rem' }}>
            <div className="flex items-center justify-between" style={{ width: '100%', minWidth: 0 }}>
              {/* Logo */}
              <div className="flex-shrink-0" style={{ minWidth: 0, maxWidth: '55%' }}>
                <Link href={data.logo.href} className="hover:opacity-80 transition-opacity duration-300">
                  <Image
                    src={data.logo.src}
                    alt={data.logo.alt}
                    width={130}
                    height={33}
                    className="h-7 w-auto sm:h-8"
                    priority
                    style={{ height: 'auto', maxWidth: '100%' }}
                  />
                </Link>
              </div>

              {/* Mobile CTAs */}
              <div className="flex items-center flex-shrink-0" style={{ gap: '0.5rem', minWidth: 0, maxWidth: '50%' }}>
                {/* Call Now Button */}
                <motion.a
                  href={`tel:${data.contact.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-2 py-1.5 text-black border border-gray-400 rounded-xl font-medium font-neurial text-xs hover:bg-gray-100 transition-all duration-500"
                  style={{ minWidth: 0, maxWidth: '100%' }}
                >
                  <Phone className="w-2.5 h-2.5 mr-1 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">Call Now</span>
                  <span className="sm:hidden">Call</span>
                </motion.a>
                
                {/* Mobile Hamburger */}
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(true);
                    setIsSidebarOpen(true);
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-lg transition-all duration-300 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex-shrink-0"
                  aria-label="Open menu"
                >
                  <Menu className="w-3 h-3 text-gray-700" />
                </motion.button>
              </div>
            </div>
          </div>
        </header>
      </div>

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
              className="absolute right-0 top-0 bottom-0 overflow-y-auto bg-white"
              style={{ 
                width: 'min(320px, calc(100vw - 2rem))',
                maxWidth: 'calc(100vw - 2rem)',
                minWidth: '280px'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Link href={data.logo.href} onClick={closeMobileMenu} className="hover:opacity-80 transition-opacity duration-300">
                  <Image
                    src={data.logo.src}
                    alt={data.logo.alt}
                    width={140}
                    height={35}
                    className="h-10 w-auto"
                    style={{ maxHeight: '40px' }}
                  />
                </Link>
                <motion.button
                  onClick={closeMobileMenu}
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
                          className="block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 text-black border border-gray-400 hover:bg-gray-100"
                        >
                          <span className="relative z-10">{cta.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* WhatsApp Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (data.navigation.length + data.ctas.length) * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        const message = encodeURIComponent("Hi Raam Ather, I want to know more about the scooter!");
                        const whatsappUrl = `https://wa.me/919032333833?text=${message}`;
                        window.open(whatsappUrl, '_blank');
                        closeMobileMenu();
                      }}
                      className="block w-full text-center px-6 py-4 rounded-2xl font-medium font-neurial transition-all duration-500 text-white bg-green-400 hover:bg-green-500 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <span>WhatsApp</span>
                      </div>
                    </button>
                  </motion.div>
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
          className={`flex items-center justify-between w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 border ${
            isActive 
              ? 'text-gray-900 bg-gray-100 border-gray-300' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
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
                      className="block px-5 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200"
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
