import { AccessoriesData } from '../accessories.types';
import AccessoriesSEO from './AccessoriesSEO';
import AccessoriesGrid from '../client/AccessoriesGrid.client';

export const revalidate = 180;

async function getAccessoriesData(): Promise<AccessoriesData> {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    sectionTitle: "Raam Ather Accessories",
    sectionSubtitle: "Complete your electric journey with premium accessories. Wide range available at our showrooms.",
    accessories: [
      {
        id: 'helmets',
        title: 'Smart Helmets',
        description: 'Bluetooth-enabled safety gear',
        image: '/Ather-Assets/Accessories/helmet-1_1024x1024.webp',
        href: '/ContactUs'
      },
      {
        id: 'chargers',
        title: 'Charging Solutions',
        description: 'Portable & wall-mount chargers',
        image: '/Ather-Assets/Accessories/Charger/atherchargerwallmount.webp',
        href: '/ContactUs'
      },
      {
        id: 'comfort',
        title: 'Comfort Accessories',
        description: 'Seat covers, grips & more',
        image: '/Ather-Assets/Accessories/450 Accessories/450 Seat Cover/IMAGE_fad187fd-d774-4808-8ac6-cac3f0a9a218_795x670.webp',
        href: '/ContactUs'
      },
      {
        id: 'maintenance',
        title: 'Maintenance Tools',
        description: 'Inflators, cleaning kits & tools',
        image: '/Ather-Assets/Accessories/Rizta Accessories/Inflator/IMAGE-2_e38ec26f-8f18-4e06-ba1d-3e62eadde836_795x670.webp',
        href: '/ContactUs'
      }
    ]
  };
}

export default async function AccessoriesSection() {
  const data = await getAccessoriesData();

  return (
    <AccessoriesSEO>
      <section 
        id="accessories-section"
        className="py-16 bg-white relative overflow-hidden"
        aria-labelledby="accessories-title"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-500/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <header className="text-center mb-12">
            <h2 
              id="accessories-title"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {data.sectionTitle}
            </h2>
            {data.sectionSubtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {data.sectionSubtitle}
              </p>
            )}
          </header>

          {/* Accessories Grid */}
          <AccessoriesGrid data={data} />
        </div>
      </section>
    </AccessoriesSEO>
  );
}