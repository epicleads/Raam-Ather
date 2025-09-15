import React from 'react';
import ContactPage from '../Components/contactform/contactserver';
import FooterClient from '../Components/footer/footerclient';

// Define types for our data structures
interface Coordinates {
  lat: number;
  lng: number;
}

interface Location {
  id: number;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  hours: string;
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  isOpen?: boolean;
  directionsUrl?: string; // Added for Google Maps directions
}

interface StatusIndicatorProps {
  isOpen?: boolean;
  busyLevel?: string;
}

// Hyderabad locations data
const hyderabadLocations: Location[] = [
  {
    id: 1, 
    name: 'Raam Ather Electric Scooter Showroom, Somajiguda',
    address: '6-3-885/7/B, G-2, Ground, Amit Plaza, Durga Nagar Colony, Somajiguda, Hyderabad, Telangana 500082',
    pincode: '500082',
    phone: '+91 9240013781',
    whatsapp: '+91 9240013781',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 17.4326, lng: 78.4071 },
    rating: 4.8,
    reviewCount: 124,
    isOpen: true,
    directionsUrl: 'https://maps.app.goo.gl/ryXguVyQSqfoXhiAA',
  },
  {
    id: 2,
    name: 'Raam Ather Electric Scooter Showroom, Vanasthalipuram',
    address: 'Plot No 41, Lecturers Colony Hayat Nagar, Vanasthalipuram, Hyderabad, Telangana 501505',
    pincode: '501505',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 7:00 PM',
    coordinates: { lat: 17.4443, lng: 78.4685 },
    rating: 4.7,
    reviewCount: 89,
    isOpen: true,
    directionsUrl: 'https://maps.app.goo.gl/j4xL2i3t3C9hfS1h8',
  },
  {
    id: 3,
    name: 'Ather Electric Scooter Showroom in, Malakpet',
    address: 'Ground Floor, No 16/2/705/9/6/1/A, Malakpet, Hyderabad, Telangana 500036',
    pincode: '500036',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 9:00 PM',
    coordinates: { lat: 17.4122, lng: 78.4500 },
    rating: 4.9,
    reviewCount: 156,
    directionsUrl: 'https://maps.app.goo.gl/tGGe5bdnfByyCH3D8',
  },
  {
    id: 4,
    name: 'Raam Ather- Authorised Dealer of Raam Electric Two wheelers Toli Chowki',
    address: 'Shaikpet, Toli Chowki, Hyderabad, Telangana 500008',
    pincode: '500008',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 7:00 PM',
    coordinates: { lat: 17.4240, lng: 78.3489 },
    rating: 4.6,
    reviewCount: 78,
    isOpen: true,
    directionsUrl: 'https://maps.app.goo.gl/6gGRCqfX6fo6yBkJ9',
  },
  {
    id: 5,
    name: 'Raam Ather Electric Scooter Showroom, Kompally',
    address: 'ATHARV PRIDE, Plot No:5 S.Y No:160 Pillar No:12 Kompally, Malkajgiri, Mandal, Telangana 500014',
    pincode: '500014',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 17.5425, lng: 78.4911 },
    rating: 4.8,
    reviewCount: 203,
    isOpen: true,
    directionsUrl: 'https://maps.app.goo.gl/oBPjzZVQK1w4aP759',
  },
  {
    id: 6,
    name: 'Raam Ather Electric Scooter Showroom, Attapur',
    address: 'Survey No.18/4, Number.2-4-126/4, Plot Nos. 8 & 9, Rajendra Nagar Rd, Attapur, Upperpally, Telangana 500048',
    pincode: '500048',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 17.5425, lng: 78.4911 },
    rating: 4.8,
    reviewCount: 203,
    isOpen: true,
    directionsUrl: 'https://maps.app.goo.gl/Z2aMwwsVQzybvUAf9',
  }
];

// Simplified status indicator component
const StatusIndicator = ({ isOpen }: StatusIndicatorProps) => {
  return (
    <div className="flex items-center space-x-3">
      {isOpen !== undefined && (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
          <span className="text-xs font-medium text-gray-900">{isOpen ? 'Open' : 'Closed'}</span>
        </div>
      )}
    </div>
  );
};

// Location Card Component
interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 p-8 border border-gray-100 group hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-2 group-hover:text-green-600 transition-colors duration-300">
            {location.name}
          </h3>
          <StatusIndicator isOpen={location.isOpen} />
        </div>
        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-2xl">
          <span className="text-yellow-400 text-sm mr-1">★</span>
          <span className="text-sm font-semibold text-gray-900">{location.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({location.reviewCount})</span>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-600 text-sm leading-relaxed">{location.address}</p>
        </div>
        
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <a href={`tel:${location.phone}`} className="text-gray-900 hover:text-green-600 font-medium transition-colors duration-300">
            {location.phone}
          </a>
        </div>
        
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 text-sm">{location.hours}</span>
        </div>
      </div>
        
      <div className="grid grid-cols-3 gap-3">
        <a 
          href={`tel:${location.phone}`}
          className="bg-gray-900 text-white py-3 px-4 rounded-2xl font-medium text-center hover:bg-gray-800 transition-all duration-300 text-sm flex items-center justify-center space-x-1 group"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>Call</span>
        </a>
        <a 
          href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white py-3 px-4 rounded-2xl font-medium text-center hover:bg-green-700 transition-all duration-300 text-sm flex items-center justify-center space-x-1 group"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
          </svg>
          <span>WhatsApp</span>
        </a>
        {location.directionsUrl && (
          <a 
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white py-3 px-4 rounded-2xl font-medium text-center hover:bg-blue-700 transition-all duration-300 text-sm flex items-center justify-center space-x-1 group"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Directions</span>
          </a>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function RaamAtherLocations() {
  return (
    <main className="min-h-screen bg-white">
      {/* Account for 80px header */}
      <div className="pt-0">
        {/* Hero Section */}
        <div className="bg-black text-white py-25">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-light mb-0 tracking-tight">
                Raam Ather
                <span className="block font-semibold">Locations in Hyderabad</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {hyderabadLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </div>
      <ContactPage/>
      <FooterClient/>
    </main>
  );
}