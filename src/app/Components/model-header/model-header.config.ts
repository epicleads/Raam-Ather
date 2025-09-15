import { CTA, NavItem } from "./model-header.types";

export const modelNavItems: NavItem[] = [
    { label: "Overview", id: "overview", href: "#overview" },
    { label: "Gallery", id: "gallery", href: "#gallery" },
    { label: "Comfort", id: "comfort", href: "#comfort" },
    { label: "Safety", id: "safety", href: "#safety" },
    { label: "Connectivity", id: "connectivity", href: "#connectivity" },
    { label: "Colour", id: "colour", href: "#colour" },
    { label: "Savings", id: "savings", href: "#savings" },
    { label: "Pricing", id: "pricing", href: "#pricing" },
  ];
  
  export const ctaButtons: CTA[] = [
    { label: "Book now", variant: "primary", href: "#book" },
    { label: "Test ride", variant: "secondary", href: "#testride" },
  ];
  
  export const colors = {
    black: "#0D0D0D",
    white: "#FFFFFF",
    green: "#00FF66",
  };
  