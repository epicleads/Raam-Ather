"use client";

import React, { useState, useEffect } from 'react';
import FestiveRockets from './FestiveRockets';

const FestiveRocketsWrapper: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('🎆 Fireworks Wrapper Mounted - Starting in 500ms');
    
    // Small delay to let page load
    const timer = setTimeout(() => {
      console.log('🎆 Fireworks Starting Now!');
      setMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log('🎆 Rendering Fireworks Component');

  return (
    <FestiveRockets
      themeId="diwali"
      intensity="high"
    />
  );
};

export default FestiveRocketsWrapper;

