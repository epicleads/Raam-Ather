import StoreLocatorClient from './StoreLocatorClient';
import Footer from '../Components/footer/footerclient';

export default function StoreLocatorPage() {
  return (
    <div className="font-neurial">
      <StoreLocatorClient />
      <Footer />
    </div>
  );
}

export const metadata = {
  title: 'Store Locator - Find Raam Ather Showrooms & Service Centers',
  description: 'Discover Raam Ather showrooms, service centers, and test ride locations near you in Hyderabad and Chennai. Book test rides, get directions, and explore our premium electric scooters.',
  keywords: 'Raam Ather stores, showrooms, service centers, test ride locations, electric scooter dealers, Hyderabad, Chennai',
};