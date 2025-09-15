import { ChargingMapClient } from '../client/ChargingMap.client';
import { ChargingMapProps } from '../chargingMap.types';
import { ChargingMapSEO } from './ChargingMapSEO';

export const revalidate = 120; // ISR refresh every 2 mins

const chargingData: ChargingMapProps = {
  title: "India's largest EV two-wheeler fast charging network",
  subtitle: "4300+ Fast chargers and growing",
  ctaLabel: "Discover charging options",
  ctaHref: "/charging-stations",
  imageSrc: "/Ather-Assets/Home/Map_Desktop_result_db0d31ab3d.webp", // Updated path
  imageAlt: "Ather Grid Map",
  stats: "4300+"
};

export default function ChargingMap() {
  return (
    <section className="relative w-full py-16 bg-black text-white">
      <ChargingMapSEO
        title={chargingData.title}
        description={`${chargingData.title} - ${chargingData.subtitle}.`}
      />
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:pr-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{chargingData.title}</h2>
          <p className="text-xl text-gray-300 mb-6">{chargingData.subtitle}</p>
          <a
            href={chargingData.ctaHref}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline text-lg transition-colors"
          >
            {chargingData.ctaLabel} →
          </a>
        </div>
        {/* Right Map */}
        <div className="relative flex justify-center lg:justify-end">
          <ChargingMapClient
            imageSrc={chargingData.imageSrc}
            imageAlt={chargingData.imageAlt}
          />
          <div className="absolute bottom-6 right-6 bg-black bg-opacity-60 px-4 py-2 rounded-lg">
            <p className="text-xl font-bold">{chargingData.stats}</p>
            <p className="text-sm opacity-80">Fast chargers and growing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
