'use client';

import { useTestDriveModal } from '../Components/test-ride-form/TestDriveModalStore';

export default function TestRideButton() {
  const modal = useTestDriveModal();

  const handleTestRideClick = () => {
    modal.openManually();
  };

  return (
    <button 
      onClick={handleTestRideClick}
      className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-green-500/25 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-green-500/50"
      aria-label="Book Test Ride in Chennai"
    >
      Book Test Ride Hyderabad
    </button>
  );
}