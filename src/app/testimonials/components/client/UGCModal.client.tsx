'use client';

import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';

interface UGCModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    src: string;
    type: 'image' | 'video';
    title: string;
    description?: string;
    badge?: string;
  } | null;
}

export default function UGCModal({ isOpen, onClose, content }: UGCModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(false);
      setIsMuted(true);
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef) {
        videoRef.pause();
        setIsPlaying(false);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, videoRef]);

  useEffect(() => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.pause();
      }
    }
  }, [isPlaying, videoRef]);

  const handleVideoClick = () => {
    if (content?.type === 'video') {
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    console.error('Failed to load video:', content?.src);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !content) return null;

  return (
         <div
       className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
       onClick={onClose}
       onKeyDown={handleKeyDown}
       tabIndex={-1}
       style={{ padding: '0.5rem' }}
     >
               <div
          className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ 
            maxHeight: 'calc(100vh - 2rem)',
            width: content.type === 'image' ? 'auto' : 'min(90vw, 600px)',
            maxWidth: content.type === 'image' ? '90vw' : '600px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
                 {/* Header */}
         <div className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
           <div className="min-w-0 flex-1">
             <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
               {content.title}
             </h3>
             {content.description && (
               <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                 {content.description}
               </p>
             )}
           </div>
           <button
             onClick={onClose}
             className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 ml-2"
             aria-label="Close modal"
           >
             <X size={18} className="text-gray-600" />
           </button>
         </div>

                 {/* Content */}
         <div className="relative flex-1 min-h-0 flex items-center justify-center p-1">
           {content.type === 'image' ? (
             <Image
               src={content.src}
               alt={content.title}
               className="max-h-[70vh] object-contain"
               width={800}
               height={600}
               style={{ maxWidth: '100%', height: 'auto' }}
             />
           ) : (
                                                   <div className="relative w-full h-full flex items-center justify-center">
                {isLoading && (
                  <div className="flex items-center justify-center h-48 sm:h-64 bg-gray-100">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#4ade80]"></div>
                  </div>
                )}
                                 <video
                   ref={setVideoRef}
                   src={content.src}
                   className={`max-h-[70vh] object-contain cursor-pointer ${isLoading ? 'hidden' : 'block'}`}
                   style={{ maxWidth: '100%' }}
                   onClick={handleVideoClick}
                   onLoadedData={handleVideoLoad}
                   onError={handleVideoError}
                   muted={isMuted}
                   loop
                   playsInline
                 />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying && (
                  <button
                    onClick={handleVideoClick}
                    className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all transform hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play size={32} className="ml-1" />
                  </button>
                )}
              </div>

                             {/* Video Controls Bar */}
               <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <button
                  onClick={handleVideoClick}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                {content.badge && (
                  <span className="ml-auto bg-[#4ade80] text-black px-3 py-1 rounded-full text-sm font-medium">
                    {content.badge}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

                 {/* Footer Actions */}
         <div className="p-2 sm:p-3 bg-gray-50 border-t border-gray-200 flex-shrink-0">
           <div className="flex flex-col sm:flex-row gap-2 justify-center">
             <a
               href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:shadow-lg text-xs sm:text-sm"
             >
               <span>Follow @raamather</span>
             </a>
             
             <button
               onClick={onClose}
               className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm"
             >
               Close
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}
