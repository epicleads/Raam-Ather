"use client";

import React, { useState, useEffect } from "react";

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState("hyderabad");

  const locations = {
    hyderabad: {
      name: "Hyderabad",
      fullName: "Raam Ather Somajiguda",
      address: "6-3-885/7/B, G-2, Ground, Amit Plaza, Durga Nagar Colony, Somajiguda, Hyderabad, Telangana 500082",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.650653859499!2d78.45302887516583!3d17.428545083465693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910ce37aaaff%3A0x4ad25e5b051e5768!2sRaam%20Ather%20Electric%20Scooter%20Showroom%2C%20Somajiguda!5e0!3m2!1sen!2sin!4v1757410239285!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir//6-3-885%2F7%2FB,+G-2,+Ground,+Raam+Ather+Electric+Scooter+Showroom,+Somajiguda,+Amit+Plaza,+Durga+Nagar+Colony,+Somajiguda,+Hyderabad,+Telangana+500082/@17.4285502,78.4530289,17z/data=!3m1!5s0x3bcb90b4ee230a49:0x8d265e566c5835e!4m8!4m7!1m0!1m5!1m1!1s0x3bcb910ce37aaaff:0x4ad25e5b051e5768!2m2!1d78.4556038!2d17.4285451?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
      color: "green"
    },
    chennai: {
      name: "Chennai", 
      fullName: "Ather Electric Scooter Showroom in, Nungambakkam",
      address: "No.153, Wallace Garden 2nd St, Thousand Lights West, Nungambakkam, Chennai, Tamil Nadu 600006",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.602205452425!2d80.24592167478197!3d13.060973812913131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267be692be009%3A0x1e8d9423b44d1b90!2sAther%20Electric%20Scooter%20Showroom%20in%2C%20Nungambakkam!5e0!3m2!1sen!2sin!4v1757416596440!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir//Ather+Electric+Scooter+Showroom+in,+Nungambakkam,+No.153,+Wallace+Garden+2nd+St,+Thousand+Lights+West,+Nungambakkam,+Chennai,+Tamil+Nadu+600006/@13.0609686,80.2459217,17z/data=!3m1!5s0x3a5266698427c599:0xc8e024d02f3239e3!4m8!4m7!1m0!1m5!1m1!1s0x3a5267be692be009:0x1e8d9423b44d1b90!2m2!1d80.2484966!2d13.0609686?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
      color: "blue"
    }
  };

  // Monitor state changes
  useEffect(() => {
    // Location changed - could add any side effects here if needed
  }, [selectedLocation]);

  return (
    <div className="flex flex-col w-full h-full space-y-4">

      {/* Location Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(locations).map(([key, location]) => (
          <div 
            key={key}
            className={`bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border-2 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
              selectedLocation === key ? `border-${location.color}-400` : 'border-gray-200/50'
            }`}
            onClick={() => setSelectedLocation(key)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 bg-${location.color}-500 rounded-full animate-pulse`}></div>
              <h3 className="font-bold font-neurial text-gray-800">{location.name}</h3>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {location.fullName}
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {location.address}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <svg className={`w-4 h-4 text-${location.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-gray-500">Premium Service Available</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="relative flex-1">
        <div className="relative h-[450px] bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-300">
          {/* Google Maps iframe */}
          <iframe
            src={locations[selectedLocation as keyof typeof locations].mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title={`${locations[selectedLocation as keyof typeof locations].name} Location Map`}
          />
          
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <a 
          href={locations[selectedLocation as keyof typeof locations].directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
          </svg>
          Get directions to Raam Ather {locations[selectedLocation as keyof typeof locations].name}
        </a>
        <a 
          href={`tel:${selectedLocation === 'hyderabad' ? '+9190323 33833' : '+919827200400'}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {locations[selectedLocation as keyof typeof locations].name} Store
        </a>
        <a 
          href={`https://wa.me/${selectedLocation === 'hyderabad' ? '919032333833' : '919032333833'}?text=Hi! I'm interested in Ather electric scooters at your ${locations[selectedLocation as keyof typeof locations].fullName} location.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}