"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQClientProps {
  faqData: FAQItem[];
}

export default function FAQClient({ faqData }: FAQClientProps) {
  // Split data into two columns
  const midIndex = Math.ceil(faqData.length / 2);
  const leftColumn = faqData.slice(0, midIndex);
  const rightColumn = faqData.slice(midIndex);

  // Independent open states
  const [openLeft, setOpenLeft] = useState<boolean[]>(
    Array(leftColumn.length).fill(false)
  );
  const [openRight, setOpenRight] = useState<boolean[]>(
    Array(rightColumn.length).fill(false)
  );

  const toggleLeft = (index: number) => {
    setOpenLeft((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const toggleRight = (index: number) => {
    setOpenRight((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // Card component for reuse
  const FAQCard = ({
    item,
    isActive,
    toggle,
  }: {
    item: FAQItem;
    isActive: boolean;
    toggle: () => void;
  }) => (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      {/* Question */}
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between p-4 text-left font-medium text-lg transition-colors duration-300 ${
          isActive ? "bg-[#F8FFFA]" : "bg-white"
        }`}
      >
        <span
          className={`flex-1 ${
            isActive ? "text-[#4CAF50]" : "text-gray-800"
          }`}
        >
          {item.question}
        </span>
        {isActive ? (
          <ChevronUp className="text-[#4CAF50] flex-shrink-0" size={22} />
        ) : (
          <ChevronDown className="text-gray-500 flex-shrink-0" size={22} />
        )}
      </button>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isActive ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="p-4 border-t text-gray-600 leading-relaxed bg-white">
          {item.answer}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Left column */}
      <div className="space-y-4">
        {leftColumn.map((item, idx) => (
          <FAQCard
            key={idx}
            item={item}
            isActive={openLeft[idx]}
            toggle={() => toggleLeft(idx)}
          />
        ))}
      </div>

      {/* Right column */}
      <div className="space-y-4">
        {rightColumn.map((item, idx) => (
          <FAQCard
            key={idx}
            item={item}
            isActive={openRight[idx]}
            toggle={() => toggleRight(idx)}
          />
        ))}
      </div>
    </div>
  );
}
