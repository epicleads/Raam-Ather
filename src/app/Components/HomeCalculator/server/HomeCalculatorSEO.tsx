import { Metadata } from 'next';

export const calculatorMetadata: Metadata = {
  title: 'Raam Ather EMI & Savings Calculator – Compare EV vs Petrol',
  description: 'Plan your EMI and compare Ather EV running costs vs petrol scooters. Discover how much you save daily, monthly, and annually with Raam Ather.',
  keywords: ['EMI calculator', 'EV vs petrol', 'Ather savings', 'electric scooter cost', 'loan calculator'],
};

interface HomeCalculatorSEOProps {
  children?: React.ReactNode;
}

export default function HomeCalculatorSEO({ children }: HomeCalculatorSEOProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Raam Ather Calculator Suite',
            description: 'EMI and savings calculator for Ather electric scooters',
            url: 'https://raamather.com',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser'
          })
        }}
      />
      {children}
    </>
  );
}