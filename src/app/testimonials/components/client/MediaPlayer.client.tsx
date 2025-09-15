'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MediaPlayerProps {
  src: string;
  type: 'video' | 'audio';
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function MediaPlayer({ 
  src, 
  type, 
  poster, 
  className = '', 
  autoPlay = false, 
  muted = true, 
  loop = false 
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  // Update state when props change
  useEffect(() => {
    setIsPlaying(autoPlay);
    setIsMuted(muted);
  }, [autoPlay, muted]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDuration = () => setDuration(media.duration);
    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
    };

    media.addEventListener('timeupdate', updateTime);
    media.addEventListener('loadedmetadata', updateDuration);
    media.addEventListener('ended', handleEnded);

    // Handle autoplay
    if (autoPlay && type === 'video') {
      media.play().catch(() => {
        // Autoplay failed, keep muted state
        setIsMuted(true);
      });
    }

    return () => {
      media.removeEventListener('timeupdate', updateTime);
      media.removeEventListener('loadedmetadata', updateDuration);
      media.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, loop, type]);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media) return;

    media.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const media = mediaRef.current;
    if (!media || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    media.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (type === 'video') {
    return (
      <div className={`relative group ${className}`}>
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={src}
          poster={poster}
          muted={muted}
          preload="metadata"
          autoPlay={autoPlay}
          loop={loop}
          className="w-full h-full object-cover rounded-lg"
          onClick={togglePlay}
        />
        
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={togglePlay}
              className="bg-black/50 backdrop-blur-sm rounded-full p-4 text-white hover:bg-black/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-white hover:text-[#00E396] transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <div className="flex-1 flex items-center gap-2 text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <div 
                className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="bg-[#00E396] h-1 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Audio Player with Waveform UI
  return (
    <div className={`bg-gray-900 rounded-lg p-4 ${className}`}>
      <audio
        ref={mediaRef as React.RefObject<HTMLAudioElement>}
        src={src}
        muted={isMuted}
        preload="metadata"
      />

      <div className="flex items-center gap-4">
        <motion.button
          onClick={togglePlay}
          className="bg-[#00E396] text-black rounded-full p-3 hover:bg-[#00E396]/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <div className="flex-1">
          {/* Animated Waveform */}
          <div className="flex items-center gap-1 h-8 mb-2">
            {Array.from({ length: 40 }, (_, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-t from-[#00E396] to-[#00E396]/30 w-1 rounded-full"
                initial={{ height: 8 }}
                animate={{
                  height: isPlaying 
                    ? [8, 16, 8]
                    : i < (progress / 100) * 40 ? 16 : 8
                }}
                transition={{
                  duration: isPlaying ? 0.5 : 0,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.05
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div 
            className="bg-gray-700 rounded-full h-1 cursor-pointer mb-2"
            onClick={handleSeek}
          >
            <div 
              className="bg-[#00E396] h-1 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-[#00E396] transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}