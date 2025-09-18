import { Award, Trophy, Star, Medal } from 'lucide-react';

export interface AwardItem {
  id: number;
  title: string;
  description: string;
  year: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
  shadowColor: string;
  imagePath: string;
  imageAlt: string;
}

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 1,
    title: "Excellence in Partnership",
    description: "Recognized as the top-performing official franchise partner for outstanding business development and customer satisfaction.",
    year: "2024",
    icon: Trophy,
    gradient: "from-amber-400 via-yellow-500 to-orange-600",
    shadowColor: "shadow-amber-500/30",
    imagePath: "/Ather-Assets/thumbnails/smgrid4.jpg",
    imageAlt: "Excellence in Partnership Award ceremony - Raam Ather recognized as top-performing Ather Energy franchise partner for outstanding business development and customer satisfaction in 2024"
  },
  {
    id: 2,
    title: "Innovation Leadership",
    description: "Awarded for pioneering innovative solutions and driving technological advancement in the energy sector.",
    year: "2023",
    icon: Star,
    gradient: "from-blue-400 via-purple-500 to-indigo-600",
    shadowColor: "shadow-purple-500/30",
    imagePath: "/Ather-Assets/thumbnails/smgrid5.jpg",
    imageAlt: "Innovation Leadership Award - Raam Ather honored for pioneering innovative solutions and driving technological advancement in electric vehicle sector in 2023"
  },
  {
    id: 3,
    title: "Sustainability Champion",
    description: "Honored for exceptional commitment to environmental sustainability and promoting clean energy solutions.",
    year: "2023",
    icon: Award,
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    shadowColor: "shadow-green-500/30",
    imagePath: "/Ather-Assets/thumbnails/smgrid5.jpg",
    imageAlt: "Sustainability Champion Award - Raam Ather recognized for exceptional commitment to environmental sustainability and promoting clean energy electric vehicle solutions in 2023"
  },
  {
    id: 4,
    title: "Customer Excellence",
    description: "Celebrated for delivering exceptional customer service and maintaining the highest standards of client satisfaction.",
    year: "2022",
    icon: Medal,
    gradient: "from-rose-400 via-pink-500 to-red-600",
    shadowColor: "shadow-rose-500/30",
    imagePath: "/Ather-Assets/thumbnails/smgrid4.jpg",
    imageAlt: "Customer Excellence Medal - Raam Ather celebrated for delivering exceptional customer service and maintaining highest standards of client satisfaction in electric vehicle retail in 2022"
  }
];

export const AWARDS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Awards and Achievements - Raam Ather",
  "description": "Recognition and awards received by Raam Ather as an official Ather Energy franchise partner for excellence in electric vehicle retail and customer service",
  "itemListElement": AWARDS_DATA.map((award, index) => ({
    "@type": "Achievement",
    "position": index + 1,
    "name": award.title,
    "description": award.description,
    "dateReceived": award.year,
    "recognizingOrganization": {
      "@type": "Organization",
      "name": "Ather Energy"
    },
    "recipient": {
      "@type": "Organization",
      "name": "Raam Ather",
      "description": "Official Ather Energy franchise partner"
    }
  }))
};
