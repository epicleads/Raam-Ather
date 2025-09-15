
import Ather450ApexHero from "./ather-450-apex-hero/Ather450ApexHero";
import Performance from "./performance/Performance"
import Safety from "./safety/safety";
import Comfort from "./comfort/comfort";
import FAQ from "./faq";
import CTASection from "./CTA";
import FooterClient from "../Components/footer/footerclient";

export default function Ather450ApexPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Hero Section */}
      <Ather450ApexHero />
      <Performance />
      <Safety />
      <Comfort />
      
      <CTASection />
      <FAQ />
      <FooterClient />

  

    </div>
  );
}
