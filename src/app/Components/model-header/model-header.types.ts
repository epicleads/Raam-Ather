export interface NavItem {
    label: string;
    id: string; // section id to scroll to
    href: string; // href for navigation
  }
  
  export interface CTA {
    label: string;
    variant: "primary" | "secondary";
    href: string;
  }
  