import { Metadata } from 'next'
import LocalBusinessStructuredData from '@/SEOcomponents/seo/LocalBusinessStructuredData'
import { BreadcrumbStructuredData, LocationFAQStructuredData } from '@/SEOcomponents/seo/LocalSEO'
import HyderabadShowrooms from '@/app/Components/showrooms/HyderabadShowrooms'
import Footer from '@/app/Components/footer/page'

export const metadata: Metadata = {
  title: 'Electric Scooter Hyderabad - Raam Ather | Best EV Dealer Telangana 2024',
  description: 'Best electric scooters in Hyderabad at Raam Ather. Ather 450X, Rizta with 105km range, ₹15,000 subsidy, free test rides, and comprehensive service across Telangana.',
  keywords: 'electric scooter Hyderabad, EV Hyderabad, electric vehicle Hyderabad, Ather Hyderabad, electric bike Hyderabad, EV dealer Hyderabad, electric scooter Telangana, battery scooter Hyderabad',
  alternates: {
    canonical: 'https://raamather.com/electric-scooter-hyderabad'
  },
  openGraph: {
    title: 'Electric Scooter Hyderabad - Best EV Models & Prices 2024',
    description: 'Discover top electric scooters in Hyderabad. Ather 450X with 105km range, smart features, government subsidies, and expert service support.',
    url: 'https://raamather.com/electric-scooter-hyderabad',
    images: [
      {
        url: 'https://raamather.com/assets/electric-scooter-hyderabad.jpg',
        width: 1200,
        height: 630,
        alt: 'Electric Scooters in Hyderabad - Ather Models',
      }
    ],
  },
}

export default function ElectricScooterHyderabadPage() {
  return (
    <>
      <LocalBusinessStructuredData location="hyderabad" />
      <BreadcrumbStructuredData location="hyderabad" pageType="landing" />
      <LocationFAQStructuredData location="hyderabad" />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-800 via-blue-900 to-gray-900 text-white py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                  Best <span className="text-green-400">Electric Scooters</span>
                  <br />in Hyderabad
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Discover Hyderabad&rsquo;s most advanced electric scooters at Raam Ather. Experience cutting-edge technology, 
                  eco-friendly mobility, and smart features that make every ride extraordinary.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl">
                    Book Free Test Ride
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl transition-all">
                    Compare Models
                  </button>
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">105KM Range</h3>
                  <p className="text-gray-200">Industry-leading range for your daily Hyderabad commute</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">₹15,000 Subsidy</h3>
                  <p className="text-gray-200">Maximum Telangana government benefits and incentives</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Smart Features</h3>
                  <p className="text-gray-200">AI-powered dashboard, navigation, and mobile connectivity</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-red-400">200+ Charging Points</h3>
                  <p className="text-gray-200">Extensive Ather Grid network across Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Electric Scooter Models */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Top Electric Scooters Available in Hyderabad
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Choose from India&rsquo;s smartest electric scooters, designed for Hyderabad&rsquo;s roads and climate. 
                Experience superior performance, range, and technology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Ather 450X */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
                  <h3 className="text-3xl font-bold mb-2">Ather 450X</h3>
                  <p className="text-blue-100">Premium Electric Scooter</p>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">105 KM</div>
                      <div className="text-gray-600">True Range</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">90 KMPH</div>
                      <div className="text-gray-600">Top Speed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">60 MIN</div>
                      <div className="text-gray-600">0-80% Charge</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">7&quot; TFT</div>
                      <div className="text-gray-600">Smart Dashboard</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-xl mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        'Smart Navigation & Music Control',
                        'Over-the-air Updates',
                        'WhatsApp Integration',
                        'Reverse Mode',
                        '4 Ride Modes (Eco, City, Sport, Warp)',
                        'Emergency SOS & Anti-theft'
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">₹1,46,926*</span>
                        <div className="text-sm text-gray-500">Ex-showroom Hyderabad</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold">Save up to ₹15,000</div>
                        <div className="text-sm text-gray-500">With subsidies</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                        Book Test Ride
                      </button>
                      <button className="border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                        Check EMI
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ather Rizta */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white text-center">
                  <h3 className="text-3xl font-bold mb-2">Ather Rizta</h3>
                  <p className="text-green-100">Family Electric Scooter</p>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">123 KM</div>
                      <div className="text-gray-600">True Range</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">80 KMPH</div>
                      <div className="text-gray-600">Top Speed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">34L</div>
                      <div className="text-gray-600">Boot Storage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">22L</div>
                      <div className="text-gray-600">Front Storage</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-xl mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        'Largest Storage in Segment',
                        'Comfortable Seating for Two',
                        'LED Headlamp & Tail Lamp',
                        'Side Stand Sensor',
                        'Mobile Charging Port',
                        'Telescopic Front Suspension'
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">₹1,09,999*</span>
                        <div className="text-sm text-gray-500">Ex-showroom Hyderabad</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold">Save up to ₹15,000</div>
                        <div className="text-sm text-gray-500">With subsidies</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                        Book Test Ride
                      </button>
                      <button className="border-2 border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                        Check EMI
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">*Prices subject to change. Government subsidies and offers may vary.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Electric in Hyderabad */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Why Choose Electric Scooters in Hyderabad?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Eco-Friendly</h3>
                <p className="text-gray-600">Zero emissions, clean air for Hyderabad. Contribute to reducing pollution in our city.</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Cost Effective</h3>
                <p className="text-gray-600">Save ₹40,000+ annually on fuel costs. Running cost of less than ₹1 per km.</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Government Support</h3>
                <p className="text-gray-600">Telangana government incentives, subsidies, and policy support for electric vehicles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Showrooms */}
        <HyderabadShowrooms />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Experience the Future of Mobility in Hyderabad
            </h2>
            <p className="text-xl mb-10 opacity-90 leading-relaxed">
              Join thousands of Hyderabad riders who have already made the smart switch to electric. 
              Book your test ride today and discover why Ather is India&rsquo;s most loved electric scooter.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-xl">
                Book Free Test Ride
              </button>
              <button className="border-3 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300">
                Call: 090323 33833
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}