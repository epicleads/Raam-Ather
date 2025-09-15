'use client';

import { useEffect } from 'react';

// Extended interfaces for performance entries
interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface NavigationEntry extends PerformanceEntry {
  domContentLoadedEventEnd: number;
  domContentLoadedEventStart: number;
  loadEventEnd: number;
  fetchStart: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observePerformance = () => {
      // Monitor First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'paint') {
            console.log(`${entry.name}: ${entry.startTime}ms`);
          }
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`LCP: ${entry.startTime}ms`);
          }
          if (entry.entryType === 'first-input') {
            const firstInputEntry = entry as FirstInputEntry;
            console.log(`FID: ${firstInputEntry.processingStart - entry.startTime}ms`);
          }
        });
      });

      // Observe paint metrics
      if ('PerformanceObserver' in window) {
        try {
          observer.observe({ type: 'paint', buffered: true });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
          observer.observe({ type: 'first-input', buffered: true });
          observer.observe({ type: 'layout-shift', buffered: true });
        } catch {
          // Fallback for browsers that don't support all entry types
          console.log('Some performance metrics unavailable');
        }
      }

      // Log Core Web Vitals
      const logWebVitals = () => {
        if ('performance' in window && 'getEntriesByType' in performance) {
          const paintEntries = performance.getEntriesByType('paint');
          const navigationEntries = performance.getEntriesByType('navigation');
          
          console.log('Performance Metrics:', {
            FCP: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
            DOMContentLoaded: navigationEntries[0] ? (navigationEntries[0] as NavigationEntry).domContentLoadedEventEnd - (navigationEntries[0] as NavigationEntry).domContentLoadedEventStart : 0,
            LoadComplete: navigationEntries[0] ? (navigationEntries[0] as NavigationEntry).loadEventEnd - (navigationEntries[0] as NavigationEntry).fetchStart : 0,
          });
        }
      };

      // Log metrics after page load
      setTimeout(logWebVitals, 2000);
    };

    observePerformance();
  }, []);

  return null;
}