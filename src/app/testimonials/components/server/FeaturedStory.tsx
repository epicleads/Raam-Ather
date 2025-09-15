import Image from 'next/image';
import { featuredStory } from '../../data/testimonials.config';

export default function FeaturedStory() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Featured <span className="text-[#00E396]">Story</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive deep into transformative journeys with Raam Ather
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-[#00E396]/20 transition-all duration-500 border border-gray-200">
        {/* Background Image */}
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
          <Image
            src={featuredStory.poster}
            alt={featuredStory.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-8 flex items-center justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {featuredStory.title}
              </h3>
              <p className="text-lg md:text-xl text-[#00E396] font-medium mb-4">
                {featuredStory.subtitle}
              </p>
              <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                {featuredStory.description}
              </p>
              
              <div className="flex items-center gap-4">
                <a 
                  href="#featured-story"
                  className="group/btn bg-[#00E396] hover:bg-white text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 hover:shadow-lg hover:shadow-[#00E396]/30"
                >
                  <span>Learn More</span>
                </a>
                
                <div className="text-gray-300 text-sm">
                  <p>3 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}