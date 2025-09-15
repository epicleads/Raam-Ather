"use client";

import { useState } from 'react';

export default function AccessoriesCTAs() {
  const [cartCount] = useState(0);

  return (
    <div className="flex items-center space-x-6">
      {/* Search */}
      <button
        className="flex items-center space-x-2 text-gray-800 hover:text-emerald-400 transition-colors"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
        </svg>
        <span className="text-sm font-medium">Search</span>
      </button>

      {/* Cart */}
      <button
        className="relative flex items-center space-x-2 text-gray-800 hover:text-emerald-400 transition-colors"
        aria-label="Cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9" />
        </svg>
        <span className="text-sm font-medium">{cartCount}</span>
      </button>
    </div>
  );
}

