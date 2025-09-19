// Global type declarations for the project

export interface GtagFunction {
  (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: Record<string, string | number | boolean | null | undefined>
  ): void;
}

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}
