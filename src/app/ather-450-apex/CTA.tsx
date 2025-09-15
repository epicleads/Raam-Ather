"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/Components/ui/button";
import { useTestDriveModal } from "../Components/test-ride-form/TestDriveModalStore";
import Link from "next/link";

export default function CtaSection() {
  const testDriveModal = useTestDriveModal();

  const handleTestRideClick = () => {
    testDriveModal.openManually();
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center bg-gray-50 rounded-2xl shadow-sm border border-gray-100 px-8 md:px-12 py-12 md:py-16"
          style={{ fontFamily: "Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          {/* Main heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4 tracking-tight leading-tight"
          >
            Experience the Ather 450 Apex
            <br />
            <span className="font-medium">with Raam Ather</span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 mb-10 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Book your test ride today and discover performance, safety, and comfort — 
            all in one electric scooter.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={handleTestRideClick}
                className="bg-black text-white hover:bg-gray-800 rounded-lg px-8 py-3 font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                Book a Test Ride
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/StoreLocator">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 rounded-lg px-8 py-3 font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Visit Showroom
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Small green accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <p className="text-sm text-gray-600 font-medium">
              Raam Ather – Your trusted Ather Energy dealer
            </p>
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          </motion.div>

          {/* Location info */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-gray-500 font-light"
          >
            Serving Hyderabad & Chennai
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}