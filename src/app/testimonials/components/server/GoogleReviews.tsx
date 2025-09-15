import { Star, MapPin, ExternalLink } from 'lucide-react';
import { googleReviews, dealers } from '../../data/testimonials.config';

export default function GoogleReviews() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < rating ? 'fill-black text-black' : 'text-gray-400'}
      />
    ));
  };

  const getDisplayCount = (city: string, count: number) => {
    if (city === 'Hyderabad') return '2k+';
    if (city === 'Chennai') return '2.5k+';
    if (count >= 1000) {
      const k = count / 1000;
      const formatted = k % 1 === 0 ? `${k.toFixed(0)}k+` : `${k.toFixed(1)}k+`;
      return formatted;
    }
    return count.toLocaleString();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          Google <span className="text-[#4ade80]">Reviews</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          See what customers are saying about us on Google
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {dealers.map((dealer) => {
          const reviewData = googleReviews[dealer.city];
          
          return (
            <div
              key={dealer.id}
              className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-[#4ade80]/30 transition-all duration-300 group shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#4ade80] transition-colors">
                    {dealer.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={14} className="sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">{dealer.city}</span>
                  </div>
                </div>
                {/* Verified Tag - REMOVED */}
                {/* <div className="flex items-center gap-2 bg-[#00E396] text-black px-2 sm:px-3 py-1 rounded-full">
                  <Shield size={14} className="sm:w-4 sm:h-4" />
                  <span className="font-semibold text-xs sm:text-sm">Verified</span>
                </div> */}
              </div>

              {/* Rating Display */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {reviewData.rating}
                </div>
                <div className="flex justify-center mb-1">
                  {renderStars(Math.floor(reviewData.rating))}
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Based on <span className="text-[#4ade80] font-semibold">{getDisplayCount(dealer.city, reviewData.count)}</span> Google reviews
                </p>
              </div>

              {/* Review Highlights */}
              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(5)}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">Most Recent</span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    {dealer.city === 'Hyderabad' 
                      ? "Raam Ather Somajigudha has done a excellent job and my Vehicle has delivered with in one day and the team follow up was very good and thanks to PS b Raju for taking care of my delivery. Thanks Raam ather"
                      : "The recent flooding did a number on my scooter. But, Raam Ather Nungambakkam took excellent care of it. The scooter is back, looking and working as good as new. Durai pandian, who handled my vehicle, was friendly, efficient, and got me back on the road quickly. He also handled the insurance side as well. Highly recommend them!"
                    }
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(5)}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">Top Review</span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    {dealer.city === 'Hyderabad'
                      ? "Raam Ather showroom, Good staff with good management, the customer executive will receives us and explains the Vechile in a good conversation. Overall with Good experience and fast delivery."
                      : "I have purchased Ather Rizta at the end of July, 2024. Thanks, Ather RAAM Group Porur, for your most convenient service for the entire process. Special thanks to my purchase partner, Ajay!!"
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={`https://www.google.com/search?q=Raam+Ather+${dealer.city}+reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:shadow-lg border border-gray-200"
                >
                  <span>Read All Reviews</span>
                  <ExternalLink size={16} />
                </a>
                <a
                  href={`https://www.google.com/search?q=Raam+Ather+${dealer.city}+write+review`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#4ade80] text-black hover:bg-[#4ade80]/80 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  <span>Write Review</span>
                  <Star size={16} />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Responds quickly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Local business</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4ade80] rounded-full"></div>
                    <span>Highly rated</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


    </section>
  );
}