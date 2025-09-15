"use client";

import { NavItem } from "../model-header.types";
import { scroller } from "react-scroll";

export default function ModelMobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const handleClick = () => {
    scroller.scrollTo(item.id, {
      smooth: true,
      offset: -60,
      duration: 500,
    });
    onClose();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left py-4 text-lg text-white hover:text-green-500 transition"
    >
      {item.label}
    </button>
  );
}
