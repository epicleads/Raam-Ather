"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ModelNavBar from "./desktop/ModelNavBar";
import ModelMobileMenu from "./mobile/ModelMobileMenu";

// Function to get model name based on pathname
const getModelName = (pathname: string | null): string => {
  if (pathname?.includes("/rizta")) return "Ather Rizta";
  if (pathname?.includes("/ather-450")) return "Ather 450";
  if (pathname?.includes("/ather-450-apex")) return "Ather 450 Apex";
  return "Ather";
};

export default function ModelHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("#overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);
  const pathname = usePathname();

  // ✅ Only show on model pages
  const isModelPage =
    pathname?.includes("/rizta") ||
    pathname?.includes("/ather-450") ||
    pathname?.includes("/ather-450-apex");

  // ✅ Scroll trigger for showing header after hero (viewport height)
  useEffect(() => {
    if (!isModelPage) return;

    const onScroll = () => {
      const shouldShow = window.scrollY > window.innerHeight;
      
      // Once shown, keep it visible until user scrolls back to viewport
      if (shouldShow && !isVisible) {
        setIsVisible(true);
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
      }
      
      if (shouldShow) {
        // Calculate scroll depth for color transition
        const heroHeight = window.innerHeight;
        const currentScroll = window.scrollY;
        const depth = Math.min((currentScroll - heroHeight) / 200, 1); // Normalize to 0-1
        setScrollDepth(depth);
      }
    };
    
    onScroll(); // Check initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isModelPage, isVisible]);

  // ✅ Active section tracking with IntersectionObserver
  useEffect(() => {
    if (!isModelPage) return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isModelPage]);

  if (!isModelPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.95 }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94], // Spring-like easing
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 }
          }}
          className={`fixed top-6 left-8 right-8 z-50 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-300 ${
            scrollDepth > 0.5 
              ? 'bg-[#0D0D0D]/95 border-gray-700/50' 
              : 'bg-white/95 border-gray-200/50'
          }`}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Match FloatingHeader's exact structure and padding */}
          <div className="max-w-7xl mx-auto px-6 py-1">
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:flex w-full">
                <ModelNavBar 
                  activeSection={activeSection} 
                  scrollDepth={scrollDepth} 
                  modelName={getModelName(pathname)}
                />
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex w-full items-center justify-between">
                <ModelNavBar 
                  activeSection={activeSection} 
                  scrollDepth={scrollDepth} 
                  modelName={getModelName(pathname)}
                />
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="Open mobile menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center space-y-0.5">
                    <div className="w-4 h-0.5 bg-black"></div>
                    <div className="w-4 h-0.5 bg-black"></div>
                    <div className="w-4 h-0.5 bg-black"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <ModelMobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            scrollDepth={scrollDepth}
          />
        </motion.header>
      )}
    </AnimatePresence>
  );
}
