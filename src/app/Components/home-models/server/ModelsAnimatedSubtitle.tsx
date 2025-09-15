'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ModelsAnimatedSubtitleProps {
  text: string;
}

export default function ModelsAnimatedSubtitle({ text }: ModelsAnimatedSubtitleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setCurrentIndex(0);
          setDisplayedText('');
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('models-animated-subtitle');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < text.length) {
      const delay = text[currentIndex] === ' ' ? 80 : 50; // Faster for models section
      
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, isVisible]);

  return (
    <div id="models-animated-subtitle" className="min-h-[3rem] flex items-center justify-center w-full">
      <div className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-neurial leading-relaxed text-center flex flex-wrap items-center justify-center gap-x-2">
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.04,
              ease: [0.25, 0.25, 0, 1]
            }}
            className={`inline-block ${
              char === '.' || char === ',' ? 'text-green-600 font-bold' : ''
            } ${
              // Highlight key words
              (() => {
                const keywords = ['precision', 'engineered', 'intelligently', 'crafted', 'pinnacle', 'electric', 'innovation'];
                const beforeChar = displayedText.substring(0, index);
                const afterChar = displayedText.substring(index + 1);
                const currentWord = (beforeChar.split(/\s/).pop() + char + afterChar.split(/\s/)[0]).toLowerCase().replace(/[.,]/g, '');
                return keywords.includes(currentWord) ? 'text-green-600 font-semibold' : '';
              })()
            } ${char === ' ' ? 'w-2' : ''}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        
        {/* Animated Cursor */}
        <motion.span
          animate={{ 
            opacity: currentIndex < text.length ? [1, 0, 1] : 0
          }}
          transition={{ 
            duration: 0.6, 
            repeat: currentIndex < text.length ? Infinity : 0,
            ease: 'linear'
          }}
          className="inline-block w-0.5 h-6 md:h-7 lg:h-8 bg-green-600 ml-0.5"
        />
      </div>
    </div>
  );
}