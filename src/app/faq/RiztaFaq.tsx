import { RiztaFaqServer } from './faqServer'

interface RiztaFaqProps {
  location?: 'Hyderabad' | 'Chennai' | string
  showLocationSpecific?: boolean
}

/**
 * Ready-to-use Rizta FAQ component with SEO optimization
 * Perfect for importing into rizta/page.tsx
 * 
 * Features:
 * - SEO-optimized with structured data
 * - Location-specific content for better local SEO
 * - Rich snippets for Google search results
 * - Mobile-responsive design
 * - Ather Energy theme
 */
export function RiztaFaq({ location, showLocationSpecific = true }: RiztaFaqProps) {
  return (
    <RiztaFaqServer 
      location={showLocationSpecific ? location : undefined}
    />
  )
}

// Pre-configured components for specific cities
export function RiztaFaqHyderabad() {
  return <RiztaFaq location="Hyderabad" showLocationSpecific={true} />
}

export function RiztaFaqChennai() {
  return <RiztaFaq location="Chennai" showLocationSpecific={true} />
}

// Generic Rizta FAQ without location
export function RiztaFaqGeneral() {
  return <RiztaFaq showLocationSpecific={false} />
}