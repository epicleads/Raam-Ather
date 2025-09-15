// src/components/faq/faqserver.tsx
import React from "react";
import FAQClient from "./faqclient";

export default async function FAQServer() {
  // --------- SEO CONFIG ---------
  const siteUrl = "https://www.raamather.com";
  const pagePath = "/faq";
  const title =
    "Raam Ather Dealership FAQs | Ather Showroom, Test Ride, Service & Finance in Hyderabad & Chennai";
  const description =
    "Find answers about Ather 450X/450S test rides, prices, finance/EMI, service, charging (Ather Grid), and home charger installation at Raam Ather showrooms in Hyderabad & Chennai.";
  const keywords = [
    "Ather showroom Hyderabad",
    "Ather showroom Chennai",
    "Raam Ather Motors",
    "Ather 450X test ride Hyderabad",
    "Ather 450X test ride Chennai",
    "Ather 450S price Hyderabad",
    "Ather 450S price Chennai",
    "Ather service center Hyderabad",
    "Ather service center Chennai",
    "Ather Grid charging Hyderabad",
    "Ather Grid charging Chennai",
    "Ather finance EMI Hyderabad",
    "Ather finance EMI Chennai",
    "Ather electric scooter dealer",
    "EV showroom Hyderabad",
    "EV showroom Chennai",
  ].join(", ");

  // --------- FAQ CONTENT (pre-rendered for SEO) ---------
  const faqData = [
    {
      question: "Where are Raam Ather showrooms located in Hyderabad?",
      answer:
        "We serve Hyderabad from prime locations including Attapur and Kukatpally. Visit Raam Ather to explore the Ather 450X and Ather 450S, book a test ride, and get finance/EMI assistance.",
    },
    {
      question: "Where are Raam Ather showrooms located in Chennai?",
      answer:
        "In Chennai, Raam Ather serves EV buyers from popular hubs such as Anna Nagar and Velachery. Experience Ather 450X/450S, on-road price guidance, and after-sales support.",
    },
    {
      question:
        "How do I book an Ather 450X or 450S test ride in Hyderabad or Chennai?",
      answer:
        "You can book a test ride online or walk in to our Hyderabad (Attapur/Kukatpally) or Chennai (Anna Nagar/Velachery) showrooms. We’ll verify your ID and get you riding in minutes.",
    },
    {
      question:
        "What finance and EMI options are available at Raam Ather in Hyderabad & Chennai?",
      answer:
        "We partner with leading lenders to offer low down payment, flexible EMI tenures, and quick approvals for Ather 450X/450S in both cities. Our team will tailor offers to your profile.",
    },
    {
      question:
        "Is there an Ather service center in Hyderabad and Chennai?",
      answer:
        "Yes. Raam Ather provides Ather-certified servicing, diagnostics, and genuine parts in both Hyderabad and Chennai. Book service slots online or at the dealership.",
    },
    {
      question:
        "Do you install the Ather home charging point in Hyderabad and Chennai?",
      answer:
        "Absolutely. We survey your parking, coordinate installation, and activate your Ather home charger for seamless overnight charging in both cities.",
    },
    {
      question:
        "Is Ather Grid fast charging available across Hyderabad and Chennai?",
      answer:
        "Ather Grid public charging is expanding across key neighborhoods, malls, and cafés in Hyderabad and Chennai. Our team will help you locate the nearest Grid points on your routes.",
    },
    {
      question: "What is included in Ather warranty and service packages?",
      answer:
        "Ather provides manufacturer warranty coverage for major components and optional service plans. Raam Ather advisors will help you pick the right plan for your usage.",
    },
    {
      question:
        "Do you accept scooter/bike exchange at Raam Ather Hyderabad & Chennai?",
      answer:
        "Yes. Share your current vehicle details for an instant valuation, and we’ll adjust it against your new Ather electric scooter purchase.",
    },
    {
      question: "How long does delivery take after booking?",
      answer:
        "Delivery timelines vary by color/variant and stock. Our team will confirm your estimated delivery date at the time of booking and keep you updated.",
    },
    {
      question: "What documents do I need for purchase and registration?",
      answer:
        "Typically a government-issued ID, address proof, passport photo, PAN, and financing documents (if applicable). Our team will guide you through the process in Hyderabad or Chennai.",
    },
    {
      question:
        "Can I get accessories and riding gear at Raam Ather showrooms?",
      answer:
        "Yes. Explore genuine Ather accessories, chargers, helmets, phone mounts, and more at our Hyderabad and Chennai locations.",
    },
    {
      question:
        "How can businesses or fleets purchase Ather scooters from Raam Ather?",
      answer:
        "We support B2B & fleet requirements with bulk pricing, invoicing, and service support in both cities. Contact our corporate sales desk for details.",
    },
    {
      question:
        "Who should I contact for support after purchase?",
      answer:
        "Reach out to your Raam Ather showroom team or our service desk for any ownership, charging, or service queries in Hyderabad & Chennai.",
    },
  ];

  // --------- STRUCTURED DATA (JSON-LD) ---------
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Optional LocalBusiness JSON-LD to strengthen geo relevance
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Raam Ather",
    url: siteUrl,
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Chennai" },
    ],
    brand: { "@type": "Brand", name: "Ather" },
    // If you have exact addresses/phones, add them here for even better SEO.
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        {/* SEO metadata now handled by page-level metadata */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}${pagePath}`} />
        <meta property="og:site_name" content="Raam Ather" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {/* LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </div>

      {/* Visible heading helps SEO */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Raam Ather Dealership FAQs – Hyderabad & Chennai
        </h1>
        <p className="text-gray-600 mb-8">
          Everything about Ather 450X/450S test rides, pricing, finance, service, and charging at Raam Ather showrooms in Hyderabad & Chennai.
        </p>

        {/* Client-side accordion/UI */}
        <FAQClient faqData={faqData} />
      </section>
    </>
  );
}
