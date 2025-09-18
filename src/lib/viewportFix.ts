"use client";

/**
 * Fix for mobile viewport height calculation issues
 * This addresses the problem where hero sections become visible only after DevTools inspection
 */

let isViewportFixed = false;

export function initViewportFix() {
  if (typeof window === 'undefined' || isViewportFixed) return;
  
  function setViewportHeight() {
    // Calculate the actual viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Force layout recalculation for hero containers - Only for home page
    const heroContainers = document.querySelectorAll(
      '.home-hero .hero-container, .rizta-container, .ather450-container'
    );
    
    heroContainers.forEach(container => {
      const element = container as HTMLElement;
      // Force reflow by reading computed style
      void window.getComputedStyle(element).height;
      // Use CSS classes instead of inline styles to avoid hydration mismatch
      element.classList.add('viewport-fixed');
    });
  }

  // Set initial viewport height
  setViewportHeight();
  
  // Handle orientation changes and resize events
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setViewportHeight, 100);
  });
  
  // Handle orientation change specifically for mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 500); // Wait for orientation change to complete
  });
  
  // Force recalculation after DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(setViewportHeight, 100);
    });
  } else {
    setTimeout(setViewportHeight, 100);
  }
  
  isViewportFixed = true;
}

/**
 * Force hero section visibility - call this if hero is still not visible
 */
export function forceHeroVisibility() {
  if (typeof window === 'undefined') return;
  
  const heroContainers = document.querySelectorAll(
    '.hero-container, .rizta-container, .ather450-container'
  );
  
  heroContainers.forEach(container => {
    const element = container as HTMLElement;
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    // Use CSS classes instead of inline styles to avoid hydration mismatch
    element.classList.add('viewport-fixed');
  });
}