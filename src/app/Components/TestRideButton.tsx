'use client';

import React from 'react';
import { useTestDriveModal } from './test-ride-form/TestDriveModalStore';

interface TestRideButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function TestRideButton({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  onClick
}: TestRideButtonProps) {
  const modal = useTestDriveModal();

  const handleClick = () => {
    console.log('TestRideButton clicked, opening modal');
    modal.openManually();
    onClick?.();
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#4ade80] hover:bg-[#22c55e] text-white focus:ring-[#4ade80] shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-600 shadow-sm hover:shadow-md',
    outline: 'border-2 border-[#4ade80] text-[#4ade80] hover:bg-[#4ade80] hover:text-white focus:ring-[#4ade80]',
    ghost: 'text-[#4ade80] hover:bg-[#4ade80]/10 focus:ring-[#4ade80]'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classes}
    >
      {children}
    </button>
  );
}

