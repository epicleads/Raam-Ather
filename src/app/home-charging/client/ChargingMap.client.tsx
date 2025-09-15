'use client';

import Image from 'next/image';
import { ChargingMapProps } from '../chargingMap.types';

export function ChargingMapClient({ imageSrc, imageAlt }: Pick<ChargingMapProps, 'imageSrc' | 'imageAlt'>) {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
