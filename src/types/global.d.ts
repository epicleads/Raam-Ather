// Global type declarations for the project

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, string | number | boolean | null | undefined>
    ) => void;
  }
}

export {};
