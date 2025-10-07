'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const AtherWhyChooseUsCube = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const cubeRef = useRef<HTMLDivElement | null>(null);
  const previousTouchRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateIntervalRef = useRef<number | null>(null);

  // Ather dealership features with 6 images
  const atherFeatures = [
    {
      title: "Authorized Dealer of Ather Energy - Raam Ather",
      imageSrc: "/assets/why_choose_us/1.png",
      alt: "Authorized Ather Dealer"
    },
    {
      title: "100% Secure Transactions & Safe Payments",
      imageSrc: "/assets/why_choose_us/2.png",
      alt: "Secure Transactions"
    },
    {
      title: "Express Service Care & Maintenance Support",
      imageSrc: "/assets/why_choose_us/3.png",
      alt: "Express Service Care"
    },
    {
      title: "Convenient Delivery of Vehicle at Your Doorstep",
      imageSrc: "/assets/why_choose_us/4.png",
      alt: "Doorstep Delivery"
    },
    {
      title: "Expert Support & Customer Assistance Always",
      imageSrc: "/assets/why_choose_us/5.png",
      alt: "Expert Support"
    },
    {
      title: "Extended Warranty & Comprehensive Coverage",
      imageSrc: "/assets/why_choose_us/6.png",
      alt: "Extended Warranty"
    }
  ];

  const updateCubeRotation = useCallback(() => {
    if (cubeRef.current) {
      const transformValue = `translateZ(0) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      cubeRef.current.style.transform = transformValue;
      // WebKit/Safari explicit transform for reliable 3D on mobile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cubeRef.current.style as any).webkitTransform = transformValue;
    }
  }, [rotationX, rotationY]);

  const startAutoRotate = () => {
    const animate = () => {
      setRotationY(prev => prev + 0.5);
      autoRotateIntervalRef.current = requestAnimationFrame(animate);
    };
    autoRotateIntervalRef.current = requestAnimationFrame(animate);
  };

  const stopAutoRotate = () => {
    if (autoRotateIntervalRef.current !== null) {
      cancelAnimationFrame(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (autoRotate) {
      startAutoRotate();
    }
    return () => stopAutoRotate();
  }, [autoRotate]);

  useEffect(() => {
    updateCubeRotation();
  }, [rotationX, rotationY, updateCubeRotation]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent<HTMLDivElement>).clientY;
    previousTouchRef.current = { x: clientX, y: clientY };

    if (autoRotate) {
      setAutoRotate(false);
      stopAutoRotate();
    }
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent<HTMLDivElement>).clientY;

    const deltaX = clientX - previousTouchRef.current.x;
    const deltaY = clientY - previousTouchRef.current.y;

    setRotationY(prev => prev + deltaX * 0.8);
    setRotationX(prev => prev - deltaY * 0.8);

    previousTouchRef.current = { x: clientX, y: clientY };

    if ('touches' in e) {
      e.preventDefault();
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };


  return (
    <div className="w-full min-h-screen pt-0 pb-20 relative overflow-hidden text-white">
      {/* AI Generated Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/why_choose_us/whychooseusbg2.png"
          alt="Futuristic Showroom Background"
          fill
          className="object-cover object-center"
          quality={90}
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Section Title */}
      <div className="absolute z-10 top-32 md:top-24 left-0 right-0 flex flex-col items-center pointer-events-none">
        <h1 className="text-white text-3xl md:text-5xl font-black tracking-wider uppercase drop-shadow-[0_4px_20px_rgba(34,197,94,0.6)] px-4 text-center filter brightness-110">
          Why Choose RAAM ATHER
        </h1>
        <div className="mt-2 h-1.5 w-32 md:w-44 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col justify-end items-center min-h-[75vh] md:min-h-[85vh] gap-4 md:gap-8 pb-6 md:pb-8">
        {/* Scene Container */}
        <div className="scene">
          <div
            ref={cubeRef}
            className="cube"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >

            {/* Front Face */}
            <div className="cube-face front">
              <div className="content">
                <div className="icon-container">
                  <Image src={atherFeatures[0].imageSrc} alt={atherFeatures[0].alt} width={200} height={200} className="feature-image" />
                </div>
                <div className="text-block">
                  <h2>{atherFeatures[0].title}</h2>
                </div>
              </div>
            </div>

            {/* Back Face */}
            <div className="cube-face back">
              <div className="content">
                <div className="icon-container">
                  <Image src={atherFeatures[1].imageSrc} alt={atherFeatures[1].alt} width={200} height={200} className="feature-image" />
                </div>
                <div className="text-block">
                  <h2>{atherFeatures[1].title}</h2>
                </div>
              </div>
            </div>

            {/* Right Face */}
            <div className="cube-face right">
              <div className="content">
                <div className="icon-container">
                  <Image src={atherFeatures[2].imageSrc} alt={atherFeatures[2].alt} width={200} height={200} className="feature-image" />
                </div>
                <div className="text-block">
                  <h2>{atherFeatures[2].title}</h2>
                </div>
              </div>
            </div>

            {/* Left Face */}
            <div className="cube-face left">
              <div className="content">
                <div className="icon-container">
                  <Image src={atherFeatures[3].imageSrc} alt={atherFeatures[3].alt} width={200} height={200} className="feature-image" />
                </div>
                <div className="text-block">
                  <h2>{atherFeatures[3].title}</h2>
                </div>
              </div>
            </div>

            {/* Top Face */}
            <div className="cube-face top">
              <div className="content">
                <div className="icon-container">
                  <Image src={atherFeatures[4].imageSrc} alt={atherFeatures[4].alt} width={200} height={200} className="feature-image" />
                </div>
                <div className="text-block">
                  <h2>{atherFeatures[4].title}</h2>
                </div>
              </div>
            </div>

            {/* Bottom Face */}
            <div className="cube-face bottom mirror-effect">
              <div className="content">
                <div className="icon-container">
                  <Image src={atherFeatures[5].imageSrc} alt={atherFeatures[5].alt} width={200} height={200} className="feature-image" />
                </div>
                <div className="text-block">
                  <h2>{atherFeatures[5].title}</h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
        }

        /* Scene */
        .scene {
          width: 250px;
          height: 250px;
          perspective: 1000px;
          -webkit-perspective: 1000px; /* iOS Safari */
          margin: 0 auto;
          /* Do NOT transform the perspective element; it breaks perspective on iOS */
          perspective-origin: 50% 50%;
          position: relative;
          z-index: 20;
        }

        @media (min-width: 768px) {
          .scene {
            width: 320px;
            height: 320px;
          }
        }

        /* Cube */
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d; /* iOS Safari */
          transform: translateZ(0) rotateX(0deg) rotateY(0deg);
          -webkit-transform: translateZ(0) rotateX(0deg) rotateY(0deg);
          cursor: grab;
          touch-action: none;
          will-change: transform;
          z-index: 21;
        }

        .cube:active {
          cursor: grabbing;
        }

        /* Cube Faces */
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden; /* iOS Safari */
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid rgba(34, 197, 94, 0.4);
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
          background: rgba(0, 0, 0, 0.8);
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d; /* iOS Safari */
          transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
          transition: all 0.3s ease;
        }

        .cube-face:hover {
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.8);
        }

        .front { transform: translateZ(125px); }
        .back { transform: rotateY(180deg) translateZ(125px); }
        .right { transform: rotateY(90deg) translateZ(125px); }
        .left { transform: rotateY(-90deg) translateZ(125px); }
        .top { transform: rotateX(90deg) translateZ(125px); }
        .bottom { transform: rotateX(-90deg) translateZ(125px); }
        .back, .right, .left, .top, .bottom { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }

        @media (min-width: 768px) {
          .front { transform: translateZ(160px); }
          .back { transform: rotateY(180deg) translateZ(160px); }
          .right { transform: rotateY(90deg) translateZ(160px); }
          .left { transform: rotateY(-90deg) translateZ(160px); }
          .top { transform: rotateX(90deg) translateZ(160px); }
          .bottom { transform: rotateX(-90deg) translateZ(160px); }
        }

        /* Content inside faces */
        .content {
          width: 90%;
          height: 90%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          padding: 8px;
          background: rgba(20, 30, 40, 0.7);
          border-radius: 8px;
          transform: translateZ(1px);
          -webkit-transform: translateZ(1px);
        }

        /* Icon container */
        .icon-container {
          position: relative;
          width: 180px;
          height: 180px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          background: rgba(34, 197, 94, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(34, 197, 94, 0.3);
        }

        .feature-image {
          object-fit: contain;
        }

        /* Headings */
        .text-block {
          flex-shrink: 0;
          padding: 8px 10px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 6px;
          margin-top: 8px;
          width: 100%;
        }

        h2 {
          margin: 2px 0;
          color: #ffffff;
          text-shadow: 0 0 5px rgba(34, 197, 94, 0.25);
          font-size: 0.95rem;
        }

        /* Mirror Effect */
        .mirror-effect {
          position: relative;
          overflow: hidden;
        }

        .mirror-effect:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0) 50%);
          pointer-events: none;
          z-index: 1;
          animation: mirror 8s ease-in-out infinite alternate;
        }

        @keyframes mirror {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }

        /* Mobile optimizations */
        @media (max-width: 767px) {
          .scene {
            width: 260px;
            height: 260px;
          }

          .front { transform: translateZ(130px); }
          .back { transform: rotateY(180deg) translateZ(130px); }
          .right { transform: rotateY(90deg) translateZ(130px); }
          .left { transform: rotateY(-90deg) translateZ(130px); }
          .top { transform: rotateX(90deg) translateZ(130px); }
          .bottom { transform: rotateX(-90deg) translateZ(130px); }
          .back, .right, .left, .top, .bottom { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }

          .icon-container {
            width: 160px;
            height: 160px;
          }

          .text-block {
            padding: 6px 8px;
            margin-top: 6px;
          }

          h2 {
            font-size: 0.75rem;
            line-height: 1.1;
          }
        }

        /* Small mobile optimizations */
        @media (max-width: 374px) {
          .scene {
            width: 220px;
            height: 220px;
          }

          .front { transform: translateZ(110px); }
          .back { transform: rotateY(180deg) translateZ(110px); }
          .right { transform: rotateY(90deg) translateZ(110px); }
          .left { transform: rotateY(-90deg) translateZ(110px); }
          .top { transform: rotateX(90deg) translateZ(110px); }
          .bottom { transform: rotateX(-90deg) translateZ(110px); }
          .back, .right, .left, .top, .bottom { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }

          .icon-container {
            width: 140px;
            height: 140px;
          }

          .text-block {
            padding: 4px 6px;
            margin-top: 4px;
          }

          h2 {
            font-size: 0.7rem;
            line-height: 1.0;
          }
        }
      `}</style>
    </div>
  );
};

export default AtherWhyChooseUsCube;
