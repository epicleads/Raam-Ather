'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import { AccessoriesProps, Accessory } from '../accessories.types';

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export default function AccessoriesGrid({ data }: AccessoriesProps) {

  return (
    <div className="relative">
      {/* Overview Section */}
      

      {/* Accessories Categories - Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {data.accessories.map((accessory, index) => (
          <AccessoryCategoryCard
            key={accessory.id}
            accessory={accessory}
            index={index}
          />
        ))}
      </div>

      {/* Mobile Stacked Grid */}
      <div className="md:hidden mb-8">
        <div className="grid grid-cols-1 gap-4">
          {data.accessories.map((accessory, index) => (
            <AccessoryCategoryCard 
              key={accessory.id}
              accessory={accessory} 
              index={index} 
              isMobile={true} 
            />
          ))}
        </div>
      </div>

      {/* Contact Strip */}
      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h4 className="text-2xl md:text-3xl font-bold font-neurial mb-4">
            Interested in Our Accessories?
          </h4>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Visit our showroom or contact us to explore our complete range of premium Ather accessories
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ContactUs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold font-neurial rounded-2xl hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
            
            <Link
              href="/StoreLocator"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold font-neurial rounded-2xl hover:bg-green-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Visit Showroom
            </Link>
            
            <Link
              href="https://api.whatsapp.com/send/?phone=919032333833&text=Hi+Team%2C+I+want+to+know+more+about+Ather%21&type=phone_number&app_absent=0"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-800 text-white font-bold font-neurial rounded-2xl hover:bg-green-900 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <WhatsAppIcon />
              <span className="ml-2">WhatsApp</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface AccessoryCategoryCardProps {
  accessory: Accessory;
  index: number;
  isMobile?: boolean;
}

function AccessoryCategoryCard({ accessory, index, isMobile = false }: AccessoryCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: isMobile ? 0 : index * 0.15,
        ease: [0.25, 0.25, 0, 1]
      }}
      className="group h-full"
    >
      <article className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 overflow-hidden hover:bg-white hover:border-green-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-2 h-full flex flex-col">
        
        {/* Image Container */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={accessory.image}
            alt={accessory.title}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
            sizes={isMobile ? "300px" : "(max-width: 768px) 100vw, 25vw"}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent group-hover:from-white/30 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold font-neurial text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
            {accessory.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {accessory.description}
          </p>

          {/* Simple availability indicator */}
          <div className="inline-flex items-center text-sm font-medium text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Available at Showroom
          </div>
        </div>

        {/* Subtle decoration */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </article>
    </motion.div>
  );
}