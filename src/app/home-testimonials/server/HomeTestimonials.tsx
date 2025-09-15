import { HomeTestimonialsData } from '../home-testimonials.types';
import { HomeTestimonialsSEO } from './HomeTestimonialsSEO';
import HomeTestimonialsSlider from '../client/HomeTestimonialsSlider.client';

export const revalidate = 120;

async function getHomeTestimonialsData(): Promise<HomeTestimonialsData> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    sectionTitle: "Hear from Our Riders",
    sectionSubtitle: "Real experiences from Ather owners across India",
    testimonials: [
      {
        id: 'testimonial-1',
        name: 'Eexan Enterprises',
        role: 'Local Guide Google Reviews',
        review: 'Best EV in the segment, in fact this is The only EV Company having good hold in the market, Also the highest number of EVs in india is from Ather.',
        rating: 5,
        
        type: 'text'
      },
      {
        id: 'testimonial-2',
        name: 'Bhavana Mishra',
        role: 'Google Reviews',
        review: 'Very good Experience especially due to service associate Nikitha, who had been very regular with updates & follow up from start to end. Great customer centricity...and patience displayed. Also showroom ambience and stock is too good. Waiting to enjoy the eco friendly ride. The delivery experience was amazing.',
        rating: 5,
       
        type: 'text'
      },
      {
        id: 'testimonial-3',
        name: 'Mendey Avenesh',
        role: 'Google Reviews',
        review: 'Everything was Fine we had great Explained about Bike from Receiving to Exit Very Good Experience from Ameer Tyson and Anusha Thank you So Much for your kindness..😊👍🏻',
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
        className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
        aria-labelledby="testimonials-title"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <header className="text-center mb-12">
            <h2 
              id="testimonials-title"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {data.sectionTitle}
            </h2>
            {data.sectionSubtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {data.sectionSubtitle}
              </p>
            )}
          </header>

          {/* Testimonials Slider */}
          <HomeTestimonialsSlider data={data} />
        </div>
      </section>
    </>
  );
}