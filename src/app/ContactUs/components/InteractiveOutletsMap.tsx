"use client";
import React from 'react';
import PremiumOutletCards from '@/app/StoreLocator/components/PremiumOutletCards';
import { PopupProvider } from '@/app/Components/popups/PopupProvider';

// Define Outlet type locally with all required properties as non-optional for compatibility
export type Outlet = {
  id: number;
  name: string;
  type: "showroom" | "test-ride" | "service";
  city: "Hyderabad" | "Chennai";
  address: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  hours: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  busyLevel: "medium" | "low" | "high";
  nextTestRideSlot?: string;
  amenities: string[];
  modelsAvailable: string[];
  coverImage: string;
  gallery: string[];
  offers: string[];
  staff: { name: string; role: string; image: string }[];
  responseTime: string;
  testRidesThisWeek: number;
};

const InteractiveOutletsMap = () => {
  const [selectedOutlet, setSelectedOutlet] = React.useState<Outlet | null>(null);
  
  // Outlet data from StoreLocator
  const outlets = [
    // Hyderabad Locations
    {
      id: 1,
      name: 'Raam Ather Electric Scooter Showroom, Somajiguda',
      type: 'showroom' as const,
      city: 'Hyderabad' as const,
      address: '6-3-885/7/B, G-2, Ground, Amit Plaza, Durga Nagar Colony, Somajiguda, Hyderabad, Telangana 500082',
      pincode: '500082',
      phone: '+91 9032333833',
      whatsapp: '+91 9032333833',
      hours: '10:00 AM - 8:30 PM',
      coordinates: { lat: 17.4326, lng: 78.4071 },
      rating: 4.8,
      reviewCount: 124,
      isOpen: true,
      busyLevel: 'medium' as const,
      nextTestRideSlot: '2:30 PM Today',
      amenities: ['WiFi', 'AC Waiting Area', 'Test Track', 'Charging Station'],
      modelsAvailable: ['Rizta', '450X', '450 Apex'],
      coverImage: '/assets/somajiguda.jpg',
      gallery: ['/assets/gallery1.jpg', '/assets/gallery2.jpg'],
      offers: ['Special EMI rates', '5 Year Warranty'],
      staff: [{ name: 'Rajesh Kumar', role: 'Sales Manager', image: '/assets/staff1.jpg' }],
      responseTime: '< 5 minutes',
      testRidesThisWeek: 47
    },
    {
      id: 2,
      name: 'Raam Ather Space - Electric Scooter Experience Center Begumpet',
      type: 'showroom' as const,
      city: 'Hyderabad' as const,
      address: '1-10-7 & VISHRANTHI NILAYAM, Prakash Nagar, Begumpet, Secunderabad, Hyderabad, Telangana 500016',
      pincode: '500016',
      phone: '+91 9032333833',
      whatsapp: '+91 9032333833',
      hours: '10:00 AM - 7:00 PM',
      coordinates: { lat: 17.4443, lng: 78.4685 },
      rating: 4.7,
      reviewCount: 89,
      isOpen: true,
      busyLevel: 'low' as const,
      amenities: ['WiFi', 'AC Waiting Area', 'Experience Center', 'Digital Display'],
      modelsAvailable: ['Rizta', '450X', '450 Apex'],
      coverImage: '/assets/begampet.jpg',
      gallery: ['/assets/begampet1.jpg', '/assets/begumpet2.jpg'],
      offers: ['Experience Center Special', 'Test Drive Package'],
      staff: [{ name: 'Priya Sharma', role: 'Experience Manager', image: '/assets/staff2.jpg' }],
      responseTime: '< 3 minutes',
      testRidesThisWeek: 35
    },
    {
      id: 3,
      name: 'Raam Ather Space - Electric Scooter Experience Center Sri Nagar Colony',
      type: 'showroom' as const,
      city: 'Hyderabad' as const,
      address: 'plot no: 311 & 312, phase 3, Sri Nagar Colony, Kamalapuri Colony, Banjara Hills, Hyderabad, Telangana 500073',
      pincode: '500073',
      phone: '+91 9032333833',
      whatsapp: '+91 9032333833',
      hours: '10:00 AM - 9:00 PM',
      coordinates: { lat: 17.4122, lng: 78.4500 },
      rating: 4.9,
      reviewCount: 156,
      isOpen: true,
      busyLevel: 'medium' as const,
      nextTestRideSlot: '4:00 PM Today',
      amenities: ['WiFi', 'AC Waiting Area', 'Premium Experience Center', 'Charging Station'],
      modelsAvailable: ['Rizta', '450X', '450 Apex'],
      coverImage: '/assets/sri nagar colony.jpg',
      gallery: ['/assets/srinagar1.jpg', '/assets/srinagar2.jpg'],
      offers: ['Premium Experience', 'Extended Test Rides'],
      staff: [{ name: 'Karthik Reddy', role: 'Senior Sales Manager', image: '/assets/staff4.jpg' }],
      responseTime: '< 2 minutes',
      testRidesThisWeek: 89
    },
    {
      id: 4,
      name: 'Raam Ather- Authorised Dealer of Raam Electric Two wheelers Shaikpet',
      type: 'showroom' as const,
      city: 'Hyderabad' as const,
      address: 'Shaikpet, Toli Chowki, Hyderabad, Telangana 500008',
      pincode: '500008',
      phone: '+91 9032333833',
      whatsapp: '+91 9032333833',
      hours: '10:00 AM - 7:00 PM',
      coordinates: { lat: 17.4240, lng: 78.3489 },
      rating: 4.6,
      reviewCount: 78,
      isOpen: true,
      busyLevel: 'medium' as const,
      nextTestRideSlot: '1:00 PM Today',
      amenities: ['WiFi', 'Service Center', 'Authorized Parts', 'Customer Lounge'],
      modelsAvailable: ['Rizta', '450X'],
      coverImage: '/assets/shaikpet.jpg',
      gallery: ['/assets/shaikpet1.jpg', '/assets/shaikpet2.jpg'],
      offers: ['Authorized Dealer Discount', 'Service Package'],
      staff: [{ name: 'Suresh Reddy', role: 'Authorized Dealer', image: '/assets/staff6.jpg' }],
      responseTime: '< 4 minutes',
      testRidesThisWeek: 45
    },
    {
      id: 5,
      name: 'Raam Ather Electric Scooter Showroom, Kompally',
      type: 'showroom' as const,
      city: 'Hyderabad' as const,
      address: 'ATHARV PRIDE, Plot No:5 S.Y No:160 Pillar No:12 Kompally, Malkajgiri, Mandal, Telangana 500014',
      pincode: '500014',
      phone: '+91 9032333833',
      whatsapp: '+91 9032333833',
      hours: '10:00 AM - 8:30 PM',
      coordinates: { lat: 17.5425, lng: 78.4911 },
      rating: 4.8,
      reviewCount: 203,
      isOpen: true,
      busyLevel: 'low' as const,
      nextTestRideSlot: '1:30 PM Today',
      amenities: ['WiFi', 'AC Waiting Area', 'Large Showroom', 'Parking Space'],
      modelsAvailable: ['Rizta', '450X', '450 Apex'],
      coverImage: '/assets/kompally.jpg',
      gallery: ['/assets/kompally1.jpg', '/assets/kompally2.jpg'],
      offers: ['Grand Opening Offer', 'Extended Warranty'],
      staff: [{ name: 'Ramesh Kumar', role: 'Showroom Manager', image: '/assets/staff7.jpg' }],
      responseTime: '< 3 minutes',
      testRidesThisWeek: 63
    },

    // Chennai Locations
    {
      id: 6,
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
      coverImage: '/assets/shaikpet.jpg',
      gallery: ['/assets/test7.jpg', '/assets/test8.jpg'],
      offers: ['Extended Test Rides', 'Weekend Specials'],
      staff: [{ name: 'Raghavan Nair', role: 'Test Ride Coordinator', image: '/assets/staff13.jpg' }],
      responseTime: '< 5 minutes',
      testRidesThisWeek: 67
    },
    {
      id: 7,
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
      coverImage: '/assets/sri nagar colony.jpg',
      gallery: ['/assets/chennai7.jpg', '/assets/chennai8.jpg'],
      offers: ['Premium Experience', 'Exchange Bonus'],
      staff: [{ name: 'Meena Krishnan', role: 'Sales Manager', image: '/assets/staff14.jpg' }],
      responseTime: '< 4 minutes',
      testRidesThisWeek: 79
    },
    {
      id: 8,
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
      coverImage: '/assets/sri nagar colony.jpg',
      gallery: ['/assets/chennai9.jpg', '/assets/chennai10.jpg'],
      offers: ['New Launch Offer', 'Corporate Discount'],
      staff: [{ name: 'Arun Kumar', role: 'Sales Executive', image: '/assets/staff15.jpg' }],
      responseTime: '< 3 minutes',
      testRidesThisWeek: 52
    }
  ];


  return (
    <PopupProvider>
      <div>
        {/* Premium Outlet Cards */}
        <PremiumOutletCards 
          outlets={outlets}
          selectedOutlet={selectedOutlet}
          setSelectedOutlet={setSelectedOutlet}
          setShowWhatsAppChat={() => {}}
        />
      </div>
    </PopupProvider>
  );
};

export default InteractiveOutletsMap;