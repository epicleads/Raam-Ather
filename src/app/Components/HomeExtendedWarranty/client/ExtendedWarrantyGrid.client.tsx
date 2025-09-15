"use client";

import { motion } from "framer-motion";
import { WarrantyCard } from "../extended-warranty.types";
import Link from "next/link";
import { Shield, Wrench, Star, Headphones } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  items: WarrantyCard[];
};

const iconMap: Record<string, ReactNode> = {
  shield: <Shield className="w-6 h-6 text-green-600" />,
  wrench: <Wrench className="w-6 h-6 text-green-600" />,
  star: <Star className="w-6 h-6 text-green-600" />,
  headphones: <Headphones className="w-6 h-6 text-green-600" />,
};

export default function ExtendedWarrantyGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-10 px-6 md:px-12 max-w-4xl mx-auto">
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-lg bg-white shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
        >
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
            {iconMap[item.icon] || (
              <Shield className="w-6 h-6 text-green-600" />
            )}
          </div>
          
          <h3 className="font-medium text-gray-900 text-xs text-center mb-1">
            {item.title}
          </h3>
          
          <p className="text-gray-500 text-xs text-center leading-tight">
            {item.description}
          </p>
          
          {item.href && (
            <Link
              href={item.href}
              className="mt-2 text-green-600 text-xs font-medium hover:underline"
            >
              Know More →
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}
