import React from 'react';

interface HeaderSEOProps {
  children: React.ReactNode;
}

export default function HeaderSEO({ children }: HeaderSEOProps) {
  return (
    <>
      {children}
    </>
  );
}
