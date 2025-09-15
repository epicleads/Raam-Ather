"use client";
import { Instagram, ExternalLink } from 'lucide-react';
import { useState } from 'react';
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
        
        @media (max-width: 1023px) {
          .social-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 180px);
            gap: 12px;
            padding: 16px;
          }
        }
        
        @media (max-width: 639px) {
          .social-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(6, 160px);
            gap: 8px;
            padding: 12px;
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
        
                 /* Responsive adjustments */
         @media (max-width: 1023px) {
           .tile-featured {
             grid-column: 1 / span 2;
             grid-row: 1 / span 2;
           }
           .tile-awards {
             grid-column: 3 / span 1;
             grid-row: 1 / span 2;
           }
           .tile-chennai {
             grid-column: 1 / span 1;
             grid-row: 3 / span 2;
           }
           .tile-quick {
             grid-column: 2 / span 1;
             grid-row: 3 / span 1;
           }
           .tile-community {
             grid-column: 1 / span 2;
             grid-row: 5 / span 1;
           }
           .tile-ather {
             grid-column: 3 / span 1;
             grid-row: 5 / span 1;
           }
         }
         
         @media (max-width: 639px) {
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
             grid-column: 1 / span 1;
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
        
        .collage-tile:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
          border-color: #4ade80;
          z-index: 10;
        }
        
        .collage-tile img,
        .collage-tile video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        
        .collage-tile:hover img,
        .collage-tile:hover video {
          transform: scale(1.08);
        }
        
        /* Tile overlays */
        .tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 0, 0, 0.8) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
        }
        
        .collage-tile:hover .tile-overlay {
          opacity: 1;
        }
        
        /* Badges and labels */
        .tile-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: white;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
          z-index: 3;
        }
        
        .tile-instagram {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #E1306C, #F56040, #F77737);
          padding: 10px;
          border-radius: 12px;
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(225, 48, 108, 0.3);
          z-index: 3;
        }
        
        .collage-tile:hover .tile-instagram {
          opacity: 1;
          transform: translateY(-2px);
        }

        /* Click indicator overlay */
        .collage-tile::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .collage-tile:hover::before {
          opacity: 1;
        }

        .collage-tile::after {
          content: '👆 Click to view';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 2;
          white-space: nowrap;
        }

        .collage-tile:hover::after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        
        .tile-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          color: white;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }
        
        .collage-tile:hover .tile-content {
          transform: translateY(0);
        }
        
        .tile-content h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        
        .tile-content p {
          font-size: 12px;
          opacity: 0.9;
          line-height: 1.4;
          margin-bottom: 12px;
        }
        
        .tile-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .tile-link:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }
      `}</style>
      
      <section id="social-moments" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
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
            className="tile-featured collage-tile cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
          />
            <div className="tile-badge">Community</div>
            <div className="tile-instagram">
              <Instagram size={16} className="text-white" />
            </div>
            <div className="tile-content">
              <h4>Community Stories</h4>
              <p>Join thousands of Ather riders sharing their journey</p>
            <a
              href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
                className="tile-link"
            >
                <span>Join Community</span>
                <ExternalLink size={10} />
            </a>
          </div>
        </div>

                  {/* Ather Official - Tall vertical (spans 1x2) */}
        <div 
          className="tile-awards collage-tile cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
          />
          <div className="tile-badge">Chennai</div>
          <div className="tile-instagram">
            <Instagram size={16} className="text-white" />
            </div>
          <div className="tile-content">
            <h4>Chennai Moments</h4>
            <p>Behind the scenes and Chennai Ather content</p>
            <a
              href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="tile-link"
            >
              <span>Watch Chennai</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

          {/* Chennai Reel - Tall vertical (spans 1x2) */}
          <div 
            className="tile-chennai collage-tile cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
            autoPlay
            muted
            loop
            playsInline
              controls={false}
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="tile-badge">Hyderabad</div>
            <div className="tile-instagram">
              <Instagram size={14} className="text-white" />
            </div>
            <div className="tile-content">
              <h4>Hyderabad Rides</h4>
              <p>Experience the Ather journey across Hyderabad streets</p>
            <a
              href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
                className="tile-link"
            >
                <span>Watch Reel</span>
                <ExternalLink size={8} />
            </a>
          </div>
        </div>

          {/* Quick - Small square */}
          <div 
            className="tile-quick collage-tile cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
          />
            <div className="tile-badge">Quick</div>
            <div className="tile-instagram">
              <Instagram size={14} className="text-white" />
            </div>
          </div>

                                                                                                                                       {/* Featured Order - Full width bottom row */}
              <div 
                className="tile-community collage-tile cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
              <div className="tile-badge">Featured</div>
              <div className="tile-instagram">
                <Instagram size={16} className="text-white" />
              </div>
              <div className="tile-content">
                <h4>Delivery Day Joy</h4>
                <p>Celebrate your Ather delivery moments with our community</p>
                <a
                  href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tile-link"
                >
                  <span>View on Instagram</span>
                  <ExternalLink size={10} />
                </a>
            </div>
          </div>

           

           {/* Awards - Moved to bottom right */}
          <div 
            className="tile-empty collage-tile cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
            <div className="tile-badge">Awards</div>
            <div className="tile-instagram">
              <Instagram size={16} className="text-white" />
            </div>
            <div className="tile-content">
              <h4>Excellence Recognized</h4>
              <p>Celebrating achievements in electric mobility innovation</p>
            <a
              href="https://www.instagram.com/atherhyderbad_raamgroup/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
                className="tile-link"
            >
              <span>View on Instagram</span>
                <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
        <div className="text-center bg-white backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-sm mt-10">
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
      <div className="flex justify-center mt-8">
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