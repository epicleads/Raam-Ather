import { BottomNavClient } from "../client/BottomNav.client";
import type { NavItem } from "../bottomNav.types";

export const revalidate = 60;

const navItems: NavItem[] = [
  
  { id: "test-drive", label: "Test Drive", href: "#", icon: "calendar" },
  
  { id: "dealers", label: "Contact Us", href: "/ContactUs", icon: "map-pin" },
];

export default function BottomNav() {
  return <BottomNavClient items={navItems} />;
}
