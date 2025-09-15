import { Metadata } from 'next';
import { HomeModel } from '../home-models.types';

interface HomeModelsSEOProps {
  models: HomeModel[];
}

export function generateHomeModelsMetadata(models: HomeModel[]): Partial<Metadata> {
  const modelNames = models.map(model => model.name).join(', ');
  const priceRange = {
    min: Math.min(...models.map(model => model.startingPrice)),
    max: Math.max(...models.map(model => model.startingPrice))
  };

  return {
    title: `Ather Electric Scooters - ${modelNames} | Starting ₹${priceRange.min.toLocaleString('en-IN')}`,
    description: `Explore Ather's range of electric scooters including ${modelNames}. Starting from ₹${priceRange.min.toLocaleString('en-IN')} with flexible Flexipay EMI options. Book a home test ride today.`,
    keywords: [
      'Ather electric scooters',
      'electric scooters India',
      'Ather 450S',
      'Ather 450X', 
      'Ather 450 Apex',
      'Ather Rizta',
      'electric vehicle EMI',
      'Flexipay',
      'home test ride',
      'electric scooter price'
    ],
    openGraph: {
      title: `Ather Electric Scooters - ${modelNames}`,
      description: `Discover India's smartest electric scooters. ${modelNames} starting from ₹${priceRange.min.toLocaleString('en-IN')} with Flexipay EMI options.`,
      type: 'website',
      images: [
        {
          url: '/Ather-Assets/models/ather-models-collection.jpg',
          width: 1200,
          height: 630,
          alt: `Ather Electric Scooters - ${modelNames}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Ather Electric Scooters - ${modelNames}`,
      description: `Starting from ₹${priceRange.min.toLocaleString('en-IN')} with flexible EMI options. Book your home test ride today.`,
      images: ['/Ather-Assets/models/ather-models-collection.jpg']
    }
  };
}

export function HomeModelsSEO({ models }: HomeModelsSEOProps) {
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ather Electric Scooter Models",
    "description": "Complete range of Ather electric scooters with pricing and specifications",
    "numberOfItems": models.length,
    "itemListElement": models.map((model, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": model.name,
      "description": `${model.name} electric scooter starting at ${model.formattedPrice}`,
      "image": model.image,
      "offers": {
        "@type": "Offer",
        "price": model.startingPrice,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Ather Energy"
        }
      },
      "brand": {
        "@type": "Brand",
        "name": "Ather"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}