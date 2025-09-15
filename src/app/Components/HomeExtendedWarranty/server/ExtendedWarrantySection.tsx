import ExtendedWarrantyGrid from "../client/ExtendedWarrantyGrid.client";
import { WarrantyCard } from "../extended-warranty.types";

export const revalidate = 180; // ISR every 3 minutes

const demoCards: WarrantyCard[] = [
  {
    id: "priority-service",
    title: "Express Care",
    description: "Get faster service and reduce downtime with Raam Advantage.",
    icon: "wrench",
    href: "/Services",
  },
  {
    id: "dealer-benefits",
    title: "Dealer Advantage",
    description:
      "Exclusive Raam dealer benefits and special offers for loyal customers.",
    icon: "star",
  },
  {
    id: "extended-warranty",
    title: "Extended Warranty",
    description: "Peace of mind with extended coverage for your Ather scooter.",
    icon: "shield",
    href: "/Services",
  },
  {
    id: "expert-support",
    title: "Expert Support",
    description: "24/7 technical support and guidance from certified Ather experts.",
    icon: "star",
    href: "/ContactUs",
  },
];

export default function ExtendedWarrantySection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Raam Advantage – Extended Warranty
        </h2>
        <p className="text-gray-600 mt-3">
          Enjoy peace of mind with exclusive Raam Ather dealership benefits.
        </p>
      </div>

      <ExtendedWarrantyGrid items={demoCards} />
    </section>
  );
}
