import Script from 'next/script';
import Head from 'next/head';

export default function TestimonialsSEO() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Raam Ather",
    "url": "https://raamather.com",
    "logo": "https://raamather.com/Ather-Assets/Home/raamatherlogo.png",
    "description": "Premium electric scooter dealership offering Ather vehicles with exceptional service and support.",
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
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Organization",
      "name": "Raam Ather"
    },
    "ratingValue": "4.7",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "2230"
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": "Ather Electric Scooter",
      "brand": {
        "@type": "Brand",
        "name": "Ather"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Verified Customer"
    },
    "reviewBody": "Excellent service and product quality from Raam Ather. The purchase experience was seamless and the after-sales support is outstanding."
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Customer Testimonials & Reviews | Raam Ather - Premium Electric Scooter Dealership</title>
        <meta name="title" content="Customer Testimonials & Reviews | Raam Ather - Premium Electric Scooter Dealership" />
        <meta name="description" content="Read authentic customer testimonials and reviews about Raam Ather's exceptional service, Ather electric scooters, and outstanding after-sales support. Join thousands of satisfied customers." />
        <meta name="keywords" content="Raam Ather reviews, Ather electric scooter testimonials, customer feedback, electric vehicle dealership reviews, Hyderabad, Chennai, Ather 450, Ather Rizta" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Raam Ather" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raamather.com/testimonials" />
        <meta property="og:title" content="Customer Testimonials & Reviews | Raam Ather" />
        <meta property="og:description" content="Read authentic customer testimonials and reviews about Raam Ather's exceptional service, Ather electric scooters, and outstanding after-sales support." />
        <meta property="og:image" content="https://raamather.com/Ather-Assets/Home/raamatherlogo.png" />
        <meta property="og:site_name" content="Raam Ather" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://raamather.com/testimonials" />
        <meta property="twitter:title" content="Customer Testimonials & Reviews | Raam Ather" />
        <meta property="twitter:description" content="Read authentic customer testimonials and reviews about Raam Ather's exceptional service, Ather electric scooters, and outstanding after-sales support." />
        <meta property="twitter:image" content="https://raamather.com/Ather-Assets/Home/raamatherlogo.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#00E396" />
        <meta name="msapplication-TileColor" content="#00E396" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://raamather.com/testimonials" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Structured Data Scripts */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="aggregate-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema)
        }}
      />
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema)
        }}
      />
    </>
  );
}