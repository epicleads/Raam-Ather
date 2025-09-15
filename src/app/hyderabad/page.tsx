import { Metadata } from 'next'
import { generateLocalMetadata, BreadcrumbStructuredData, LocationFAQStructuredData } from '@/SEOcomponents/seo/LocalSEO'
import LocalBusinessStructuredData, { OrganizationStructuredData } from '@/SEOcomponents/seo/LocalBusinessStructuredData'
import AboutServer from '../Components/about/aboutserver'
import HomeModels from '@/app/Components/home-models/server/HomeModels'
import ContactPage from '../Components/contactform/contactserver';
import Footer from '@/app/Components/footer/page'
import Awards from '../Components/awards'
import TestRideButton from './TestRideButton' // We'll create this component

export const metadata: Metadata = generateLocalMetadata({
  location: 'hyderabad',
  pageType: 'landing'
})

export default function hyderabadPage() {
  return (
    <>
      {/* Structured Data */}
      <LocalBusinessStructuredData location="hyderabad" />
      <OrganizationStructuredData />
      <BreadcrumbStructuredData location="hyderabad" pageType="landing" />
      <LocationFAQStructuredData location="hyderabad" />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with Image Background */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-black" 
            style={{
              backgroundImage: "url('/assets/hyderabadLandingPage.jpeg')",
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
        
          
          {/* Test Ride Button - Overlaid at bottom of hero section */}
          <div className="absolute bottom-8 left-0 right-0 z-20 px-4">
            <div className="text-center">
              <TestRideButton />
            </div>
          </div>
        </section>

        <AboutServer/>
        <Awards/>
        
        {/* Models Section */}
        <HomeModels />

        <ContactPage/>



        <Footer />
      </div>
    </>
  )
}