'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown } from 'lucide-react';
import { EMIInputs, EMIResult } from '../home-calculator.types';
import { trackAtherEvents } from '../../CookieConsent/MetaPixel';

export default function EmiCalculator() {
  const [inputs, setInputs] = useState<EMIInputs>({
    loanAmount: 80000,
    interestRate: 10.5,
    loanTenure: 24
  });

  // Track calculator usage with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      // Determine model based on loan amount (rough estimation)
      const estimatedModel = inputs.loanAmount >= 120000 ? '450X' : 
                            inputs.loanAmount >= 100000 ? '450S' : 'Rizta';
      
      trackAtherEvents.calculatorUsage(inputs.loanAmount, estimatedModel);
    }, 2000); // Track after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [inputs]);

  const calculateEMI = (principal: number, annualRate: number, months: number): EMIResult => {
    const r = annualRate / 12 / 100;
    const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    return { emi, totalAmount, totalInterest };
  };

  const result = calculateEMI(inputs.loanAmount, inputs.interestRate, inputs.loanTenure);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-50 rounded-xl mr-4">
          <Calculator className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">EMI Calculator</h3>
          <p className="text-sm text-gray-600">Plan your Ather purchase</p>
        </div>
      </div>

      <div className="space-y-6 flex-grow">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount: ₹{inputs.loanAmount.toLocaleString()}
          </label>
          <input
            type="range"
            min="50000"
            max="200000"
            step="5000"
            value={inputs.loanAmount}
            onChange={(e) => setInputs({...inputs, loanAmount: parseInt(e.target.value)})}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-green-integrated"
            style={{
              '--slider-fill': `${((inputs.loanAmount - 50000) / (200000 - 50000)) * 100}%`
            } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹50K</span>
            <span>₹2L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate</label>
          <select
            value={inputs.interestRate}
            onChange={(e) => setInputs({...inputs, interestRate: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
          >
            <option value={8.5}>8.5% - Excellent Credit</option>
            <option value={10.5}>10.5% - Good Credit</option>
            <option value={12.5}>12.5% - Average Credit</option>
            <option value={15.0}>15.0% - Fair Credit</option>
          </select>
        </div>

        {/* Loan Tenure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure</label>
          <select
            value={inputs.loanTenure}
            onChange={(e) => setInputs({...inputs, loanTenure: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
          >
            <option value={12}>12 months</option>
            <option value={18}>18 months</option>
            <option value={24}>24 months</option>
            <option value={36}>36 months</option>
            <option value={48}>48 months</option>
          </select>
        </div>
      </div>

      {/* Results - Fixed at bottom */}
      <motion.div
        key={`${inputs.loanAmount}-${inputs.interestRate}-${inputs.loanTenure}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 mt-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{Math.round(result.emi).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly EMI</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">₹{Math.round(result.totalInterest).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Interest</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg">
          <div className="flex items-center justify-center text-green-700">
            <TrendingDown className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Save ₹2,500/month vs petrol costs!</span>
          </div>
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