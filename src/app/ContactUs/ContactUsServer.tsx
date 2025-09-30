import ContactUsClient from './ContactUsClient';
import Footer from '../Components/footer/footerclient'; // Importing Footer component

export default function ContactUsServer() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Raam Ather - Ather Energy Dealer',
    description: 'Premier Ather Energy electric scooter dealer in Hyderabad and Chennai. Test rides, sales, service and support for electric vehicles.',
    url: 'https://raamother.com/ContactUs',
    telephone: [ '+91 9032333833'],
    email: 'info@raamother.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Road No. 36, Jubilee Hills',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500033',
        addressCountry: 'IN'
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Pondy Bazaar, T. Nagar',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600017',
        addressCountry: 'IN'
      }
    ],
    openingHours: 'Mo-Su 10:00-20:00',
    priceRange: '₹1,00,000 - ₹2,00,000',
    servesCuisine: 'Electric Vehicles',
    areaServed: ['Hyderabad', 'Chennai', 'Telangana', 'Tamil Nadu'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Electric Scooter Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ather Electric Scooter Sales',
            description: 'Premium electric scooter sales and delivery in Hyderabad and Chennai'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Electric Scooter Test Ride',
            description: 'Free test ride booking for Ather electric scooters'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'EV Consultation & Support',
            description: 'Expert consultation on electric vehicle purchase and maintenance'
          }
        }
      ]
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 9876543210',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Telugu', 'Tamil']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: 'https://wa.me/919876543210',
        availableLanguage: ['English', 'Hindi', 'Telugu', 'Tamil']
      }
    ],
    sameAs: [
      'https://www.facebook.com/raamather',
      'https://www.instagram.com/raamather',
      'https://www.youtube.com/raamather'
    ]
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I book a test ride for Ather electric scooters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book a test ride by calling us at +91 9876543210, visiting our website contact form, or visiting any of our showrooms in Hyderabad and Chennai. Test rides are completely free and can be scheduled at your convenience.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the contact details for Raam Ather dealerships?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hyderabad: +91 9876543210, Road No. 36, Jubilee Hills. Chennai: +91 9876543212, Pondy Bazaar, T. Nagar. Email: info@raamother.com. WhatsApp support available 24/7.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you provide home delivery for electric scooters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide doorstep delivery service across Hyderabad and Chennai within 24-48 hours of purchase confirmation. Our team ensures safe delivery and complete setup at your location.'
        }
      },
      {
        '@type': 'Question',
        name: 'What financing options are available for Ather scooters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer multiple financing options including bank loans, EMI plans starting from ₹2,999/month, and special government subsidy assistance. Our finance team will help you choose the best option based on your requirements.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <ContactUsClient />
      <Footer />
    </>
    
    
  );
}
