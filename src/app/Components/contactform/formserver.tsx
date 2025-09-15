import Head from "next/head";
import FormContact from "./form";
import MapContact from "./map";

export default function FormPage() {
  return (
    <>
      <Head>
        <title>Contact Us - Raam ather</title>
        <meta name="description" content="Get in touch with raam ather for bookings, services, and more." />
        <meta name="keywords" content="Raam ather electric bikes, contact, book test drive, car service, request callback" />
      </Head>

      <main className="relative min-h-screen py-6">
        {/* Background Image with Light Opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/contact us.jpg')` }}
        />
        <div className="absolute inset-0 bg-white/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-20">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4">Contact Us</h1>
            <p className="text-base text-[#666666] max-w-3xl mx-auto">
              Get in touch with us for bookings, services, and support. We&apos;re here to help!
            </p>
          </div>
          
          {/* Form and Map Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-stretch">
            {/* Form Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col">
              <h2 className="text-xl font-bold text-[#1B1B1B] mb-4">Send us a Message</h2>
              <div className="flex-1">
                <FormContact />
              </div>
            </div>
            
            {/* Map Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col">
              <h2 className="text-xl font-bold text-[#1B1B1B] mb-4">Find Our Locations</h2>
              <div className="flex-1">
                <MapContact />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
