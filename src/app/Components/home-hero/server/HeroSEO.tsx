interface HeroSEOProps {
    title: string;
    description: string;
  }
  
  export function HeroSEO({ title, description }: HeroSEOProps) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": title,
              "description": description,
              "brand": {
                "@type": "Brand",
                "name": "Ather Energy"
              },
              "category": "Electric Scooter",
              "manufacturer": {
                "@type": "Organization",
                "name": "Ather Energy"
              }
            })
          }}
        />
      </>
    );
  }