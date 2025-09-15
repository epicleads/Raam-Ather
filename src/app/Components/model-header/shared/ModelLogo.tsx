"use client";

interface ModelLogoProps {
  text: string;
  scrollDepth: number;
}

export default function ModelLogo({ text, scrollDepth }: ModelLogoProps) {
  return (
    <div className="flex items-center">
      <h1 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${
        scrollDepth > 0.5 ? 'text-white' : 'text-gray-900'
      }`}>
        {text}
      </h1>
    </div>
  );
}
