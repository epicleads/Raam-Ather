interface Props {
    title: string;
    description: string;
  }
  
  export function RiztaHeroSEO({ title, description }: Props) {
    return (
      <>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </>
    );
  }
  