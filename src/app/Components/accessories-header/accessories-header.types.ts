// src/app/Components/accessories-header/accessories-header.types.ts
export interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  href: string;
}

export interface CTAItem {
  label: string;
  href: string;
}

export interface CartData {
  count: number;
}
  