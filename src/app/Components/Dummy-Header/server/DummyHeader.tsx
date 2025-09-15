import { DummyHeaderData } from '../dummy-header.types';
import DummyHeaderSEO from './DummyHeaderSEO';
import DummyHeaderClient from '../client/DummyHeader.client';

export const revalidate = 300;

async function getDummyHeaderData(): Promise<DummyHeaderData> {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    logo: {
      src: '/Ather-Assets/Home/raamather.png',
      alt: 'Raam Ather',
      href: '/'
    },
    navigation: [
      {
        label: 'Scooters',
        dropdown: [
          { label: 'Rizta', href: '/rizta' },
          { label: 'Ather 450', href: '/ather-450' },
          { label: '450 Apex', href: '/ather-450-apex'}
        ]
      },
      { label: 'Services', href: '/Services' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Offers', href: '/offer' },
      { label: 'About Us', href: '/AboutUs' },
      { label: 'Contact Us', href: '/ContactUs' },
      { label: 'Our Locations', href: '/StoreLocator' }
    ],
    ctas: [
      { 
        label: 'Book Test Ride', 
        href: '/book-test-ride', 
        type: 'primary' as const
      },
      { 
        label: 'Call Now', 
        href: 'tel:+919032333833', 
        type: 'secondary' as const
      }
    ],
    mobileBottomNav: [
      { label: 'Models', href: '/models' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Call Now', href: 'tel:+919032333833' }
    ],
    contact: {
      phone: '+919032333833',
      displayText: 'Call Now'
    }
  };
}

export default async function DummyHeader() {
  const data = await getDummyHeaderData();

  return (
    <DummyHeaderSEO>
      <DummyHeaderClient data={data} />
    </DummyHeaderSEO>
  );
}