'use client';

import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Add Instagram embed types
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramReelEmbedProps {
  url: string;
  className?: string;
}

export default function InstagramReelEmbed({ url, className = '' }: InstagramReelEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedFailed, setEmbedFailed] = useState(false);
  
  // Extract the reel ID from the URL
  const reelId = url.split('/reel/')[1]?.split('/')[0];
  
  useEffect(() => {
    if (containerRef.current && reelId && !embedFailed) {
      try {
        // Create Instagram embed
        const embed = document.createElement('blockquote');
        embed.className = 'instagram-media';
        embed.setAttribute('data-instgrm-permalink', `https://www.instagram.com/reel/${reelId}/`);
        embed.setAttribute('data-instgrm-version', '14');
        embed.style.cssText = 'background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);';
        
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(embed);
        
        // Try to load Instagram embed script
        if (!window.instgrm) {
          const script = document.createElement('script');
          script.src = 'https://www.instagram.com/embed.js';
          script.async = true;
          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          };
          script.onerror = () => setEmbedFailed(true);
          document.body.appendChild(script);
        } else {
          window.instgrm.Embeds.process();
        }
        
        // Set a timeout to fallback if embed doesn't load
        const timeout = setTimeout(() => {
          if (containerRef.current && containerRef.current.children.length === 0) {
            setEmbedFailed(true);
          }
        }, 3000);
        
        return () => clearTimeout(timeout);
      } catch (error) {
        console.error('Instagram embed failed:', error);
        setEmbedFailed(true);
      }
    }
  }, [reelId, embedFailed]);
  
  if (!reelId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-3 flex items-center justify-center ${className}`}>
        <span className="text-xs text-gray-500">Invalid Instagram URL</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative group ${className}`}
    >
      {/* Instagram Reel Container */}
      <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl overflow-hidden shadow-lg w-full h-full">
        {/* Instagram Branding */}
        <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Instagram size={12} className="text-purple-600" />
          <span className="text-xs font-medium text-purple-600">IG</span>
        </div>
        
        {/* Instagram Embed Container or Fallback */}
        {!embedFailed ? (
          <div 
            ref={containerRef}
            className="w-full h-full flex items-center justify-center"
            style={{ minHeight: '280px' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <Play size={24} className="text-purple-600 ml-1" />
              </div>
              <p className="text-white text-sm font-medium mb-2">Instagram Reel</p>
              <p className="text-white/80 text-xs">Click to view</p>
            </div>
          </div>
        )}
        
        {/* Click to View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl cursor-pointer" />
        
        {/* External Link Indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
            <ExternalLink size={14} className="text-purple-600" />
          </div>
        </div>
      </div>
      
      {/* Click Handler */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label="View Instagram reel"
      />
    </motion.div>
  );
}
