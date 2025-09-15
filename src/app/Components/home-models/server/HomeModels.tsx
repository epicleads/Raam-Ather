import { HomeModelsData } from '../home-models.types';
import { HomeModelsSEO } from './HomeModelsSEO';
import HomeModelsSlider from '../client/HomeModelsSlider.client';
import ModelsAnimatedSubtitle from './ModelsAnimatedSubtitle';

// ISR configuration
export const revalidate = 60;

// Mock data - replace with actual data fetching logic
async function getHomeModelsData(): Promise<HomeModelsData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    sectionTitle: "Raam Ather Collection",
    sectionSubtitle: "Precision engineered.",
    models: [
      {
        id: 'rizta',
        name: 'Ather Rizta',
        startingPrice: 104999,
        formattedPrice: '₹1,04,999',
        emiAmount: 2199,
        emiFormatted: '₹2,199',
        image: '/Ather-Assets/Rizta/riztapangongbluesidefront.jpg',
        altText: 'Ather Rizta Electric Scooter',
        primaryCTA: {
          text: 'Book Test Ride',
          action: 'book-test-ride'
        },
        secondaryCTA: {
          text: 'Explore Rizta',
          action: 'explore-model'
        },
        isNew: false
      },
      {
        id: '450s',
        name: 'Ather 450S',
        startingPrice: 119841,
        formattedPrice: '₹1,19,841',
        emiAmount: 2475,
        emiFormatted: '₹2,475',
        image: '/Ather-Assets/450/3_Ather_450_S_b3a57854a8.webp',
        altText: 'Ather 450S Electric Scooter',
        primaryCTA: {
          text: 'Book test ride',
          action: 'book-test-ride'
        },
        secondaryCTA: {
          text: 'Explore 450S',
          action: 'explore-model'
        }
      },
      {
        id: '450x',
        name: 'Ather 450X',
        startingPrice: 146999,
        formattedPrice: '₹1,46,999',
        emiAmount: 2789,
        emiFormatted: '₹2,789',
        image: '/Ather-Assets/450/Ather-450-colours-Lunar-Grey.webp',
        altText: 'Ather 450X Electric Scooter',
        primaryCTA: {
          text: 'Book test ride',
          action: 'book-test-ride'
        },
        secondaryCTA: {
          text: 'Explore 450X',
          action: 'explore-model'
        }
      },
      {
        id: '450-apex',
        name: 'Ather 450 Apex',
        startingPrice: 189999,
        formattedPrice: '₹1,89,999',
        emiAmount: 3439,
        emiFormatted: '₹3,439',
        image: '/Ather-Assets/450-apex/ather-ape-0034D9.png',
        altText: 'Ather 450 Apex Electric Scooter',
        primaryCTA: {
          text: 'Home test ride',
          action: 'book-test-ride'
        },
        secondaryCTA: {
          text: 'Explore 450 Apex',
          action: 'explore-model'
        }
      }
    ]
  };
}

export default async function HomeModels() {
  const data = await getHomeModelsData();

  return (
    <>
      <HomeModelsSEO models={data.models} />
      
      <section className="relative py-20 bg-white" aria-labelledby="home-models-title">
        {/* Premium background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Premium Section Header */}
          <header className="text-center mb-16">
            <h2 
              id="home-models-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-neurial text-black mb-6 leading-tight"
            >
              {data.sectionTitle}
            </h2>
            {data.sectionSubtitle && (
              <div className="max-w-4xl mx-auto">
                <ModelsAnimatedSubtitle text={data.sectionSubtitle} />
              </div>
            )}
          </header>

          {/* Enhanced Models Display */}
          <HomeModelsSlider models={data.models} />
        </div>
      </section>
    </>
  );
}

