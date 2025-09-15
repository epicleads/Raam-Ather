"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTestDriveModal } from "../../Components/test-ride-form/TestDriveModalStore";
import { PhoneIcon } from "@heroicons/react/24/outline";

const RaamFamilyCTA = () => {
  const modal = useTestDriveModal();

  return (
    <section className="py-12 bg-gradient-to-br from-[#4A4A4A] via-[#3A3A3A] to-[#2962FF] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-32 w-16 h-16 bg-white/10 rounded-full"
          animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-12 h-12 bg-white/10 rounded-full"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6 leading-tight font-neurial"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200">
              Become Part of Raam Family
            </span>
          </motion.h2>

          <motion.p
            className="text-base text-white/90 mb-8 leading-relaxed font-neurial"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Join thousands of satisfied customers who&apos;ve made the switch
            to sustainable mobility. Experience the future of transportation
            today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Test Ride Button */}
            <motion.button
              onClick={() => modal.openManually()}
              className="border-1 border-white text-white hover:bg-white hover:text-[#4A4A4A] px-4 sm:px-6 py-2 sm:py-1 rounded-2xl font-bold text-base sm:text-xl transition-all w-full sm:w-auto font-neurial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Test Ride
            </motion.button>

            {/* Call Us Button */}
            <motion.a
              href="tel:+919876543210" // Replace with your phone number
              className="flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-[#4A4A4A] px-4 sm:px-6 py-2 sm:py-1 rounded-2xl font-bold text-base sm:text-xl transition-all w-full sm:w-auto font-neurial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneIcon className="h-5 w-5" />
              Enquire Now
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RaamFamilyCTA;
