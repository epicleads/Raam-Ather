// rizta-comfort.tsx
import { RiztaComfortClient } from './rizta-comfort-client'

export interface ComfortFeature {
 id: string
 title: string
 description: string
 icon: string
 category: 'ride' | 'family' | 'storage'
 stats?: {
   value: string
   subtext?: string
 }
 imagePath?: string
}

export interface ComfortBlock {
 heading: string
 features: ComfortFeature[]
}

export default function RiztaComfort() {
 const comfortFeatures: ComfortFeature[] = [
   {
     id: 'ride-modes',
     title: 'Easy Ride Modes',
     description: 'Smart Eco mode for days you want longer range.',
     icon: 'mode',
     category: 'ride',
     imagePath: '/assets/images/ComfortEasyRideModes.webp'
   },
   {
     id: 'suspension',
     title: 'Rear Monoshock Suspension',
     description: 'Enjoy smooth rides even on the roughest roads.',
     icon: 'suspension',
     category: 'ride',
     imagePath: '/assets/images/comfortsuspension.webp'
   },
   {
     id: 'large-seat',
     title: 'Large Seat',
     description: 'Plenty of space for everyone in the family.',
     icon: 'seat',
     category: 'family',
     imagePath: '/assets/images/comfort1.webp'
   },
   {
     id: 'pillion-backrest',
     title: 'Wide Pillion Backrest',
     description: 'Extra comfort and support — sit back and enjoy the ride.',
     icon: 'backrest',
     category: 'family',
     imagePath: '/assets/images/Comfort2.webp'
   },
   {
     id: 'storage-total',
     title: '56L Storage Spaces',
     description: 'Enough for helmets, groceries, school bags.',
     icon: 'storage',
     category: 'storage',
     imagePath: '/Ather-Assets/Rizta/riztacardemomgreenboot.jpg'
   }
 ]

 const jsonLd = {
   '@context': 'https://schema.org',
   '@type': 'Product',
   'name': 'Ather Rizta',
   'hasPart': comfortFeatures.map(feature => ({
     '@type': 'ProductFeature',
     'name': feature.title,
     'description': feature.description,
     'category': feature.category
   }))
 }

 return (
   <>
     <script
       type="application/ld+json"
       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
     />
     <section className="bg-white py-2 md:py-2">
       <div className="container mx-auto px-4 md:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-6 font-[Inter] tracking-tight">
               Comfort & Everyday Ease
             </h2>
             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
               Designed for your daily adventures, built for your family&apos;s comfort
             </p>
           </div>
           <RiztaComfortClient features={comfortFeatures} />
         </div>
       </div>
     </section>
   </>
 )
}