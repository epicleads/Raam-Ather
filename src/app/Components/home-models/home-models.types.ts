export interface HomeModel {
    id: string;
    name: string;
    startingPrice: number;
    formattedPrice: string;
    emiAmount: number;
    emiFormatted: string;
    image: string;
    altText: string;
    primaryCTA: {
      text: string;
      action: string;
    };
    secondaryCTA: {
      text: string;
      action: string;
    };
    isNew?: boolean;
  }
  
  export interface HomeModelsData {
    sectionTitle: string;
    sectionSubtitle?: string;
    models: HomeModel[];
  }
  
  export interface HomeModelsSliderProps {
    models: HomeModel[];
    className?: string;
  }
  
  export interface HomeModelCardProps {
    model: HomeModel;
    className?: string;
    priority?: boolean;
  }