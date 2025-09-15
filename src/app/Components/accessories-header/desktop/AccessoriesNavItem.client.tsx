// src/app/Components/accessories-header/desktop/AccessoriesNavItem.client.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem, DropdownItem } from "../accessories-header.types";

export default function AccessoriesNavItemClient({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Main Link */}
      <Link
        href={item.href}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
      >
        {item.label}
        {item.dropdown && <ChevronDown className="w-4 h-4" />}
      </Link>

      {/* Dropdown Menu */}
      {item.dropdown && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-100 p-2 z-50"
            >
              {item.dropdown.map((sub: DropdownItem) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  {sub.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
