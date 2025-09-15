'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Zap, Fuel, TrendingUp } from 'lucide-react';
import { CostComparison } from '../home-calculator.types';

export default function EvVsPetrolSlider() {
  const [dailyKm, setDailyKm] = useState(30);
  const [showMonthly, setShowMonthly] = useState(true);

  const calculateCosts = (dailyDistance: number): CostComparison => {
    const fuelPrice = 100;
    const petrolMileage = 40;
    const electricityRate = 8;
    const evEfficiency = 30;

    const petrolCost = (dailyDistance * fuelPrice * 30) / petrolMileage;
    const evCost = (dailyDistance * electricityRate * 30) / evEfficiency;
    const savings = petrolCost - evCost;

    return { petrol: petrolCost, ev: evCost, savings, dailyKm: dailyDistance };
  };

  const costs = calculateCosts(dailyKm);
  const displayMultiplier = showMonthly ? 1 : 1/30;
  const period = showMonthly ? 'month' : 'day';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">EV vs Petrol Cost</h3>
          <p className="text-sm text-gray-600">See your savings in real-time</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setShowMonthly(false)}
            className={`px-3 py-1 text-sm rounded transition-colors ${!showMonthly ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setShowMonthly(true)}
            className={`px-3 py-1 text-sm rounded transition-colors ${showMonthly ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Distance Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Daily Distance: {dailyKm} km
        </label>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={dailyKm}
          onChange={(e) => setDailyKm(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-green-integrated"
          style={{
            '--slider-fill': `${((dailyKm - 10) / (100 - 10)) * 100}%`
          } as React.CSSProperties}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>10 km</span>
          <span>100 km</span>
        </div>
      </div>

      {/* Scooter Comparison - Flex grow to fill available space */}
      <div className="grid grid-cols-2 gap-6 mb-6 flex-grow">
        {/* EV Scooter */}
        <div className="text-center">
          <div className="relative h-24 mb-4">
            <Image
              src="/Ather-Assets/Comparison/1.png"
              alt="Ather EV Scooter"
              fill
              className="object-contain"
              sizes="200px"
            />
            <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full z-10">
              <Zap className="w-2.5 h-2.5 inline mr-0.5" />
              EV
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className={`font-bold text-green-600 ${showMonthly ? 'text-lg' : 'text-base'}`}>
              ₹{Math.round(costs.ev * displayMultiplier)}
            </div>
            <div className={`text-gray-600 ${showMonthly ? 'text-sm' : 'text-xs'}`}>per {period}</div>
          </div>
          <div className="mt-2 h-1 bg-green-200 rounded-full">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min((costs.ev / costs.petrol) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Petrol Scooter */}
        <div className="text-center">
          <div className="relative h-24 mb-4">
            <Image
              src="/Ather-Assets/Comparison/2.png"
              alt="Petrol Scooter"
              fill
              className="object-contain"
              sizes="200px"
            />
            <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full z-10">
              <Fuel className="w-2.5 h-2.5 inline mr-0.5" />
              Petrol
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className={`font-bold text-red-600 ${showMonthly ? 'text-lg' : 'text-base'}`}>
              ₹{Math.round(costs.petrol * displayMultiplier)}
            </div>
            <div className={`text-gray-600 ${showMonthly ? 'text-sm' : 'text-xs'}`}>per {period}</div>
          </div>
          <div className="mt-2 h-1 bg-red-200 rounded-full">
            <motion.div
              className="h-full bg-red-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Savings Card - Fixed at bottom */}
      <motion.div
        key={`${dailyKm}-${showMonthly}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center"
      >
        <div className="flex items-center justify-center mb-2">
          <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
          <span className={`font-medium text-green-700 ${showMonthly ? 'text-sm' : 'text-xs'}`}>You Save</span>
        </div>
        <div className={`font-bold text-green-800 ${showMonthly ? 'text-xl' : 'text-lg'}`}>
          ₹{Math.round(costs.savings * displayMultiplier)} per {period}
        </div>
        {/* Always show yearly savings to maintain consistent height */}
        <div className={`text-green-600 mt-1 ${showMonthly ? 'text-sm' : 'text-xs'}`}>
          ₹{Math.round(costs.savings * 12)} per year
        </div>
      </motion.div>

      <style jsx>{`
        .slider-green-integrated {
          background: linear-gradient(to right, #bbf7d0 0%, #bbf7d0 var(--slider-fill), #e5e7eb var(--slider-fill), #e5e7eb 100%);
        }
        
        .slider-green-integrated::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(22, 163, 74, 0.3);
          border: 3px solid white;
          transition: all 0.2s ease;
        }
        
        .slider-green-integrated::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(22, 163, 74, 0.4);
        }
        
        .slider-green-integrated::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(22, 163, 74, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider-green-integrated::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider-green-integrated::-moz-range-track {
          background: linear-gradient(to right, #bbf7d0 0%, #bbf7d0 var(--slider-fill), #e5e7eb var(--slider-fill), #e5e7eb 100%);
          height: 8px;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
}