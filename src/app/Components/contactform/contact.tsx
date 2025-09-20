import Head from "next/head";
import MapContact from "./form";
import Map from "./map";
import GetInTouchServer from "./getintouchserver";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Raam Ather</title>
        <meta
          name="description"
          content="Get in touch with Raam Ather in Hyderabad and Chennai for Ather electric scooter inquiries, test rides, dealership locations, and EV servicing."
        />
        <meta
          name="keywords"
          content="Raam Ather contact Hyderabad, Raam Ather contact Chennai, Ather dealership Hyderabad, Ather showroom Chennai, book test ride Ather 450X, EV service Hyderabad, EV service Chennai"
        />
      </Head>

      {/* Premium Futuristic Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-neurial text-sm font-medium">Get Connected</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-neurial text-white mb-6 leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Raam Ather</span>
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Connect with the future of electric mobility. Our premium dealerships in Hyderabad and Chennai 
            are ready to deliver an exceptional Ather experience.
          </p>
        </div>
      </section>

{/* Premium Contact Form + Map */}
<section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
  {/* Sophisticated background decoration */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-gray-500/5 to-transparent rounded-full blur-2xl" />
  </div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    

    <div className="contact-section-grid lg:grid-cols-2">
      {/* Left: Enhanced Contact Form */}
      <div className="order-2 lg:order-1 contact-card-container contact-section-card bg-white/80 backdrop-blur-xl border border-gray-200/50 card-stable backdrop-stable">
        {/* Form Header */}
        <div className="contact-card-header bg-gradient-to-r from-green-600 to-green-700 rounded-t-3xl communicating-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-medium text-sm tracking-wide">Get Started</span>
          </div>
          <h2 className="text-3xl font-bold font-neurial text-white mb-2">Let&apos;s Connect</h2>
          <p className="text-green-100 text-base leading-relaxed">
            Start your electric journey with personalized assistance from our experts
          </p>
        </div>
        
        {/* Form Content */}
        <div className="contact-card-content">
          <div className="contact-form-wrapper">
            <MapContact />
          </div>
        </div>
      </div>

      {/* Right: Enhanced Map */}
      <div className="order-1 lg:order-2 contact-card-container contact-section-card bg-white/80 backdrop-blur-xl border border-gray-200/50 card-stable backdrop-stable">
        {/* Map Header */}
        <div className="contact-card-header bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-3xl communicating-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-medium text-sm tracking-wide">Find Us</span>
          </div>
          <h3 className="text-3xl font-bold font-neurial text-white mb-2">Visit Our Showrooms</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Experience Ather scooters in person at our premium locations
          </p>
        </div>
        
        {/* Map Content */}
        <div className="contact-card-content">
          <div className="map-wrapper">
            <Map />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Full-width Get In Touch */}
<GetInTouchServer />
    </>
  );
}
