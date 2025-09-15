export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export interface CTAButton {
  label: string;
  href: string;
  type: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export interface HeaderData {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  navigation: NavItem[];
  ctas: CTAButton[];
  mobileBottomNav: NavItem[];
  contact: {
    phone: string;
    displayText: string;
  };
}

export interface HeaderProps {
  data: HeaderData;
}
