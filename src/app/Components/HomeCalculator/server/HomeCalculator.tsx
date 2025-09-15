'use client';
import { CalculatorData } from '../home-calculator.types';
import HomeCalculatorSEO from './HomeCalculatorSEO';
import EmiCalculator from '../client/EmiCalculator.client';
import EvVsPetrolSlider from '../client/EvVsPetrolSlider.client';
import TestRideFormModal from '../../../Components/test-ride-form/TestRideFormModal.client';
import { useTestDriveModal } from '../../../Components/test-ride-form/TestDriveModalStore';

export const revalidate = 120;

function getCalculatorData(): CalculatorData {
  return {
    sectionTitle: "Plan Your Savings with Raam Ather",
    sectionSubtitle: "Calculate your EMI and discover how much you save with electric mobility"
  };
}

export default function HomeCalculator() {
  const modal = useTestDriveModal();
  const data = getCalculatorData();

  return (
    <HomeCalculatorSEO>
      <section 
        id="plan-your-savings"
        className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
        aria-labelledby="calculator-title"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-green-500/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <header className="text-center mb-12">
            <h2 
              id="calculator-title"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {data.sectionTitle}
            </h2>
            {data.sectionSubtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.sectionSubtitle}
              </p>
            )}
          </header>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* EMI Calculator */}
            <div className="order-1 h-full">
              <EmiCalculator />
            </div>

            {/* EV vs Petrol Comparison */}
            <div className="order-2 h-full">
              <EvVsPetrolSlider />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
              onClick={() => modal.openManually()}
            >
              <span className="font-medium">Ready to Switch? Book Your Test Ride</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      <TestRideFormModal />
    </HomeCalculatorSEO>
  );
}