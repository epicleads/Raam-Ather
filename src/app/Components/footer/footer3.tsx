"use client";
import React from "react";
import { FaFacebookF, FaInstagram,FaYoutube } from "react-icons/fa";

const Footer3 = () => {
  return (
    <footer className="bg-black text-gray-400 text-xs py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        
        {/* Social Media Icons */}
        <div className="flex gap-4 text-white text-lg">
          <a
            href="https://facebook.com/raamather"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com/raamather"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FaInstagram />
          </a>
          
          <a
            href="https://youtube.com/raamather"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer3;
