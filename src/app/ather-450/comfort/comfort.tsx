import { Metadata } from 'next';
import Comfort1Client from './comfort1Client';
import Comfort2Client from './comfort2Client';

export const metadata: Metadata = {
  title: 'Ather 450 & 450s Comfort Features | Raam Ather Hyderabad Chennai',
  description: 'Experience superior comfort with Ather 450 touchscreen dashboard and 450s DeepView™ display. Visit Raam Ather dealership in Hyderabad and Chennai for test rides.',
  keywords: 'Ather 450 comfort, Ather 450s features, touchscreen dashboard, DeepView display, Raam Ather Hyderabad, Raam Ather Chennai, electric scooter comfort',
};

const ComfortSection = () => {
  return (
    <>
      {/* SEO Content - Hidden but crawlable */}
      <div className="sr-only">
        <h1>Raam Ather Comfort Features - Hyderabad & Chennai</h1>
        <p>
          Discover the advanced comfort features of Ather 450 and 450s exclusively at Raam Ather dealership in Hyderabad and Chennai. 
          Both models offer cutting-edge dashboard technology enabling intuitive control and superior riding experience.
        </p>
        <p>
          The 450 model features a 17.7 cm (7&#34;) TFT Touchscreen Dashboard that lets you touch, tap, and scroll through an intuitive UI smoothly. 
          The upgraded 450s model introduces DeepView™ Display with an industry-first 18-segment EBN screen, ensuring clarity under all lighting conditions.
        </p>
        <p>
          Raam Ather provides exclusive access to these models with expert consultation and test rides in Hyderabad and Chennai. 
          Experience how Ather scooters blend performance with comfort for effortless urban mobility.
        </p>
        <h2>Ather 450 Touchscreen Dashboard Features</h2>
        <p>
          The Ather 450 comes equipped with a premium 17.7 cm (7 inch) TFT touchscreen dashboard featuring intuitive touch controls, 
          navigation integration, and smartphone connectivity available at Raam Ather showrooms.
        </p>
        <h2>Ather 450s DeepView™ Display Technology</h2>
        <p>
          The advanced 450s model features industry-first DeepView™ Display with 18-segment EBN technology, 
          providing superior visibility in both sunlight and low-light conditions. Visit Raam Ather for demonstrations.
        </p>
      </div>

      {/* Visual Component */}
      <Comfort1Client />
      <Comfort2Client />
    </>
  );
};

export default ComfortSection;
