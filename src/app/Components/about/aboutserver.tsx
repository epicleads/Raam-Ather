import Head from "next/head";
import AboutClient from "./aboutclient";

export default function AboutServer() {
  // Enhanced static content with location information
  const aboutContent = {
    title: "Leading Ather Electric Scooter Dealership in South India",
    description: "Raam Ather is the premier authorized dealership for Ather Energy's revolutionary electric scooters across Hyderabad and Chennai. We are transforming urban mobility with cutting-edge electric vehicle technology.",
    mainText: "At Raam Ather, we are not just selling electric scooters – we are pioneering the future of sustainable urban mobility. As an official Ather Energy franchise partner, we bring you the most advanced electric two-wheelers in India, backed by unmatched customer service and comprehensive support.",
    locations: [
      {
        city: "Hyderabad",
        description: "Serving the tech capital of South India with premium electric mobility solutions"
      },
      {
        city: "Chennai", 
        description: "Bringing sustainable transportation to the automotive hub of India"
      }
    ],
    stats: {
      cities: 2,
      experience: "5+ years",
      customers: "10,000+",
      satisfaction: "98%"
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Raam Ather Dealership",
    "description": "Official Ather Energy dealership providing premium electric scooters in Hyderabad and Chennai",
    "url": "https://raamather.com",
    "logo": "https://raamather.com/logo.png",
    "image": "https://raamather.com/assets/Rizta-most.webp",
    "telephone": "+91-XXXXXXXXXX",
    "priceRange": "₹₹₹",
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress", 
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad"
      },
      {
        "@type": "City",
        "name": "Chennai"
      }
    ],
    "brand": {
      "@type": "Brand",
      "name": "Ather Energy"
    },
    "serviceType": "Electric Vehicle Dealership",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ather Electric Scooters",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Vehicle",
            "name": "Ather 450X",
            "brand": "Ather Energy",
            "vehicleEngine": {
              "@type": "EngineSpecification",
              "fuelType": "Electric"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500+"
    },
    "sameAs": [
      "https://facebook.com/raamather",
      "https://instagram.com/raamather",
      "https://twitter.com/raamather"
    ]
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>About Raam Ather - Official Ather Energy Dealership | Hyderabad & Chennai</title>
        <meta
          name="title"
          content="About Raam Ather - Official Ather Energy Dealership | Hyderabad & Chennai"
        />
        <meta
          name="description"
          content="Discover Raam Ather, the leading authorized Ather Energy dealership in Hyderabad and Chennai. Premium electric scooters, expert service, and sustainable mobility solutions for modern India."
        />
        <meta
          name="keywords"
          content="Raam Ather, Ather Energy dealership, electric scooters Hyderabad, electric scooters Chennai, Ather 450X, EV dealership India, electric vehicle dealer, sustainable mobility, premium electric scooters"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Raam Ather Dealership" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raamather.com/about" />
        <meta
          property="og:title"
          content="About Raam Ather - Official Ather Energy Dealership | Hyderabad & Chennai"
        />
        <meta
          property="og:description"
          content="Discover Raam Ather, the leading authorized Ather Energy dealership in Hyderabad and Chennai. Premium electric scooters and sustainable mobility solutions."
        />
        <meta property="og:image" content="https://raamather.com/assets/Rizta-most.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Raam Ather" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://raamather.com/about" />
        <meta
          property="twitter:title"
          content="About Raam Ather - Official Ather Energy Dealership | Hyderabad & Chennai"
        />
        <meta
          property="twitter:description"
          content="Discover Raam Ather, the leading authorized Ather Energy dealership in Hyderabad and Chennai. Premium electric scooters and sustainable mobility solutions."
        />
        <meta property="twitter:image" content="https://raamather.com/assets/Rizta-most.webp" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Chennai" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://raamather.com/about" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Preload Neural Grotesk Font */}
        <link
          rel="preload"
          href="/fonts/NeueGroteskBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/NeueGroteskMedium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Additional Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Raam Ather",
              "alternateName": "Raam Ather Dealership",
              "description": "Official Ather Energy dealership franchise providing premium electric scooters",
              "foundingDate": "2019",
              "industry": "Electric Vehicle Retail",
              "numberOfEmployees": "50-100",
              "location": [
                {
                  "@type": "Place",
                  "name": "Raam Ather Hyderabad",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hyderabad",
                    "addressRegion": "Telangana",
                    "addressCountry": "India"
                  }
                },
                {
                  "@type": "Place", 
                  "name": "Raam Ather Chennai",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chennai",
                    "addressRegion": "Tamil Nadu", 
                    "addressCountry": "India"
                  }
                }
              ],
              "parentOrganization": {
                "@type": "Organization",
                "name": "Ather Energy"
              }
            })
          }}
        />
      </Head>
      <AboutClient content={aboutContent} />
    </>
  );
}