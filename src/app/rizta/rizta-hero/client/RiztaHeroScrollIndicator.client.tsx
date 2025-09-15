"use client";

import { motion } from "framer-motion";

export function RiztaHeroScrollIndicator({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
    >
      <div className="flex flex-col items-center text-white">
        <span className="text-xs mb-1">Scroll</span>
        <div className="w-1 h-6 bg-white/60 rounded-full animate-bounce" />
      </div>
    </motion.div>
  );
}
