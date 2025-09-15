"use client";

import { motion } from "framer-motion";
import { modelNavItems, ctaButtons } from "../model-header.config";
import ModelMobileNavItem from "./mobilenavitem";
import ModelCTAs from "../shared/ModelCTAs";

export default function ModelMobileMenu({ isOpen, onClose, scrollDepth }: { isOpen: boolean; onClose: () => void; scrollDepth: number }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 p-6"
    >
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-4">
          {modelNavItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ModelMobileNavItem item={item} onClose={onClose} />
            </motion.div>
          ))}
        </div>
        <ModelCTAs ctas={ctaButtons} scrollDepth={scrollDepth} />
      </div>
    </motion.div>
  );
}
