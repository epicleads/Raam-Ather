import AccessoriesMobileMenuClient from "./AccessoriesMobileMenu.client";

interface AccessoriesMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessoriesMobileMenu(props: AccessoriesMobileMenuProps) {
  return <AccessoriesMobileMenuClient {...props} />;
}
