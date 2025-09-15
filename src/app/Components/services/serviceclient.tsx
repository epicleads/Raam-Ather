"use client";

import React from "react";
import Slider from "react-slick";
import {
  Wrench,
  BatteryCharging,
  Zap,
  Plug,
  ShieldCheck,
  Settings,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Wrench className="w-8 h-8 text-green-600" />,
    title: "General Service & Maintenance",
    description:
      "Regular check-ups and servicing to keep your Ather electric bike performing at its best.",
  },
  {
    icon: <BatteryCharging className="w-8 h-8 text-green-600" />,
    title: "Battery Health & Replacement",
    description:
      "Comprehensive battery diagnostics, performance checks, and replacements when needed.",
  },
  {
    icon: <Zap className="w-8 h-8 text-green-600" />,
    title: "Performance Optimization",
    description:
      "Tuning and software updates to ensure maximum efficiency and riding comfort.",
  },
  {
    icon: <Plug className="w-8 h-8 text-green-600" />,
    title: "Charging Solutions",
    description:
      "Home charger installation, fast-charging support, and public charging station guidance.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: "Warranty & Protection Plans",
    description:
      "Coverage for major components and extended protection for peace of mind.",
  },
  {
    icon: <Settings className="w-8 h-8 text-green-600" />,
    title: "Custom Upgrades & Accessories",
    description:
      "Tailored add-ons like smart dashboards, comfort seats, and safety gear.",
  },
];

export default function ServicesSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
  };

  const ServiceCard = ({ icon, title, description }: Service) => (
    <div className="bg-white border border-green-400 p-6 rounded-lg shadow-md h-full flex flex-col hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Icon + Title Row */}
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-gray-900 font-semibold">{title}</h3>
      </div>
      {/* Description */}
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-4">
          Ather Electric Bike Services
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our service centers are equipped to handle all your Ather electric bike needs,
          ensuring performance, safety, and a smooth ride for years to come.
        </p>

        {/* Desktop & Tablet - Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Mobile - Slider */}
        <div className="sm:hidden">
          <Slider {...settings}>
            {services.map((service, index) => (
              <div key={index} className="px-3">
                <ServiceCard {...service} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
