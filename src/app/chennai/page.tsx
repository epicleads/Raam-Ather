import { Metadata } from 'next'
import { generateLocalMetadata, BreadcrumbStructuredData, LocationFAQStructuredData } from '@/SEOcomponents/seo/LocalSEO'
import LocalBusinessStructuredData, { OrganizationStructuredData } from '@/SEOcomponents/seo/LocalBusinessStructuredData'
import AboutServer from '../Components/about/aboutserver'
import HomeModels from '@/app/Components/home-models/server/HomeModels'
import ContactPage from '../Components/contactform/contactserver';
import Footer from '@/app/Components/footer/page'
import Awards from '../Components/awards'

import HeroSlider from './HeroSlider'

export const metadata: Metadata = generateLocalMetadata({
  location: 'chennai',
  pageType: 'landing'
})

export default function ChennaiPage() {
  return (
    <>
      {/* Structured Data */}
      <LocalBusinessStructuredData location="chennai" />
      <OrganizationStructuredData />
      <BreadcrumbStructuredData location="chennai" pageType="landing" />
      <LocationFAQStructuredData location="chennai" />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with Auto-Sliding Images */}
        <HeroSlider />

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