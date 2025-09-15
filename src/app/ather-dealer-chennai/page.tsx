import { Metadata } from 'next'
import { BreadcrumbStructuredData, LocationFAQStructuredData } from '@/SEOcomponents/seo/LocalSEO'
import LocalBusinessStructuredData from '@/SEOcomponents/seo/LocalBusinessStructuredData'
import Footer from '@/app/Components/footer/page'

export const metadata: Metadata = {
  title: 'Ather Dealer Chennai - Raam Ather | #1 Electric Scooter Dealer Tamil Nadu',
  description: 'Authorized Ather dealer in Chennai. Raam Ather offers best prices on Ather 450X, Ather Rizta with immediate delivery, free test rides, and comprehensive service across Tamil Nadu.',
  keywords: 'Ather dealer Chennai, Ather authorized dealer Chennai, electric scooter dealer Chennai, Ather showroom Chennai, Raam Ather Chennai, EV dealer Tamil Nadu',
  openGraph: {
    title: 'Ather Dealer Chennai - Raam Ather | Best Electric Scooter Dealer',
    description: 'Authorized Ather dealer in Chennai with 4+ showrooms across the city. Experience premium electric scooters with best prices and expert service.',
    url: 'https://raamather.com/ather-dealer-chennai',
    images: [
      {
        url: 'https://raamather.com/assets/ather-dealer-chennai.jpg',
        width: 1200,
        height: 630,
        alt: 'Raam Ather Dealer Chennai - Electric Scooter Showroom',
      }
    ],
  },
}

export default function AtherDealerChennaiPage() {
  return (
    <>
      <LocalBusinessStructuredData location="chennai" />
      <BreadcrumbStructuredData location="chennai" pageType="landing" />
      <LocationFAQStructuredData location="chennai" />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-900 via-slate-800 to-gray-900 text-white py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-green-400">Authorized Ather Dealer</span>
              <br />in Chennai
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Raam Ather is Chennai&rsquo;s premier authorized Ather Energy dealer. Experience India&rsquo;s smartest electric scooters with exceptional service quality, best pricing, and comprehensive support across Tamil Nadu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg">
                Visit Our Showrooms
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all">
                Call: +91 90323 33833
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-green-400 mb-2">4+</h3>
                <p className="text-gray-200">Authorized Showrooms in Chennai</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-blue-400 mb-2">5000+</h3>
                <p className="text-gray-200">Happy Customers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">24x7</h3>
                <p className="text-gray-200">Service Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-purple-400 mb-2">250+</h3>
                <p className="text-gray-200">Ather Grid Charging Points</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Raam as Ather Dealer */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Why Choose Raam as Your Ather Dealer in Chennai?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Authorized Dealership</h3>
                <p className="text-gray-600">Official Ather Energy authorized dealer with genuine products, warranty support, and factory-trained technicians.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Tamil Nadu Benefits</h3>
                <p className="text-gray-600">Maximum Tamil Nadu government incentives up to ₹20,000 including subsidies, tax benefits, and registration waiver.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Prime Locations</h3>
                <p className="text-gray-600">Strategic showrooms in T. Nagar, Anna Nagar, Velachery, OMR, and other key Chennai locations.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Delivery</h3>
                <p className="text-gray-600">Fast delivery within Chennai with complete documentation and doorstep delivery options.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Professional Service</h3>
                <p className="text-gray-600">Expert technicians, doorstep service, genuine parts, and 24x7 roadside assistance across Chennai.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">End-to-End Support</h3>
                <p className="text-gray-600">Complete support including financing, insurance, registration, and comprehensive after-sales service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience the Best Ather Dealership in Chennai
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Visit Raam Ather showrooms for the most comprehensive Ather experience in Chennai. 
              Expert consultation, test rides, and unmatched service quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300">
                Visit Showroom
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                Call: +91 90323 33833
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}