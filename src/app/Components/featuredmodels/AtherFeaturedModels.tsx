'use client';

import React from 'react';
import AtherFeaturedModelsMobile from './AtherFeaturedModelsMobile';
import AtherFeaturedModelsDesktop from './AtherFeaturedModelsDesktop';

const AtherFeaturedModels: React.FC = () => {


  return (
    <>
          {/* Mobile View */}
          <div className="md:hidden">
        <AtherFeaturedModelsMobile />
                  </div>
                  
      {/* Desktop View */}
      <div className="hidden md:block">
        <AtherFeaturedModelsDesktop />
                              </div>
                            </>
  );
};

export default AtherFeaturedModels;
