"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { accessoriesNavItems } from "../accessories-header.config";

interface AccessoriesMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessoriesMobileMenu({
  isOpen,
  onClose,
}: AccessoriesMobileMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Accessories</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Close Menu"
        >
          ✕
        </button>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-2">
        {accessoriesNavItems.map((item, index) => (
          <div key={item.label}>
            {/* Parent Button */}
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex items-center justify-between w-full text-gray-700 text-base font-medium py-2"
            >
              {item.label}
              {item.dropdown && <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Dropdown Links */}
            {item.dropdown && openIndex === index && (
              <div className="pl-4 space-y-1">
                {item.dropdown.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="block py-1 text-gray-600 hover:text-green-500"
                    onClick={onClose}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
