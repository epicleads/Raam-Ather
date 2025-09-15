import AccessoriesNavItem from "./AccessoriesNavItem";
import { accessoriesNavItems } from "../accessories-header.config";

export default function AccessoriesNavBar() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {accessoriesNavItems.map((item) => (
        <AccessoriesNavItem key={item.label} item={item} />
      ))}
    </nav>
  );
}
