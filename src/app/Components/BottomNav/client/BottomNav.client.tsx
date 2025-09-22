"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { useTestDriveModal } from "../../test-ride-form/TestDriveModalStore";

export function BottomNavClient() {
  const pathname = usePathname();
  const testDriveModal = useTestDriveModal();
  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  const handleTestDriveClick = () => {
    testDriveModal.openManually();
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Never show nav on home page hero section (first 100vh)
      if (pathname === '/' && currentScrollY < window.innerHeight) {
        setIsVisible(false);
        setHasScrolledDown(false);
        setLastScrollY(currentScrollY);
        return;
      }

      // Always hide nav when near the very top (avoid showing in/near hero)
      if (currentScrollY <= 150) {
        setIsVisible(false);
        setHasScrolledDown(false);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Debounced scroll behavior to prevent rapid fluctuations
      const newTimeout = setTimeout(() => {
        // Show nav when scrolling down and past threshold
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setIsVisible(true);
          setHasScrolledDown(true);
        } 
        // Only hide nav when scrolling up significantly AND we've already scrolled down
        // Add buffer zone to prevent flickering
        else if (currentScrollY < lastScrollY - 100 && hasScrolledDown && currentScrollY > 300) {
          setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      }, 150); // 150ms debounce for smoother behavior
      
      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isHydrated, lastScrollY, pathname, scrollTimeout, hasScrolledDown]);

  // Don't render until hydrated to prevent mismatch
  if (!isHydrated) {
    return (
      <nav className="bottom-nav fixed bottom-0 inset-x-0 bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-gray-700 flex items-center z-50 md:hidden translate-y-full">
        {/* Test Drive Button - Left 50% */}
        <button
          onClick={handleTestDriveClick}
          className="flex-1 flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:scale-105 py-3 px-2 text-gray-400 hover:text-green-400 cursor-pointer hover:bg-gray-800/30 border-r border-gray-700/50"
        >
          <Calendar className="w-5 h-5 stroke-[1.5] transition-colors duration-200" />
          <span className="text-xs font-medium text-center">Test Drive</span>
        </button>
        
        {/* Contact Us Button - Right 50% */}
        <Link
          href="/ContactUs"
          className="flex-1 flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:scale-105 py-3 px-2 text-gray-400 hover:text-green-400 hover:bg-gray-800/30"
        >
          <MapPin className="w-5 h-5 stroke-[1.5] transition-colors duration-200" />
          <span className="text-xs font-medium text-center">Contact Us</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav
      className={`bottom-nav fixed bottom-0 inset-x-0 bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-gray-700 flex items-center z-50 md:hidden transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* Test Drive Button - Left 50% */}
      <button
        onClick={handleTestDriveClick}
        className="flex-1 flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:scale-105 py-3 px-2 text-gray-400 hover:text-green-400 cursor-pointer hover:bg-gray-800/30 border-r border-gray-700/50"
      >
        <Calendar className="w-5 h-5 stroke-[1.5] transition-colors duration-200" />
        <span className="text-xs font-medium text-center">Test Drive</span>
      </button>
      
      {/* Contact Us Button - Right 50% */}
      <Link
        href="/ContactUs"
        className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:scale-105 py-3 px-2 hover:bg-gray-800/30 ${
          pathname === "/ContactUs" 
            ? "text-green-400 bg-gray-800/30" 
            : "text-gray-400 hover:text-green-400"
        }`}
      >
        <MapPin className="w-5 h-5 stroke-[1.5] transition-colors duration-200" />
        <span className="text-xs font-medium text-center">Contact Us</span>
      </Link>
    </nav>
  );
}
