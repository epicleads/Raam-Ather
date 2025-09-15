"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { usePopup } from "../../Components/popups/PopupProvider";

const contactMethods = [
  {
    icon: <PhoneIcon className="w-8 h-8" />,
    title: "Call Us",
    description: "Call us directly for immediate support and assistance.",
    color: "from-blue-500 to-cyan-500",
    action: "call",
  },
  {
    icon: <EnvelopeIcon className="w-8 h-8" />,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours.",
    color: "from-green-500 to-emerald-500",
    action: "email",
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
    title: "Book Test Drive",
    description: "Schedule a test drive at your convenience.",
    color: "from-purple-500 to-pink-500",
    action: "testdrive",
  },
  {
    icon: <MapPinIcon className="w-8 h-8" />,
    title: "Visit Us",
    description: "Find the nearest Raam Ather location to you.",
    color: "from-orange-500 to-red-500",
    action: "visit",
  },
];

const ContactOptions = () => {
  const { openCallPopup, openFormPopup } = usePopup();
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const handleContactClick = (action: string) => {
    if (action === "call") {
      openCallPopup();
    } else if (action === "testdrive") {
      openFormPopup("testdrive");
    } else if (action === "email") {
      setShowEmailPopup(true);
    } else if (action === "visit") {
      window.location.href = "/StoreLocator";
    }
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-12 text-center font-neurial"
        >
          Contact Options
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg cursor-pointer group"
              onClick={() => handleContactClick(method.action)}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-6 text-white`}
              >
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 font-neurial">
                {method.title}
              </h3>
              <p className="text-gray-400 text-sm font-neurial">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Email Popup Modal */}
      <AnimatePresence>
        {showEmailPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <h3 className="text-2xl font-semibold mb-6 font-neurial text-white">
                Choose Email Contact
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:marketing@raamather.com"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
                >
                  📧 Chennai
                </a>
                <a
                  href="mailto:marketing@raamather.com"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
                >
                  📧 Hyderabad
                </a>
              </div>
              <button
                onClick={() => setShowEmailPopup(false)}
                className="mt-6 text-gray-400 hover:text-white transition text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactOptions;
