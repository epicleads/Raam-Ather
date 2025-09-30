import { Metadata } from 'next'
import Pricing450Client from './450pricing-client'

export const metadata: Metadata = {
  title: 'Ather 450S & 450X - Pricing & Specifications | Raam Ather',
  description: 'Explore Ather 450S starting at ₹1,19,841 and 450X at ₹1,46,999. Compare specifications, features, range, and performance of Ather electric scooters at Raam Ather dealership.',
  keywords: 'Ather 450S price, Ather 450X specifications, electric scooter price, Ather dealership, Raam Ather, EV scooter specs, Ather range, electric vehicle',
  openGraph: {
    title: 'Ather 450S & 450X - Pricing & Specifications',
    description: 'Compare Ather 450S and 450X models. Starting from ₹1,19,841. Check complete specifications, features and book test ride.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raam Ather',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ather 450S & 450X - Pricing & Specifications',
    description: 'Electric scooters starting from ₹1,19,841. Compare models and book test ride.',
  },
  alternates: {
    canonical: '/models/450/pricing-specs'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  }
}

export default function Pricing450Page() {
  return (
    <>
      <main className="min-h-screen">
        <Pricing450Client />
      </main>
    </>
  )
}