
import RiztaHero from "./rizta-hero/RiztaHero";
import RiztaKeyHighlights from './rizta-key-highlights/rizta-key-highlights';
import RiztaComfort from "./rizta-comfort/rizta-comfort";
import RiztaPricing from "./rizta-pricing/rizta-pricing";
import RiztaSafety from "./rizta-safety";
import { RiztaFaq } from '@/app/faq/RiztaFaq'
import RiztaCTA from "./riztaCTA";
import FooterClient from "../Components/footer/footerclient";

export default function RiztaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Client Component */}
      
      
      {/* Rizta Hero Component */}
      <RiztaHero />
      <RiztaPricing />  

     <RiztaKeyHighlights />
     <RiztaComfort />
      
      <RiztaSafety /> 
      <RiztaCTA />
      <RiztaFaq />
      <FooterClient />
    </div>
  );
}
