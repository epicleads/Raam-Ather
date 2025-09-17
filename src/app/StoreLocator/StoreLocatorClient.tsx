"use client";
import React, { useState } from 'react';

import PremiumExperienceCenter from './components/PremiumExperienceCenter';
import InteractivePinDetails from './components/InteractivePinDetails';
import TestRideFlow from './components/TestRideFlow';
import WhatsAppConcierge from './components/WhatsAppConcierge';


export interface Outlet {
  id: number;
  name: string;
  type: 'showroom' | 'service' | 'test-ride';
  city: 'Hyderabad' | 'Chennai';
  address: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  hours: string;
  coordinates: { lat: number; lng: number };
  distance?: number;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  busyLevel: 'low' | 'medium' | 'high';
  nextTestRideSlot?: string;
  amenities: string[];
  modelsAvailable: string[];
  coverImage: string;
  gallery: string[];
  offers: string[];
  staff: { name: string; role: string; image: string }[];
  responseTime: string;
  testRidesThisWeek: number;
  directionsUrl?: string;
}

const StoreLocatorClient = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [showTestRideFlow, setShowTestRideFlow] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);


 // Enhanced outlet data with real Hyderabad locations
const outlets: Outlet[] = [
  {
    id: 1,
    name: 'Raam Ather Electric Scooter Showroom, Somajiguda',
    type: 'showroom',
    city: 'Hyderabad',
    address: '6-3-885/7/B, G-2, Ground, Amit Plaza, Durga Nagar Colony, Somajiguda, Hyderabad, Telangana 500082',
    pincode: '500082',
    phone: '+91 9240013781',
    whatsapp: '+91 9240013781',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 17.4326, lng: 78.4071 },
    rating: 4.8,
    reviewCount: 124,
    isOpen: true,
    busyLevel: 'medium',
    nextTestRideSlot: '2:30 PM Today',
    amenities: ['WiFi', 'AC Waiting Area', 'Test Track', 'Charging Station'],
    modelsAvailable: ['Rizta', '450X', '450 Apex'],
    coverImage: '/assets/somajiguda.jpg',
    gallery: ['/assets/gallery1.jpg', '/assets/gallery2.jpg'],
    offers: ['Special EMI rates', '5 Year Warranty'],
    staff: [{ name: 'Rajesh Kumar', role: 'Sales Manager', image: '/assets/staff1.jpg' }],
    responseTime: '< 5 minutes',
    testRidesThisWeek: 47,
    directionsUrl: 'https://maps.app.goo.gl/ryXguVyQSqfoXhiAA',
  },
  {
    id: 2,
    name: 'Raam Ather Electric Scooter Showroom, Vanasthalipuram',
    type: 'showroom',
    city: 'Hyderabad',
    address: 'Plot No 41, Lecturers Colony Hayat Nagar, Vanasthalipuram, Hyderabad, Telangana 501505',
    pincode: '501505',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 7:00 PM',
    coordinates: { lat: 17.4443, lng: 78.4685 },
    rating: 4.7,
    reviewCount: 89,
    isOpen: true,
    busyLevel: 'low',
    nextTestRideSlot: '1:00 PM Today',
    amenities: ['WiFi', 'AC Waiting Area', 'Kids Zone'],
    modelsAvailable: ['Rizta', '450X'],
    coverImage: '/assets/vanasathalipuram.webp',
    gallery: ['/assets/gallery3.jpg'],
    offers: ['Festival Discount', 'Exchange Bonus'],
    staff: [{ name: 'Anil Reddy', role: 'Sales Manager', image: '/assets/staff2.jpg' }],
    responseTime: '< 4 minutes',
    testRidesThisWeek: 56,
    directionsUrl: 'https://maps.app.goo.gl/j4xL2i3t3C9hfS1h8',
  },
  {
    id: 3,
    name: 'Ather Electric Scooter Showroom, Malakpet',
    type: 'showroom',
    city: 'Hyderabad',
    address: 'Ground Floor, No 16/2/705/9/6/1/A, Malakpet, Hyderabad, Telangana 500036',
    pincode: '500036',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 9:00 PM',
    coordinates: { lat: 17.4122, lng: 78.4500 },
    rating: 4.9,
    reviewCount: 156,
    isOpen: true,
    busyLevel: 'high',
    nextTestRideSlot: '5:00 PM Today',
    amenities: ['Test Track', 'Digital Experience Zone'],
    modelsAvailable: ['Rizta', '450X', '450 Apex'],
    coverImage: '/assets/malakpet.jpg',
    gallery: ['/assets/gallery4.jpg', '/assets/gallery5.jpg'],
    offers: ['Extended Warranty', 'Free Accessories'],
    staff: [{ name: 'Praveen Kumar', role: 'Sales Executive', image: '/assets/staff3.jpg' }],
    responseTime: '< 3 minutes',
    testRidesThisWeek: 102,
    directionsUrl: 'https://maps.app.goo.gl/tGGe5bdnfByyCH3D8',
  },
  {
    id: 4,
    name: 'Raam Ather Electric Scooter Showroom, Toli Chowki',
    type: 'showroom',
    city: 'Hyderabad',
    address: 'Raam Ather- Authorised Dealer of Raam Electric Shaikpet,Toli Chowki, Hyderabad, Telangana 500008',
    pincode: '500008',
    phone: '+91 9032333833', 
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 7:00 PM',
    coordinates: { lat: 17.4240, lng: 78.3489 },
    rating: 4.6,
    reviewCount: 78,
    isOpen: true,
    busyLevel: 'medium',
    nextTestRideSlot: '12:00 PM Today',
    amenities: ['WiFi', 'AC Waiting Area'],
    modelsAvailable: ['450X', '450 Apex'],
    coverImage: '/assets/tolichowki.jpg',
    gallery: ['/assets/gallery6.jpg'],
    offers: ['Student Discount', 'Free Helmet'],
    staff: [{ name: 'Sana Begum', role: 'Sales Associate', image: '/assets/staff4.jpg' }],
    responseTime: '< 6 minutes',
    testRidesThisWeek: 41,
    directionsUrl: 'https://maps.app.goo.gl/6gGRCqfX6fo6yBkJ9',
  },
  {
    id: 5,
    name: 'Raam Ather Electric Scooter Showroom, Kompally',
    type: 'showroom',
    city: 'Hyderabad',
    address: 'ATHARV PRIDE, Plot No:5 S.Y No:160 Pillar No:12 Kompally, Malkajgiri, Mandal, Telangana 500014',
    pincode: '500014',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 17.5425, lng: 78.4911 },
    rating: 4.8,
    reviewCount: 203,
    isOpen: true,
    busyLevel: 'low',
    nextTestRideSlot: '11:30 AM Today',
    amenities: ['WiFi', 'AC Waiting Area', 'Charging Station'],
    modelsAvailable: ['Rizta', '450X'],
    coverImage: '/assets/kompally.jpg',
    gallery: ['/assets/gallery7.jpg'],
    offers: ['Festival Offer', 'Cashback on EMI'],
    staff: [{ name: 'Mahesh Varma', role: 'Sales Lead', image: '/assets/staff5.jpg' }],
    responseTime: '< 2 minutes',
    testRidesThisWeek: 87,
    directionsUrl: 'https://maps.app.goo.gl/oBPjzZVQK1w4aP759',
  },
  {
    id: 6,
    name: 'Raam Ather Electric Scooter Showroom, Attapur',
    type: 'showroom',
    city: 'Hyderabad',
    address: 'Rajendra Nagar Road, Attapur, Hyderabad, Telangana 500048',
    pincode: '500048',
    phone: '+91 9032333833',
    whatsapp: '+91 9032333833',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 17.5425, lng: 78.4911 },
    rating: 4.8,
    reviewCount: 203,
    isOpen: true,
    busyLevel: 'high',
    nextTestRideSlot: '4:30 PM Today',
    amenities: ['WiFi', 'AC Waiting Area', 'Café'],
    modelsAvailable: ['450X', '450 Apex'],
    coverImage: '/assets/attapur.jpg',
    gallery: ['/assets/gallery8.jpg'],
    offers: ['Cashback Offer', 'Insurance Free'],
    staff: [{ name: 'Imran Ali', role: 'Sales Executive', image: '/assets/staff6.jpg' }],
    responseTime: '< 5 minutes',
    testRidesThisWeek: 76,
    directionsUrl: 'https://maps.app.goo.gl/Z2aMwwsVQzybvUAf9',
  },
  // Chennai Locations
  {
    id: 7,
    name: 'Ather Test Ride Zone (RAAM ELECTRIC)',
    type: 'test-ride' as const,
    city: 'Chennai' as const,
    address: 'No 85/A, Thiruvottiyur High Rd, Kaladipet, Tiruvottiyur, Chennai, Tamil Nadu 600019',
    pincode: '600019',
    phone: '+91 8712600677',
    whatsapp: '+91 8712600677',
    hours: '10:00 AM - 8:00 PM',
    coordinates: { lat: 13.1594, lng: 80.3022 },
    rating: 4.7,
    reviewCount: 85,
    isOpen: true,
    busyLevel: 'medium' as const,
    nextTestRideSlot: '3:30 PM Today',
    amenities: ['Test Track', 'Digital Experience Zone', 'WiFi'],
    modelsAvailable: ['Rizta', '450X', '450 Apex'],
    coverImage: '/assets/tiruvottiyur.webp',
    gallery: ['/assets/test7.jpg', '/assets/test8.jpg'],
    offers: ['Extended Test Rides', 'Weekend Specials'],
    staff: [{ name: 'Raghavan Nair', role: 'Test Ride Coordinator', image: '/assets/staff13.jpg' }],
    responseTime: '< 5 minutes',
    testRidesThisWeek: 67
  },
  {
    id: 8,
    name: 'Ather Electric Scooter Showroom',
    type: 'showroom' as const,
    city: 'Chennai' as const,
    address: 'No.153, Wallace Garden 2nd St, Thousand Lights West, Nungambakkam, Chennai, Tamil Nadu 600006',
    pincode: '600006',
    phone: '+91 9240013828',
    whatsapp: '+91 9240013828',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 13.0594, lng: 80.2407 },
    rating: 4.8,
    reviewCount: 142,
    isOpen: true,
    busyLevel: 'medium' as const,
    nextTestRideSlot: '2:15 PM Today',
    amenities: ['WiFi', 'AC Waiting Area', 'Test Track', 'Charging Station'],
    modelsAvailable: ['Rizta', '450X', '450 Apex'],
    coverImage: '/assets/Nungambakkam.webp',
    gallery: ['/assets/chennai7.jpg', '/assets/chennai8.jpg'],
    offers: ['Premium Experience', 'Exchange Bonus'],
    staff: [{ name: 'Meena Krishnan', role: 'Sales Manager', image: '/assets/staff14.jpg' }],
    responseTime: '< 4 minutes',
    testRidesThisWeek: 79
  },
  {
    id: 9,
    name: 'Ather Electric Scooter Showroom',
    type: 'showroom' as const,
    city: 'Chennai' as const,
    address: '9/5, Mount Poonamallee Rd, Venugopal Nagar, Porur, Chennai, Tamil Nadu 600116',
    pincode: '600116',
    phone: '+91 8884261717',
    whatsapp: '+91 8884261717',
    hours: '10:00 AM - 8:30 PM',
    coordinates: { lat: 13.0358, lng: 80.1562 },
    rating: 4.6,
    reviewCount: 96,
    isOpen: true,
    busyLevel: 'low' as const,
    nextTestRideSlot: '1:45 PM Today',
    amenities: ['WiFi', 'AC Waiting Area', 'Test Track', 'Premium Lounge'],
    modelsAvailable: ['Rizta', '450X'],
    coverImage: '/assets/porur.webp',
    gallery: ['/assets/chennai9.jpg', '/assets/chennai10.jpg'],
    offers: ['New Launch Offer', 'Corporate Discount'],
    staff: [{ name: 'Arun Kumar', role: 'Sales Executive', image: '/assets/staff15.jpg' }],
    responseTime: '< 3 minutes',
    testRidesThisWeek: 52
  }
];

  return (
    <div className="min-h-screen">
      {/* Premium Experience Center Page */}
      <PremiumExperienceCenter outlets={outlets} />

      {/* Test Ride Flow Modal */}
      {showTestRideFlow && selectedOutlet && (
        <TestRideFlow 
          outlet={selectedOutlet}
          onClose={() => setShowTestRideFlow(false)}
        />
      )}

      {/* WhatsApp Concierge Modal */}
      {showWhatsAppChat && selectedOutlet && (
        <WhatsAppConcierge 
          outlet={selectedOutlet}
          onClose={() => setShowWhatsAppChat(false)}
        />
      )}

      {/* Interactive Pin Details Modal */}
      <InteractivePinDetails 
        outlet={selectedOutlet}
        onClose={() => setSelectedOutlet(null)}
      />
    </div>
  );
};

export default StoreLocatorClient;