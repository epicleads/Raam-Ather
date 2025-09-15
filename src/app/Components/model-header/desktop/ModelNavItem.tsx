"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { NavItem } from "../model-header.types";

export default function ModelNavItem({
  item,
  isActive,
  onClick,
  scrollDepth,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  scrollDepth: number;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`relative px-4 py-3 text-sm font-medium transition-all duration-200 ${
        isActive 
          ? "text-[#00FF66]" 
          : scrollDepth > 0.5 
            ? "text-gray-300 hover:text-white" 
            : "text-gray-700 hover:text-gray-900"
      }`}
    >
      {item.label}
      
      {/* Active/Hover Underline */}
      {(hover || isActive) && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FF66]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
        />
      )}
    </button>
  );
}
