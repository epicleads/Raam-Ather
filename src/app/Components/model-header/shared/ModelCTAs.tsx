"use client";

import { CTA } from "../model-header.types";

interface ModelCTAsProps {
  ctas: CTA[];
  scrollDepth: number;
}

export default function ModelCTAs({ ctas, scrollDepth }: ModelCTAsProps) {
  return (
    <div className="flex items-center space-x-3">
      {ctas.map((cta) => (
        <button
          key={cta.href}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            cta.variant === "primary"
              ? scrollDepth > 0.5 
                ? "bg-white text-black hover:bg-gray-100 shadow-sm" 
                : "bg-black text-white hover:bg-gray-800 shadow-sm"
              : scrollDepth > 0.5
                ? "border border-white text-white hover:bg-white hover:text-black"
                : "border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          }`}
          onClick={() => {
            // Handle CTA click - could scroll to section or open modal
            console.log(`CTA clicked: ${cta.label}`);
          }}
        >
          {cta.label}
        </button>
      ))}
    </div>
  );
}
