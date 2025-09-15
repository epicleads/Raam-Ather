"use client";

import { motion } from "framer-motion";

import { Phone } from "lucide-react";
import { useTestDriveModal } from "../Components/test-ride-form/TestDriveModalStore";

type ModelType = "450" | "450X" | "Rizta" | "Apex";

interface FinalCTAProps {
  model: ModelType;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ model }) => {
  const testDriveModal = useTestDriveModal();
  
  const content: Record<ModelType, { title: string; subtitle: string }> = {
    "450": {
      title: "Ready to experience the Ather 450?",
      subtitle:
        "Built for everyday rides with performance that thrills. Book a test ride today and redefine your commute.",
    },
    "450X": {
      title: "Ready to experience peak performance?",
      subtitle:
        "The Ather 450X isn’t just built for the city — it’s built for you. Book a test ride today and feel the future on two wheels.",
    },
    Rizta: {
      title: "Comfort, safety, and space. All in one ride.",
      subtitle:
        "The Ather Rizta is designed for family and everyday use. Book a test ride today and glide into comfort.",
    },
    Apex: {
      title: "Exclusivity meets performance.",
      subtitle:
        "The Ather Apex is crafted for those who settle for nothing less than the ultimate ride. Book your test ride today.",
    },
  };

  const { title, subtitle } = content[model] ?? content["450"];

  return (
    <section className="w-full bg-black text-white py-20 px-6 text-center relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] via-transparent to-[#00ccff] opacity-20"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 font-neurial"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-base md:text-lg text-gray-300 mb-8 font-neurial"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => testDriveModal.openManually()}
            className="px-6 py-3 rounded-2xl bg-[#00ffcc] text-black font-semibold shadow-lg hover:shadow-xl transition font-neurial"
          >
            Book a Test Ride
          </button>
          <a
            href="tel:+919032333833"
            className="px-6 py-3 rounded-2xl border border-white text-white font-semibold hover:bg-white hover:text-black transition inline-flex items-center gap-2 font-neurial"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </motion.div>

        {/* Trust element */}
        <p className="text-xs text-gray-400 mt-6 font-neurial">
          Easy financing, instant booking confirmation.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
