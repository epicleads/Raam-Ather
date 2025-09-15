"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTestDriveModal } from "../test-ride-form/TestDriveModalStore";

const Footer: React.FC = () => {
  const testDriveModal = useTestDriveModal();

  const handleOwnershipCalculatorClick = () => {
    // Scroll to the Plan Your Savings section
    const element = document.getElementById('plan-your-savings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookTestRideClick = () => {
    testDriveModal.openManually();
  };

  const handleAccessoriesClick = () => {
    // Scroll to the accessories section on home page
    const element = document.getElementById('accessories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to home page first
      window.location.href = '/#accessories-section';
    }
  };
  return (
    <footer className="bg-[#181818] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-[13px] leading-6">
          {/* Column 1: Logo + About */}
          <div>
            <Image
              src="/assets/Raam Ather.png"
              alt="Raam Ather"
              width={150}
              height={40}
              className="mb-4"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-gray-400 text-sm leading-6">
              Raam Ather is your trusted dealer for Ather Electric Scooters,
              offering the latest models, premium service, and a seamless buying
              experience across multiple cities.
            </p>
          </div>

          {/* Mobile Row 2 → Col2 + Col3 in one row */}
          <div className="grid grid-cols-2 gap-6 md:contents col-span-1 md:col-span-1">
            {/* Column 2 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-4">
                Electric Scooters
              </h4>
              <ul className="space-y-[6px]">
                <li>
                  <Link href="/rizta" className="hover:underline">
                    Ather Rizta{" "}
                    <span className="text-green-500 font-normal text-xs">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/ather-450-apex" className="hover:underline">
                    Ather 450 Apex
                  </Link>
                </li>
                <li>
                  <Link href="/ather-450" className="hover:underline">
                    Ather 450X
                  </Link>
                </li>
                <li>
                  <Link href="/ather-450" className="hover:underline">
                    Ather 450S
                  </Link>
                </li>
                
                <li>
                  <button 
                    onClick={handleBookTestRideClick}
                    className="hover:underline text-left"
                  >
                    Book Test Ride
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-4">Ownership</h4>
              <ul className="space-y-[6px]">
                <li>
                  <button 
                    onClick={handleOwnershipCalculatorClick}
                    className="hover:underline text-left"
                  >
                    Ownership Cost Calculator
                  </button>
                </li>
                
                <li>
                  <button 
                    onClick={handleAccessoriesClick}
                    className="hover:underline text-left"
                  >
                    Accessories
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Row 3 → Col4 + Col5 in one row */}
          <div className="grid grid-cols-2 gap-6 md:contents col-span-1 md:col-span-1">
            {/* Column 4 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-4">Support</h4>
              <ul className="space-y-[6px]">
                
                <li>
                  <Link href="/" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/ContactUs" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
               
                
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-4">Follow Us</h4>
              <ul className="space-y-[6px]">
                <li>
                  <Link href="#" className="hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                
                <li>
                  <Link href="#" className="hover:underline">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
