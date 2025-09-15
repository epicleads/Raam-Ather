'use client';

import Link from "next/link";

export default function TestRideButton() {
  return (
    <Link 
      href="/test-drive"
      className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-green-500/25 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-green-500/50"
      aria-label="Book Test Ride in Chennai"
    >
      Book Test Ride Chennai
    </Link>
  );
}
