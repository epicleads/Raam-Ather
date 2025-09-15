// src/app/Components/accessories-header/accessories-header.config.ts
import { NavItem, CTAItem } from "./accessories-header.types";

export const accessoriesNavItems: NavItem[] = [
  {
    label: "450 Accessories",
    href: "/accessories/450",
    dropdown: [
      { label: "Chargers", href: "/accessories/450/chargers" },
      { label: "Side Stand", href: "/accessories/450/sidestand" },
      { label: "Seat Covers", href: "/accessories/450/seatcovers" },
      { label: "Body Guards", href: "/accessories/450/bodyguards" },
      { label: "Floor Mats", href: "/accessories/450/floor-mats" }
    ]
  },
  {
    label: "Rizta Accessories",
    href: "/accessories/rizta",
    dropdown: [
      { label: "Foot Rests", href: "/accessories/rizta/footrests" },
      { label: "Rear Guard", href: "/accessories/rizta/rearguard" },
      { label: "Body Guards", href: "/accessories/rizta/bodyguards" },
      { label: "Floor Mats", href: "/accessories/rizta/floor-mats" },
      { label: "Seat Covers", href: "/accessories/rizta/seatcovers" }
    ]
  },
  {
    label: "Smart Helmets",
    href: "/accessories/helmets",
    dropdown: [
      { label: "Full Face", href: "/accessories/helmets/fullface" },
      { label: "Half Face", href: "/accessories/helmets/halfface" },
      { label: "Modular", href: "/accessories/helmets/modular" },
      { label: "Communication", href: "/accessories/helmets/communication" }
    ]
  }
];

export const accessoriesCTAs: CTAItem[] = [
  { label: "Cart", href: "/cart" },
  { label: "Search", href: "/search" },
];
