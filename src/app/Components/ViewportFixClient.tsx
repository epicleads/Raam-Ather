"use client";

import { useEffect } from 'react';
import { initViewportFix } from '@/lib/viewportFix';

export default function ViewportFixClient() {
  useEffect(() => {
    // Initialize viewport height fix for mobile browsers
    initViewportFix();
  }, []);

  return null; // This component doesn't render anything
}