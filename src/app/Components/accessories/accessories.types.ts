export interface Accessory {
  id: string;
  title: string;
  description?: string;
  price?: string;
  image: string;
  href: string;
}

export interface AccessoriesData {
  sectionTitle: string;
  sectionSubtitle?: string;
  accessories: Accessory[];
}

export interface AccessoriesProps {
  data: AccessoriesData;
}