export interface AtherModel {
  id: number;
  name: string;
  price: string;
  batteryCapacity: string;
  range: string;
  colors: string[];
  defaultColor: string;
  features: string[];
  imageUrl: string;
  isNew: boolean;
  description: string;
  url: string;
  topSpeed: string;
  motorPower: string;
}

export const ATHER_MODELS: AtherModel[] = [
  {
    id: 1,
    name: "450S",
    price: "1,19,999",
    batteryCapacity: "3.7 kWh",
    range: "157 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Smart Connectivity", "Fast Charging", "Regenerative Braking", "LED Lighting"],
    imageUrl: "/Ather-Assets/Home/images/450stillwhite.png",
    isNew: false,
    description: "Perfect balance of performance and efficiency for daily commuting.",
    url: "/ather-450s",
    topSpeed: "80 km/h",
    motorPower: "6.2 kW"
  },
  {
    id: 2,
    name: "450X",
    price: "1,39,999",
    batteryCapacity: "3.7 kWh",
    range: "157 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Smart Connectivity", "Fast Charging", "Regenerative Braking", "LED Lighting"],
    imageUrl: "/Ather-Assets/Home/images/450xlr.png",
    isNew: false,
    description: "Advanced features with premium performance for the modern rider.",
    url: "/ather-450x",
    topSpeed: "80 km/h",
    motorPower: "6.2 kW"
  },
  {
    id: 3,
    name: "450 Apex",
    price: "1,59,999",
    batteryCapacity: "3.7 kWh",
    range: "157 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Smart Connectivity", "Fast Charging", "Regenerative Braking", "LED Lighting"],
    imageUrl: "/Ather-Assets/Home/images/450apex.png",
    isNew: true,
    description: "Ultimate performance with cutting-edge technology and design.",
    url: "/ather-450-apex",
    topSpeed: "80 km/h",
    motorPower: "6.2 kW"
  },
  {
    id: 4,
    name: "Rizta",
    price: "1,09,999",
    batteryCapacity: "2.9 kWh",
    range: "123 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Family Focused", "Comfortable Seating", "Storage Space", "Easy Handling"],
    imageUrl: "/Ather-Assets/Home/images/rizta.png",
    isNew: true,
    description: "Family-focused scooter designed for comfort, space and practical everyday commuting.",
    url: "/rizta",
    topSpeed: "70 km/h",
    motorPower: "5.4 kW"
  }
];