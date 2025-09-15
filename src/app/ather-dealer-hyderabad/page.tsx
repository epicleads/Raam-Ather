import { Metadata } from 'next'
import { BreadcrumbStructuredData, LocationFAQStructuredData } from '@/SEOcomponents/seo/LocalSEO'
import LocalBusinessStructuredData from '@/SEOcomponents/seo/LocalBusinessStructuredData'
import HyderabadShowrooms from '@/app/Components/showrooms/HyderabadShowrooms'
import Footer from '@/app/Components/footer/page'

export const metadata: Metadata = {
  title: 'Ather Dealer Hyderabad - Raam Ather | #1 Electric Scooter Dealer Telangana',
  description: 'Authorized Ather dealer in Hyderabad. Raam Ather offers best prices on Ather 450X, Ather Rizta with immediate delivery, free test rides, and comprehensive service across Telangana.',
  keywords: 'Ather dealer Hyderabad, Ather authorized dealer Hyderabad, electric scooter dealer Hyderabad, Ather showroom Hyderabad, Raam Ather Hyderabad, EV dealer Telangana',
  openGraph: {
    title: 'Ather Dealer Hyderabad - Raam Ather | Best Electric Scooter Dealer',
    description: 'Authorized Ather dealer in Hyderabad with 5+ showrooms across the city. Experience premium electric scooters with best prices and expert service.',
    url: 'https://raamather.com/ather-dealer-hyderabad',
    images: [
      {
        url: 'https://raamather.com/assets/ather-dealer-hyderabad.jpg',
        width: 1200,
        height: 630,
        alt: 'Raam Ather Dealer Hyderabad - Electric Scooter Showroom',
      }
    ],
  },
}

export default function AtherDealerHyderabadPage() {
  return (
    <>
      <LocalBusinessStructuredData location="hyderabad" />
      <BreadcrumbStructuredData location="hyderabad" pageType="landing" />
      <LocationFAQStructuredData location="hyderabad" />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900 text-white py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-blue-400">Authorized Ather Dealer</span>
              <br />in Hyderabad
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Raam Ather is Hyderabad&rsquo;s most trusted authorized Ather Energy dealer. Experience India&rsquo;s smartest electric scooters with unmatched service quality, competitive pricing, and comprehensive support across Telangana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg">
                Visit Our Showrooms
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all">
                Call: +91 90323 33833
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-blue-400 mb-2">5+</h3>
                <p className="text-gray-200">Authorized Showrooms in Hyderabad</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-green-400 mb-2">3000+</h3>
                <p className="text-gray-200">Happy Customers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">24x7</h3>
                <p className="text-gray-200">Service Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-purple-400 mb-2">200+</h3>
                <p className="text-gray-200">Ather Grid Charging Points</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Raam as Ather Dealer */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Why Choose Raam as Your Ather Dealer in Hyderabad?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Authorized Dealership</h3>
                <p className="text-gray-600">Official Ather Energy authorized dealer with genuine products, warranty support, and factory-trained technicians.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Best Price Guarantee</h3>
                <p className="text-gray-600">Competitive pricing with maximum Telangana government subsidies, flexible EMI options, and transparent pricing.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">5+ Strategic Locations</h3>
                <p className="text-gray-600">Convenient showrooms across Hyderabad in Banjara Hills, Gachibowli, Jubilee Hills, Begumpet, and more.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600">Quick delivery within 2-7 days with proper documentation support and doorstep delivery options.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Expert Service</h3>
                <p className="text-gray-600">Certified technicians, doorstep service, genuine parts, and 24x7 roadside assistance across Hyderabad.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Complete Support</h3>
                <p className="text-gray-600">End-to-end support including financing, insurance, registration, and comprehensive after-sales service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Available */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
              Available Ather Models at Our Hyderabad Dealership
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Ather 450X */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    450X
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ather 450X</h3>
                  <p className="text-gray-600 mb-6">Premium electric scooter with 105km range, smart dashboard, and advanced features.</p>
                </div>
                <div className="space-y-3 text-left mb-8">
                  <div className="flex justify-between">
                    <span className="font-medium">Range:</span>
                    <span>105 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Top Speed:</span>
                    <span>90 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Charging:</span>
                    <span>0-80% in 60 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-bold text-blue-600">₹1,46,926*</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Book Test Ride
                </button>
              </div>

              {/* Ather Rizta */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    RIZTA
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ather Rizta</h3>
                  <p className="text-gray-600 mb-6">Family electric scooter with excellent storage, comfort, and practical design.</p>
                </div>
                <div className="space-y-3 text-left mb-8">
                  <div className="flex justify-between">
                    <span className="font-medium">Range:</span>
                    <span>123 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Top Speed:</span>
                    <span>80 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Storage:</span>
                    <span>34L + 22L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-bold text-green-600">₹1,09,999*</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Book Test Ride
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-8">*Ex-showroom prices in Hyderabad. Prices may vary with government subsidies and offers.</p>
          </div>
        </section>

        {/* Showrooms */}
        <HyderabadShowrooms />

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience the Best Ather Dealership in Hyderabad
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Visit Raam Ather showrooms for the most comprehensive Ather experience in Hyderabad. 
              Expert consultation, test rides, and unmatched service quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300">
                Visit Showroom
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300">
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