type BottomNavSEOProps = {
    title?: string;
    description?: string;
  };
  
  export function BottomNavSEO({
  // title is not used, so remove assignment
    description = "Quick navigation to explore Ather scooters, offers, and book a test drive.",
  }: BottomNavSEOProps) {
    return (
      <>
        <meta name="description" content={description} />
      </>
    );
  }
  