import { Metadata } from 'next';

export const accessoriesMetadata: Metadata = {
  title: 'Raam Ather Accessories – Smart Helmets, Chargers & More',
  description: 'Shop official Ather accessories including smart helmets, portable chargers, and premium seat covers. Enhance your electric scooter experience.',
  keywords: ['Raam Ather', 'accessories', 'smart helmet', 'chargers', 'seat covers', 'EV accessories'],
};

interface AccessoriesSEOProps {
  children?: React.ReactNode;
}

export default function AccessoriesSEO({ children }: AccessoriesSEOProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Raam Ather Accessories',
            description: 'Official Ather accessories and gear for electric scooters',
            url: 'https://raamather.com/accessories',
            mainEntity: {
              '@type': 'ItemList',
              name: 'Ather Accessories Collection',
              itemListElement: [
                {
                  '@type': 'Product',
                  position: 1,
                  name: 'Smart Helmet',
                  description: 'Bluetooth-enabled smart helmet for safe riding'
                },
                {
                  '@type': 'Product',
                  position: 2,
                  name: 'Portable Charger',
                  description: 'Charge your Ather scooter anywhere'
                },
                {
                  '@type': 'Product',
                  position: 3,
                  name: 'Premium Seat Cover',
                  description: 'Comfortable and stylish seat cover'
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}