import { riztaFaq } from './riztaFaq'
import { FaqItem } from '@/app/faq/faqServer'

// Location-specific FAQ data for better local SEO
export const hyderabadRiztaFaq: FaqItem[] = [
  ...riztaFaq,
  {
    question: "Where can I buy Ather Rizta in Hyderabad?",
    answer: "You can purchase the Ather Rizta at our Hyderabad experience centers located in Banjara Hills, Jubilee Hills, and Gachibowli. Visit our store locator to find the nearest center and book a test ride."
  },
  {
    question: "How many Ather charging points are available in Hyderabad?",
    answer: "Hyderabad has 200+ Ather Grid™ fast charging points strategically located across the city including Hitec City, Jubilee Hills, Banjara Hills, Secunderabad, and major IT corridors for convenient charging."
  },
  {
    question: "What is the on-road price of Ather Rizta in Hyderabad?",
    answer: "The on-road price of Ather Rizta in Hyderabad starts from ₹1,25,000 (approximately) including registration, insurance, and state subsidies. Prices may vary based on the variant and current government incentives."
  },
  {
    question: "Is there any government subsidy for electric scooters in Telangana?",
    answer: "Yes, Telangana government offers attractive subsidies on electric vehicles. You can avail up to ₹15,000 subsidy on Ather Rizta purchase in Hyderabad. Check with our Hyderabad centers for current subsidy details."
  },
  {
    question: "Where are Ather service centers located in Hyderabad?",
    answer: "Ather has multiple service centers in Hyderabad including locations in Banjara Hills, Kompally, Miyapur, and LB Nagar. Our certified technicians provide doorstep service and pickup-drop facility across Hyderabad."
  }
]

export const chennaiRiztaFaq: FaqItem[] = [
  ...riztaFaq,
  {
    question: "Where can I buy Ather Rizta in Chennai?",
    answer: "Ather Rizta is available at our Chennai experience centers in T. Nagar, Anna Nagar, Velachery, and OMR. Visit our Chennai stores for test rides and expert consultation on the best variant for your needs."
  },
  {
    question: "How many Ather charging stations are there in Chennai?",
    answer: "Chennai boasts 250+ Ather Grid™ charging points across the city including Anna Salai, OMR, GST Road, ECR, and major commercial areas. Find the nearest charging point using the Ather mobile app."
  },
  {
    question: "What is the on-road price of Ather Rizta in Chennai?",
    answer: "The on-road price of Ather Rizta in Chennai starts from ₹1,23,000 (approximately) including all charges and state benefits. Visit our Chennai showrooms for exact pricing and available offers."
  },
  {
    question: "What government incentives are available for EV buyers in Tamil Nadu?",
    answer: "Tamil Nadu offers excellent EV incentives including purchase subsidy, registration fee waiver, and road tax exemption. Chennai residents can save up to ₹20,000 on Ather Rizta purchase through government schemes."
  },
  {
    question: "Where can I get Ather Rizta serviced in Chennai?",
    answer: "Ather has service centers across Chennai in T. Nagar, Anna Nagar, Velachery, Tambaram, and OMR. We also provide doorstep service and 24x7 roadside assistance throughout Chennai and surrounding areas."
  }
]

// Function to get location-specific FAQ
export function getLocationSpecificFaq(location?: string): FaqItem[] {
  switch (location?.toLowerCase()) {
    case 'hyderabad':
      return hyderabadRiztaFaq
    case 'chennai':
      return chennaiRiztaFaq
    default:
      return riztaFaq
  }
}

// SEO-optimized keywords for different locations
export const locationKeywords = {
  hyderabad: [
    'Ather Rizta Hyderabad',
    'electric scooter Hyderabad',
    'EV scooter Telangana',
    'Ather showroom Hyderabad',
    'electric vehicle Hyderabad price',
    'Ather charging points Hyderabad',
    'EV subsidy Telangana'
  ],
  chennai: [
    'Ather Rizta Chennai',
    'electric scooter Chennai',
    'EV scooter Tamil Nadu',
    'Ather showroom Chennai',
    'electric vehicle Chennai price',
    'Ather charging stations Chennai',
    'EV subsidy Tamil Nadu'
  ]
}