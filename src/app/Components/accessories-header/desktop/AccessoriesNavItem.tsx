// src/app/Components/accessories-header/desktop/AccessoriesNavItem.tsx
import { NavItem } from "../accessories-header.types";
import AccessoriesNavItemClient from "./AccessoriesNavItem.client";

export default function AccessoriesNavItem({ item }: { item: NavItem }) {
  // ✅ Server component just passes data down
  return <AccessoriesNavItemClient item={item} />;
}
