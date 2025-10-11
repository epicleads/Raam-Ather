"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'trail' | 'burst' | 'spark';
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: Array<{x: number, y: number, life: number}>;
}

interface FestiveRocketsProps {
  themeId: 'diwali' | 'christmas-newyear';
  intensity?: 'low' | 'medium' | 'high';
}

const FestiveRockets: React.FC<FestiveRocketsProps> = ({ 
  themeId,
  intensity = 'high'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rockets = useRef<Rocket[]>([]);
  const animationFrameId = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const lastLaunchTime = useRef(0);
  const [isActive, setIsActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Diwali color palettes (vibrant warm colors)
  const diwaliPalettes = [
    ['#FFD700', '#FFA500', '#FF8C00', '#FF6347'],
    ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'],
    ['#00FF00', '#32CD32', '#7FFF00', '#ADFF2F'],
    ['#FF0000', '#FF4500', '#FF6347', '#FF7F50'],
    ['#9370DB', '#BA55D3', '#DA70D6', '#EE82EE'],
    ['#FFD700', '#FFFF00', '#F0E68C', '#FAFAD2']
  ];

  // Christmas/New Year palettes (cool blues, whites, silvers)
  const christmasPalettes = [
    ['#00BFFF', '#1E90FF', '#4169E1', '#87CEEB'],
    ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#B0E0E6'],
    ['#C0C0C0', '#D3D3D3', '#E8E8E8', '#F5F5F5'],
    ['#4169E1', '#6495ED', '#87CEEB', '#ADD8E6'],
    ['#00CED1', '#48D1CC', '#40E0D0', '#7FFFD4'],
    ['#FFD700', '#FFFFFF', '#87CEEB', '#F0F8FF']
  ];

  const palettes = themeId === 'diwali' ? diwaliPalettes : christmasPalettes;

  // Desktop config (more rockets, faster launches)
  const desktopConfig = {
    low: { rocketFrequency: 500, burstSize: 40, maxParticles: 300, rocketsPerBurst: 2 },
    medium: { rocketFrequency: 350, burstSize: 50, maxParticles: 400, rocketsPerBurst: 3 },
    high: { rocketFrequency: 250, burstSize: 60, maxParticles: 600, rocketsPerBurst: 5 }
  }[intensity];

  // Mobile config - lighter for performance but still faster
  const mobileConfig = {
    low: { rocketFrequency: 700, burstSize: 25, maxParticles: 200, rocketsPerBurst: 2 },
    medium: { rocketFrequency: 550, burstSize: 30, maxParticles: 250, rocketsPerBurst: 3 },
    high: { rocketFrequency: 400, burstSize: 35, maxParticles: 350, rocketsPerBurst: 4 }
  }[intensity];

  const config = isMobile ? mobileConfig : desktopConfig;

  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Lower DPR for better performance
      const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25);
      const newDimensions = {
        width: Math.floor(window.innerWidth * DPR),
        height: Math.floor(window.innerHeight * DPR)
      };
      console.log('🎆 Canvas Dimensions Updated:', newDimensions, { mobile, DPR });
      setDimensions(newDimensions);
    };

    updateDimensions();

    // Debounce resize for better performance
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Timer to stop after 8 seconds
  useEffect(() => {
    console.log('🎆 Fireworks Active - will stop in 8 seconds');
    
    const timer = setTimeout(() => {
      console.log('🎆 Fireworks Stopping...');
      setIsActive(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || !isActive) {
      console.log('🎆 Fireworks Check:', { canvas: !!canvas, width: dimensions.width, isActive });
      return;
    }

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    console.log('🎆 Fireworks Canvas Initialized:', {
      width: dimensions.width,
      height: dimensions.height,
      isMobile,
      config
    });

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.globalCompositeOperation = 'lighter';

    // Create a rocket
    const createRocket = () => {
      const startX = Math.random() * canvas.width;
      const targetY = canvas.height * (0.2 + Math.random() * 0.3);
      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      
      const newRocket = {
        x: startX,
        y: canvas.height,
        targetY,
        vx: (Math.random() - 0.5) * 2,
        vy: -8 - Math.random() * 4,
        color: palette[0],
        trail: []
      };
      
      rockets.current.push(newRocket);
      
      if (rockets.current.length === 1) {
        console.log('🎆 First Rocket Launched!', { x: startX, targetY, color: palette[0] });
      }
    };

    // Create firework burst
    const createBurst = (x: number, y: number, color: string) => {
      const palette = palettes.find(p => p[0] === color) || palettes[0];
      const particleCount = config.burstSize;

      // Main burst
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 6;
        const colorIndex = Math.floor(Math.random() * palette.length);
        
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          color: palette[colorIndex],
          size: 2 + Math.random() * 2,
          type: 'burst'
        });
      }

      // Add minimal sparkles
      const sparkCount = isMobile ? 8 : 12;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;

        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          color: '#FFFFFF',
          size: 1,
          type: 'spark'
        });
      }
    };

    // Animation loop with performance optimization
    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Limit particle count for performance
      if (particles.current.length > config.maxParticles) {
        particles.current = particles.current.slice(0, config.maxParticles);
      }

      // Launch multiple rockets - smooth staggered launches
      if (currentTime - lastLaunchTime.current > config.rocketFrequency) {
        const rocketsToLaunch = config.rocketsPerBurst;

        for (let i = 0; i < rocketsToLaunch; i++) {
          setTimeout(() => createRocket(), i * 100);
        }

        lastLaunchTime.current = currentTime;
      }

      // Update and draw rockets
      rockets.current = rockets.current.filter(rocket => {
        rocket.x += rocket.vx;
        rocket.y += rocket.vy;
        rocket.vy += 0.1;

        // Add trail
        rocket.trail.push({ x: rocket.x, y: rocket.y, life: 1 });
        if (rocket.trail.length > 20) rocket.trail.shift();

        // Draw trail
        rocket.trail.forEach((point, index) => {
          point.life -= 0.08;
          if (point.life > 0) {
            const size = (index / rocket.trail.length) * 2;
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `${rocket.color}${Math.floor(point.life * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
          }
        });

        // Draw rocket
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = rocket.color;
        ctx.fill();

        // Explode when reaching target
        if (rocket.y <= rocket.targetY) {
          createBurst(rocket.x, rocket.y, rocket.color);
          return false;
        }

        return rocket.y < canvas.height;
      });

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.1;
        particle.vx *= 0.98;

        particle.life -= 0.015;

        if (particle.life > 0) {
          const alpha = Math.floor(particle.life * 255).toString(16).padStart(2, '0');

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + alpha;
          ctx.fill();

          return true;
        }
        return false;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, config, palettes, isActive, isMobile]);

  if (!isActive) {
    console.log('🎆 Fireworks Inactive - Not Rendering');
    return null;
  }

  console.log('🎆 Fireworks Rendering Canvas');

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default FestiveRockets;

