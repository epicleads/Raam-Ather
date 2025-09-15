"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface Showroom {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  directionsUrl: string;
}

const HyderabadShowrooms = () => {
  const showrooms: Showroom[] = [
    {
      id: 1,
      name: "Raam Ather Electric Scooter Showroom, Somajiguda",
      address: "6-3-885/7/B, G-2, Ground, Amit Plaza, Durga Nagar Colony, Somajiguda, Hyderabad, Telangana 500082",
      phone: "092400 13781",
      hours: "Open ⋅ Closes 8:30 pm",
      directionsUrl: "https://www.google.com/maps?s=web&sca_esv=34443d8b2c0c5fa7&lqi=ChRSYWFtIEF0aGVyIEh5ZGVyYWJhZEjGtP7Tz7mAgAhaLBAAEAEQAhgAGAEYAiIUcmFhbSBhdGhlciBoeWRlcmFiYWQqCAgCEAAQARACkgEdZWxlY3RyaWNfbW90b3Jfc2Nvb3Rlcl9kZWFsZXKqAUwKDS9nLzExdG15N182bDYQATIfEAEiG-jHaRa2CFpPXwQyMRbUpzdc0chO9tufGZn0lTIYEAIiFHJhYW0gYXRoZXIgaHlkZXJhYmFk&phdesc=bi2LPm4pdbg&vet=12ahUKEwiZnLnLuq-PAxWHamwGHRnCAvsQ1YkKegQIFxAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=Kf-qeuMMkcs7MWhXHgVbXtJK&daddr=6-3-885/7/B,+G-2,+Ground,+Amit+Plaza,+Durga+Nagar+Colony,+Somajiguda,+Hyderabad,+Telangana+500082"
    },
    {
      id: 2,
      name: "Raam Ather Space - Electric Scooter Experience Center Begumpet",
      address: "1-10-7 & VISHRANTHI NILAYAM, Prakash Nagar, Begumpet, Secunderabad, Hyderabad, Telangana 500016",
      phone: "090323 33833",
      hours: "Open ⋅ Closes 7 pm",
      directionsUrl: "https://www.google.com/maps/dir//1-10-7+%26amp,+VISHRANTHI+NILAYAM,+Prakash+Nagar,+Begumpet,+Secunderabad,+Hyderabad,+Telangana+500016/@17.4442738,78.3860779,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bcb91268cf18215:0xc5bf2bb446db696f!2m2!1d78.4684797!2d17.4442907?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      id: 3,
      name: "Raam Ather Space - Electric Scooter Experience Center Sri Nagar Colony",
      address: "Plot no: 311 & 312, Phase 3, Sri Nagar Colony, Kamalapuri Colony, Banjara Hills, Hyderabad, Telangana 500073",
      phone: "090323 33833",
      hours: "Open ⋅ Closes 9 pm",
      directionsUrl: "https://www.google.com/maps?s=web&sca_esv=34443d8b2c0c5fa7&lqi=ChRSYWFtIEF0aGVyIEh5ZGVyYWJhZEiK-9mikrGAgAhaLBAAEAEQAhgAGAEYAiIUcmFhbSBhdGhlciBoeWRlcmFiYWQqCAgCEAAQARACkgEdZWxlY3RyaWNfbW90b3Jfc2Nvb3Rlcl9kZWFsZXKqAUwKDS9nLzExdG15N182bDYQATIfEAEiG-jHaRa2CFpPXwQyMRbUpzdc0chO9tufGZn0lTIYEAIiFHJhYW0gYXRoZXIgaHlkZXJhYmFk&phdesc=EL0dEPE3S4I&vet=12ahUKEwiZnLnLuq-PAxWHamwGHRnCAvsQ1YkKegQIGRAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KbVw3HYUkcs7Mb6yPPa7Sct-&daddr=plot+no:+311+%26+312,+phase+3,+Sri+Nagar+Colony,+Kamalapuri+Colony,+Banjara+Hills,+Hyderabad,+Telangana+500073"
    },
    {
      id: 4,
      name: "Raam Ather - Authorised Dealer of Raam Electric Two wheelers Shaikpet",
      address: "Shaikpet, Toli Chowki, Hyderabad, Telangana 500008",
      phone: "090323 33833",
      hours: "Open ⋅ Closes 7 pm",
      directionsUrl: "https://www.google.com/maps?s=web&sca_esv=34443d8b2c0c5fa7&lqi=ChRSYWFtIEF0aGVyIEh5ZGVyYWJhZEjGh-SwjLKAgAhaLBAAEAEQAhgAGAEYAiIUcmFhbSBhdGhlciBoeWRlcmFiYWQqCAgCEAAQARACkgEdZWxlY3RyaWNfbW90b3Jfc2Nvb3Rlcl9kZWFsZXKqAUwKDS9nLzExdG15N182bDYQATIfEAEiG-jHaRa2CFpPXwQyMRbUpzdc0chO9tufGZn0lTIYEAIiFHJhYW0gYXRoZXIgaHlkZXJhYmFk&phdesc=FKEldahdM4s&vet=12ahUKEwiZnLnLuq-PAxWHamwGHRnCAvsQ1YkKegQIHhAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KX25fCPfl8s7MW66oNWtcrwy&daddr=Shaikpet,+Toli+Chowki,+Hyderabad,+Telangana+500008"
    },
    {
      id: 5,
      name: "Raam Ather Electric Scooter Showroom, Kompally",
      address: "ATHARV PRIDE, Plot No:5 S.Y No:160 Pillar No:12 Kompally, Malkajgiri, Mandal, Telangana 500014",
      phone: "090323 33833",
      hours: "Open ⋅ Closes 8:30 pm",
      directionsUrl: "https://www.google.com/maps/dir//ATHARV+PRIDE,+Plot+No:5+S.Y+No:160+Pillar+No:12+Kompally,+Malkajgiri,+Mandal,+Telangana+500014/@17.5424907,78.4087132,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bcb85e1fa8c93d1:0xe6eeccef9eb6a74b!2m2!1d78.491115!2d17.5425077?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  const handleGetDirections = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCallPhone = (phone: string) => {
    window.open(`tel:${phone.replace(/\s/g, '')}`, '_self');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Raam Ather Showrooms in 
            <span className="text-[#4A4A4A] block sm:inline sm:ml-2">Hyderabad</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visit our premium showrooms to experience the future of electric mobility. 
            Test rides, expert consultation, and comprehensive support available at all locations.
          </p>
        </motion.div>

        {/* Showroom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {showrooms.map((showroom, index) => (
            <motion.div
              key={showroom.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#4A4A4A] to-[#2962FF] p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold leading-tight mb-2">
                  {showroom.name}
                </h3>
                <div className="flex items-center text-sm text-white/80">
                  <ClockIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{showroom.hours}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start mb-3">
                    <MapPinIcon className="w-5 h-5 text-[#4A4A4A] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {showroom.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <PhoneIcon className="w-5 h-5 text-[#4A4A4A] mr-3 flex-shrink-0" />
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                  </div>
                  <button
                    onClick={() => handleCallPhone(showroom.phone)}
                    className="text-[#2962FF] hover:text-[#1E88E5] font-semibold text-sm hover:underline transition-colors ml-8"
                  >
                    {showroom.phone}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={() => handleGetDirections(showroom.directionsUrl)}
                    className="w-full bg-[#4A4A4A] hover:bg-[#00B248] text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MapPinIcon className="w-4 h-4" />
                    Get Directions
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <motion.button
                    onClick={() => handleCallPhone(showroom.phone)}
                    className="w-full border-2 border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF] hover:text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PhoneIcon className="w-4 h-4" />
                    Call Now
                  </motion.button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A4A4A]/5 to-[#2962FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience Electric?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Visit any of our showrooms for a free test ride, expert consultation, 
            and to explore our complete range of electric scooters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="bg-[#00B248] hover:bg-[#00A041] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneIcon className="w-5 h-5" />
              Call for Test Ride
            </motion.button>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-[#4A4A4A]">090323 33833</div>
              <div className="text-sm text-gray-500">Toll-free number</div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500">
            * Working hours may vary on public holidays. Please call ahead to confirm availability.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HyderabadShowrooms;