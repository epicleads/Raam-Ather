"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from 'next/image';

export type UGCItem = {
  id: string | number;
  type: "image" | "video";
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  label?: string;
  alt?: string;
};

type Props = {
  items: UGCItem[];
  className?: string;
  gapPx?: number;
  rowHeightPx?: number;
};

function useIsomorphicLayoutEffect(cb: () => void | (() => void), deps: React.DependencyList) {
  const isBrowser = typeof window !== "undefined";
  return (isBrowser ? useLayoutEffect : useEffect)(cb, deps);
}

function Media({ item, onLoaded }: { item: UGCItem; onLoaded: (w: number, h: number) => void }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (item.type === "image" && imgRef.current?.complete && imgRef.current.naturalWidth) {
      onLoaded(imgRef.current.naturalWidth, imgRef.current.naturalHeight);
    }
  }, [item.type, onLoaded]);

  if (item.type === "image") {
    return (
      <Image
        ref={imgRef}
        src={item.src}
        alt={item.alt || ""}
        fill
        onLoad={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          onLoaded(el.naturalWidth || item.width || 1, el.naturalHeight || item.height || 1);
        }}
        className="w-full h-full object-cover block"
        draggable={false}
        sizes="100vw"
      />
    );
  }

  return (
    <video
      ref={vidRef}
      src={item.src}
      poster={item.poster}
      onLoadedMetadata={(e) => {
        const el = e.currentTarget;
        onLoaded(el.videoWidth || item.width || 1, el.videoHeight || item.height || 1);
      }}
      className="w-full h-full object-cover block"
      playsInline
      muted
      loop
      controls={false}
      autoPlay
    />
  );
}

function classifyByAspect(w: number, h: number, type: "image" | "video") {
  const r = w / Math.max(h, 1);
  if (type === "video" && h >= w * 1.2) return "reel"; // ~9:16
  if (r > 1.35) return "landscape"; // 16:9 or 4:3 wide
  if (r < 0.75) return "portrait"; // tall
  return "square";
}

const bucketAspect: Record<string, string> = {
  landscape: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  reel: "aspect-[9/16]",
  square: "aspect-square",
};

export default function UGCMasonry({
  items,
  className = "",
  gapPx = 16,
  rowHeightPx = 8,
}: Props) {
  return (
    <div
      className={`grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ${className}`}
      style={{ gridAutoRows: `${rowHeightPx}px`, gap: `${gapPx}px` }}
      aria-label="UGC Masonry Collage"
    >
      {items.map((item) => (
        <MasonryCard key={item.id} item={item} gapPx={gapPx} rowHeightPx={rowHeightPx} />
      ))}
    </div>
  );
}

function MasonryCard({ item, gapPx, rowHeightPx }: { item: UGCItem; gapPx: number; rowHeightPx: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [bucket, setBucket] = useState<"landscape" | "portrait" | "reel" | "square">("square");
  const [span, setSpan] = useState<number>(Math.ceil(180 / rowHeightPx));

  const measure = () => {
    if (!cardRef.current) return;
    const height = cardRef.current.getBoundingClientRect().height;
    const rowSpan = Math.ceil((height + gapPx) / (rowHeightPx + gapPx));
    setSpan(rowSpan);
  };

  const handleLoaded = (w: number, h: number) => {
    const b = classifyByAspect(w, h, item.type) as "landscape" | "portrait" | "reel" | "square";
    setBucket(b);
    requestAnimationFrame(() => measure());
  };

  useIsomorphicLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(() => measure());
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl shadow-md overflow-hidden bg-white/40 backdrop-blur-sm hover:shadow-lg transition-transform hover:-translate-y-0.5 ${bucketAspect[bucket]}`}
      style={{ gridRowEnd: `span ${span}` }}
    >
      <div className="absolute inset-0">
        <Media item={item} onLoaded={handleLoaded} />
      </div>

      {item.label && (
        <div className="absolute top-2 left-2 text-xs font-semibold bg-emerald-500 text-white px-2 py-1 rounded-full shadow">
          {item.label}
        </div>
      )}
    </div>
  );
}


