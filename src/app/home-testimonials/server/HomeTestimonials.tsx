import { HomeTestimonialsData } from '../home-testimonials.types';
import { HomeTestimonialsSEO } from './HomeTestimonialsSEO';
import QuoteBubbles3D from '../client/QuoteBubbles3D';

export const revalidate = 120;

async function getHomeTestimonialsData(): Promise<HomeTestimonialsData> {
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    sectionTitle: "Hear from Our Riders",
    sectionSubtitle: "Real experiences from Ather owners across India",
    testimonials: [
      {
        id: 'testimonial-1',
        name: 'Bhavana Mishra',
        role: 'Verified Owner',
        review: 'Very good experience especially due to service associate Nikitha, who had been very regular with updates & follow up from start to end. Great customer centricity and patience displayed. The delivery experience was amazing.',
        rating: 5,
        type: 'text'
      },
      {
        id: 'testimonial-2',
        name: 'Rajesh Kumar',
        role: 'Tech Professional',
        review: 'Switching to Ather was the best decision. The smooth ride, smart features, and eco-friendly nature make it perfect for daily commute. Highly recommend!',
        rating: 5,
        type: 'text'
      },
      {
        id: 'testimonial-3',
        name: 'Priya Sharma',
        role: 'Ather 450X Owner',
        review: 'Love my Ather 450X! The acceleration is incredible, and the app integration makes everything so convenient. Battery life exceeds all expectations.',
        rating: 5,
        type: 'text'
      },
    ],
    ctaPrimary: {
      text: 'Read More Reviews',
      href: '/testimonials'
    },
    ctaSecondary: {
      text: 'Share Your Experience',
      href: '/ContactUs'
    }
  };
}

export default async function HomeTestimonials() {
  const data = await getHomeTestimonialsData();

  return (
    <>
      <HomeTestimonialsSEO testimonials={data.testimonials} />

      <section
        className="py-16 md:py-24 bg-gradient-to-b from-white via-green-50/30 to-white relative"
        aria-labelledby="testimonials-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <header className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-3">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold
                             border border-green-200">
                TESTIMONIALS
              </span>
            </div>
            <h2
              id="testimonials-title"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight
                       bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text"
            >
              {data.sectionTitle}
            </h2>
            {data.sectionSubtitle && (
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                {data.sectionSubtitle}
              </p>
            )}
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-full mx-auto
                          shadow-lg shadow-green-200"></div>
          </header>

          {/* 3D Quote Bubbles */}
          <QuoteBubbles3D testimonials={data.testimonials} />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 md:mt-16">
            <a
              href={data.ctaPrimary.href}
              className="group relative px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full
                       hover:from-green-600 hover:to-emerald-700 transition-all duration-300
                       shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">{data.ctaPrimary.text}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0
                            group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href={data.ctaSecondary.href}
              className="px-8 py-3.5 bg-white text-green-600 font-bold rounded-full border-2 border-green-500
                       hover:bg-green-50 hover:border-green-600 transition-all duration-300
                       shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              {data.ctaSecondary.text}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}