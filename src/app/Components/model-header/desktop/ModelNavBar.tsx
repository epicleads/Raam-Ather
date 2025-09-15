"use client";

import { modelNavItems, ctaButtons } from "../model-header.config";
import ModelNavItem from "./ModelNavItem";
import ModelCTAs from "../shared/ModelCTAs";
import ModelLogo from "../shared/ModelLogo";
import { scroller } from "react-scroll";

export default function ModelNavBar({
  activeSection,
  scrollDepth,
  modelName,
}: {
  activeSection: string;
  scrollDepth: number;
  modelName: string;
}) {
  const handleScroll = (id: string) => {
    scroller.scrollTo(id, {
      smooth: true,
      offset: -72, // Match FloatingHeader's offset
      duration: 500,
    });
  };

  return (
    <div className="flex items-center w-full">
      {/* Logo Section - Match FloatingHeader positioning */}
      <div className="flex-shrink-0" style={{ marginLeft: '0px' }}>
        <ModelLogo text={modelName} scrollDepth={scrollDepth} />
      </div>

      {/* Navigation Items - Match FloatingHeader spacing */}
      <nav className="hidden lg:flex items-center space-x-6 ml-8">
        {modelNavItems.map((item) => (
          <ModelNavItem
            key={item.id}
            item={item}
            isActive={activeSection === item.href}
            onClick={() => handleScroll(item.id)}
            scrollDepth={scrollDepth}
          />
        ))}
      </nav>

      {/* Spacer to push right items to the end - Match FloatingHeader */}
      <div className="flex-1"></div>

      {/* CTA Buttons & Menu - Match FloatingHeader positioning */}
      <div className="hidden lg:flex items-center space-x-4 mr-8">
        <ModelCTAs ctas={ctaButtons} scrollDepth={scrollDepth} />
        <button 
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
            <div className="w-5 h-0.5 bg-black"></div>
            <div className="w-5 h-0.5 bg-black"></div>
            <div className="w-5 h-0.5 bg-black"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
