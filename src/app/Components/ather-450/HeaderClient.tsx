"use client";

import { AnimatePresence, motion } from "framer-motion";
import DesktopHeader from "../New-Header/desktop/DesktopHeader";
import MobileHeader from "../New-Header/mobile/MobileHeader";
import { HeaderData } from "../New-Header/header.types";
import ModelHeader from "../model-header/ModelHeader";
import { useHeaderSwap } from "../../../hooks/useHeaderSwap";

export default function HeaderClient() {
  const showModelHeader = useHeaderSwap();
  
  const headerData: HeaderData = {
    logo: {
      src: '/Ather-Assets/Home/raamather.png',
      alt: 'Raam Ather',
      href: '/'
    },
    navigation: [
      {
        label: 'Scooters',
        dropdown: [
          { label: 'Rizta', href: '/rizta' },
          { label: 'Ather 450', href: '/ather-450' },
          { label: '450 Apex', href: '/ather-450-apex'}
        ]
      },
      { label: 'Services', href: '/Services' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Offers', href: '/offer' },
      { label: 'About Us', href: '/AboutUs' },
      { label: 'Contact Us', href: '/ContactUs' },
      { label: 'Our Locations', href: '/StoreLocator' }
    ],
    ctas: [
      { 
        label: 'Book Test Ride', 
        href: '/book-test-ride', 
        type: 'primary' as const
      },
      { 
        label: 'Call Now', 
        href: 'tel:+919032333833', 
        type: 'secondary' as const
      }
    ],
    mobileBottomNav: [
      { label: 'Models', href: '/models' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Call Now', href: 'tel:+919032333833' }
    ],
    contact: {
      phone: '+919032333833',
      displayText: 'Call Now'
    }
  };

  return (
    <>
      {/* Floating Header - Initially visible */}
      <AnimatePresence>
        {!showModelHeader && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <>
              <div className="hidden lg:block">
                <DesktopHeader data={headerData} />
              </div>
              <div className="lg:hidden">
                <MobileHeader data={headerData} />
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model Header - Slides down when scroll past viewport height */}
      <AnimatePresence>
        {showModelHeader && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ModelHeader />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
