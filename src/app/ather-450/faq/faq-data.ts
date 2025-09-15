export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'specifications' | 'pricing' | 'features' | 'charging' | 'maintenance' | 'warranty';
}

export const ather450FAQData: FAQItem[] = [
  {
    id: 'ather-450-price',
    question: 'What is the price of Ather 450 electric scooter?',
    answer: 'The Ather 450S starts at ₹1,19,841 (ex-showroom) and the Ather 450X starts at ₹1,46,999 (ex-showroom). Prices may vary based on location and applicable subsidies.',
    category: 'pricing'
  },
  {
    id: 'ather-450-range',
    question: 'What is the range of Ather 450?',
    answer: 'The Ather 450S offers a range of up to 161 km on a single charge, while the 450X provides up to 161 km range. The actual range may vary based on riding conditions, weather, and driving style.',
    category: 'specifications'
  },
  {
    id: 'ather-450-top-speed',
    question: 'What is the top speed of Ather 450?',
    answer: 'Both Ather 450S and 450X have a top speed of 90 km/h. The 450S accelerates from 0-40 km/h in 3.9 seconds, while the 450X does it in 3.3 seconds.',
    category: 'specifications'
  },
  {
    id: 'ather-450-charging-time',
    question: 'How long does it take to charge Ather 450?',
    answer: 'The Ather 450 takes approximately 5.5 hours for a complete charge using a home charger. With Ather Grid fast charging, you can charge from 0-80% in just 60 minutes.',
    category: 'charging'
  },
  {
    id: 'ather-450-features',
    question: 'What are the key features of Ather 450?',
    answer: 'Key features include smart dashboard with touchscreen (450X) or DeepView display (450S), Google Maps navigation, Alexa integration, Park Assist, AutoHold, multi-mode traction control, and OTA updates.',
    category: 'features'
  },
  {
    id: 'ather-450-difference',
    question: 'What is the difference between Ather 450S and 450X?',
    answer: 'The 450X features a 7" TFT touchscreen dashboard, faster acceleration (3.3s vs 3.9s), and additional smart features. The 450S has a DeepView display and offers excellent value for everyday commuting.',
    category: 'specifications'
  },
  {
    id: 'ather-450-warranty',
    question: 'What warranty does Ather 450 come with?',
    answer: 'Ather 450 comes with up to 8 years of battery warranty. The vehicle also includes comprehensive warranty coverage for motor, controller, and other key components.',
    category: 'warranty'
  },
  {
    id: 'ather-450-charging-cost',
    question: 'How much does it cost to charge Ather 450?',
    answer: 'Charging the Ather 450 at home costs approximately ₹25-30 for a full charge. At Ather Grid public charging stations, fast charging is available at competitive rates.',
    category: 'charging'
  },
  {
    id: 'ather-450-colors',
    question: 'What colors are available for Ather 450?',
    answer: 'Ather 450S is available in 4 color options: Stealth Blue, Cosmic Black, Still White, and Space Grey. The 450X offers 7 colors including all 450S colors plus Hyper Sand, True Red, and Lunar Grey.',
    category: 'specifications'
  },
  {
    id: 'ather-450-maintenance',
    question: 'What is the maintenance cost of Ather 450?',
    answer: 'Electric scooters have significantly lower maintenance costs compared to petrol vehicles. Ather 450 requires minimal maintenance with periodic checks for brakes, tires, and battery health.',
    category: 'maintenance'
  },
  {
    id: 'ather-450-test-ride',
    question: 'How can I book a test ride for Ather 450?',
    answer: 'You can easily book a test ride by clicking the "Book Test Ride" button on our website, visiting our showroom, or calling our customer service. Test rides are available at authorized Ather dealerships.',
    category: 'features'
  },
  {
    id: 'ather-450-financing',
    question: 'Are financing options available for Ather 450?',
    answer: 'Yes, we offer easy financing options with attractive EMI plans starting from low monthly payments. You can also benefit from government subsidies and electric vehicle incentives.',
    category: 'pricing'
  }
];

export const faqCategories = [
  { id: 'all', name: 'All FAQs' },
  { id: 'specifications', name: 'Specifications' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'features', name: 'Features' },
  { id: 'charging', name: 'Charging' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'warranty', name: 'Warranty' }
];