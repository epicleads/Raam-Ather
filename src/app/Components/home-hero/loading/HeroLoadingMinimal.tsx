import React from 'react';

interface HeroLoadingMinimalProps {
  message?: string;
}

export function HeroLoadingMinimal({ message = "Loading..." }: HeroLoadingMinimalProps) {
  return (
    <section 
      className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center"
      aria-label="Loading hero content"
      role="banner"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {/* Spinner */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
        
        {/* Brand Text */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-pulse">
            Raam Ather
          </h1>
          <p className="text-white/80 text-sm md:text-base animate-pulse delay-300">
            {message}
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Custom styles for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

export default HeroLoadingMinimal;
