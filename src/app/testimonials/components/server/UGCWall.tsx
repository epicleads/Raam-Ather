"use client";
import { Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import UGCModal from '../client/UGCModal.client';
import Image from 'next/image';

export default function UGCWall() {
  const [modalContent, setModalContent] = useState<{
    src: string;
    type: 'image' | 'video';
    title: string;
    description?: string;
    badge?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 767);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Intersection Observer for video performance optimization
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.3
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(() => {
              // Silently handle autoplay restrictions
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all videos after component mounts
    setTimeout(() => {
      const videos = document.querySelectorAll('#social-moments video');
      videos.forEach(video => observer.observe(video));
    }, 100);

    return () => observer.disconnect();
  }, []);

  // Handle user interaction to enable autoplay if restricted
  useEffect(() => {
    const enableAutoplay = () => {
      const videos = document.querySelectorAll('#social-moments video');
      videos.forEach((video) => {
        const videoElement = video as HTMLVideoElement;
        if (videoElement.paused) {
          videoElement.play().catch(() => {
            // Silently handle if still restricted
          });
        }
      });
    };

    // Try to play videos on first user interaction
    document.addEventListener('touchstart', enableAutoplay, { once: true });
    document.addEventListener('click', enableAutoplay, { once: true });

    return () => {
      document.removeEventListener('touchstart', enableAutoplay);
      document.removeEventListener('click', enableAutoplay);
    };
  }, []);

  const openModal = (content: typeof modalContent) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  return (
    <>
      <style jsx>{`
        .social-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 200px);
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        
        /* TABLET SPECIFIC LAYOUT - 768px to 1023px ONLY */
        @media (min-width: 768px) and (max-width: 1023px) {
          .social-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(5, 200px);
            gap: 8px;
            padding: 0;
            border-radius: 0;
          }

          .tile-featured {
            grid-column: 1 / span 2;
            grid-row: 1 / span 1;
          }
          .tile-awards {
            grid-column: 1 / span 1;
            grid-row: 2 / span 1;
          }
          .tile-chennai {
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
          }
          .tile-quick {
            grid-column: 1 / span 1;
            grid-row: 3 / span 1;
          }
          .tile-community {
            grid-column: 2 / span 1;
            grid-row: 3 / span 1;
          }
          .tile-ather {
            grid-column: 1 / span 2;
            grid-row: 4 / span 1;
          }
        }

        @media (max-width: 767px) {
          .social-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(6, 160px);
            gap: 4px;
            padding: 0;
            touch-action: pan-y;
            overflow: visible;
            border-radius: 0;
          }
        }
        
        /* Featured Order - Large horizontal (spans 2x2) */
        .tile-featured {
          grid-column: 1 / span 2;
          grid-row: 1 / span 2;
        }
        
        /* Awards - Tall vertical (spans 1x2) */
        .tile-awards {
          grid-column: 3 / span 1;
          grid-row: 1 / span 2;
        }
        
        /* Chennai Reel - Tall vertical (spans 1x2) */
        .tile-chennai {
          grid-column: 4 / span 1;
          grid-row: 1 / span 2;
        }
        
        /* Quick - Small square */
        .tile-quick {
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
        }
        
                 /* Featured Order - Full width bottom row (spans 2x1) */
         .tile-community {
           grid-column: 2 / span 2;
           grid-row: 3 / span 1;
         }
         
         /* Ather Official - Small square */
         .tile-ather {
           grid-column: 4 / span 1;
           grid-row: 3 / span 1;
         }
        
         
         @media (max-width: 767px) {
           .tile-featured {
             grid-column: 1 / span 2;
             grid-row: 1 / span 2;
           }
           .tile-awards {
             grid-column: 1 / span 1;
             grid-row: 3 / span 2;
           }
           .tile-chennai {
             grid-column: 2 / span 1;
             grid-row: 3 / span 2;
           }
           .tile-quick {
             grid-column: 1 / span 1;
             grid-row: 5 / span 1;
           }
           .tile-community {
             grid-column: 1 / span 2;
             grid-row: 5 / span 1;
           }
           .tile-ather {
             grid-column: 1 / span 2;
             grid-row: 6 / span 1;
           }
         }
        
        /* Individual tile styling */
        .collage-tile {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          background: white;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        
        /* Only apply hover effects on desktop */
        @media (min-width: 1024px) {
          .collage-tile:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
            border-color: #4ade80;
            z-index: 10;
          }
        }
        
        .collage-tile img,
        .collage-tile video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Performance optimizations for videos */
        .collage-tile video {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          image-rendering: optimizeSpeed;
          image-rendering: -webkit-optimize-contrast;
        }

        /* Mobile video handling to prevent scroll interference */
        @media (max-width: 767px) {
          .collage-tile video {
            pointer-events: none;
            touch-action: pan-y;
          }

          #social-moments {
            touch-action: pan-y;
            overflow: visible;
          }

          .collage-tile {
            touch-action: pan-y;
          }
        }
        
        /* Only apply image/video scaling on desktop hover */
        @media (min-width: 1024px) {
          .collage-tile:hover img,
          .collage-tile:hover video {
            transform: scale(1.08);
          }
        }
        

      `}</style>
      
      <section id="social-moments" className="w-full max-w-none md:max-w-7xl mx-auto px-0 md:px-4 lg:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                       Social <span className="text-[#4ade80]">Moments</span>
        </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          Real riders sharing their Ather journey on social media
        </p>
      </div>

        {/* Clean 3x4 Grid Layout */}
        <div className="social-grid">
          {/* Community Video - Large horizontal (spans 2x2) */}
          <div
            className="tile-featured collage-tile cursor-pointer lg:hover:scale-[1.02] transition-transform duration-300"
            onClick={() => openModal({
              src: "/Ather-Assets/thumbnails/smgrid6.mp4",
              type: "video",
              title: "Community Stories",
              description: "Join thousands of Ather riders sharing their journey",
              badge: "Community"
            })}
          >
          <video
            src="/Ather-Assets/thumbnails/smgrid6.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
          />
        </div>

                  {/* Ather Official - Tall vertical (spans 1x2) */}
        <div
          className="tile-awards collage-tile cursor-pointer lg:hover:scale-[1.02] transition-transform duration-300"
          onClick={() => openModal({
            src: "/Ather-Assets/thumbnails/smgrid2.mp4",
            type: "video",
            title: "Official Moments",
            description: "Behind the scenes and official Ather content",
            badge: "Ather Official"
          })}
        >
          <video
            src="/Ather-Assets/thumbnails/smgrid2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
          />
        </div>

          {/* Chennai Reel - Tall vertical (spans 1x2) */}
          <div
            className="tile-chennai collage-tile cursor-pointer lg:hover:scale-[1.02] transition-transform duration-300"
            onClick={() => openModal({
              src: "/Ather-Assets/thumbnails/smgrid3.mp4",
              type: "video",
              title: "Chennai Rides",
              description: "Experience the Ather journey across Chennai streets",
              badge: "Chennai Reel"
            })}
          >
          <video
              src="/Ather-Assets/thumbnails/smgrid3.mp4"
            autoPlay={!isMobile}
            muted
            loop
            playsInline
              controls={false}
              preload="metadata"
              className="w-full h-full object-cover"
              style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
            />
        </div>

          {/* Quick - Small square */}
          <div
            className="tile-quick collage-tile cursor-pointer lg:hover:scale-[1.02] transition-transform duration-300"
            onClick={() => openModal({
              src: "/Ather-Assets/thumbnails/smgrid1.mp4",
              type: "video",
              title: "Quick Ather Moment",
              description: "Capture the essence of electric mobility",
              badge: "Quick"
            })}
          >
          <video
              src="/Ather-Assets/thumbnails/smgrid1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
          />
          </div>

                                                                                                                                       {/* Featured Order - Full width bottom row */}
              <div
                className="tile-community collage-tile cursor-pointer lg:hover:scale-[1.02] transition-transform duration-300"
                onClick={() => openModal({
                  src: "/Ather-Assets/thumbnails/smgrid4.jpg",
                  type: "image",
                  title: "Delivery Day Joy",
                  description: "Celebrate your Ather delivery moments with our community",
                  badge: "Featured"
                })}
              >
                <Image
                  src="/Ather-Assets/thumbnails/smgrid4.jpg"
                  alt="Receiving Ather order - Customer delivery moment"
                  className="w-full h-full object-cover object-bottom"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
          </div>

           

           {/* Awards - Moved to bottom right */}
          <div
            className="tile-ather collage-tile cursor-pointer lg:hover:scale-[1.02] transition-transform duration-300"
            onClick={() => openModal({
              src: "/Ather-Assets/thumbnails/smgrid5.jpg",
              type: "image",
              title: "Excellence Recognized",
              description: "Celebrating achievements in electric mobility innovation",
              badge: "Awards"
            })}
          >
            <Image
              src="/Ather-Assets/thumbnails/smgrid5.jpg"
              alt="Ather Awards and Recognition"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover"
            />
        </div>
      </div>

      {/* Call to Action */}
        <div className="text-center bg-white backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-sm mt-10 mx-4 md:mx-0">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Share Your Ather Story
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Tag us <span className="text-[#4ade80] font-semibold">@raamather</span> in your posts and get featured on our social wall!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 hover:shadow-lg"
          >
            <Instagram size={20} />
            <span>Follow @raamather</span>
          </a>
          
          
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['#RaamAther', '#AtherLife', '#ElectricRide', '#SustainableMobility', '#AtherCommunity'].map((hashtag) => (
            <span
              key={hashtag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#4ade80] hover:text-black transition-colors cursor-pointer"
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>

      {/* Social Stats */}
      <div className="flex justify-center mt-8 px-4 md:px-0">
        <div className="flex items-center gap-8 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#4ade80]">📸</span>
            <span>500+ posts this month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4ade80]">❤️</span>
            <span>25K+ community likes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4ade80]">🌟</span>
            <span>Featured weekly</span>
          </div>
        </div>
      </div>
    </section>

      {/* UGC Modal */}
      <UGCModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
      />
    </>
  );
}