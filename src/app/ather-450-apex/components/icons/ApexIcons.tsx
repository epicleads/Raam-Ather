// Custom SVG icons for Ather 450 Apex (optimized bundle size)
import { memo } from 'react';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

export const ZapIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
));

ZapIcon.displayName = 'ZapIcon';

export const BikeIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <circle cx="18.5" cy="17.5" r="3.5" />
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="15" cy="5" r="1" />
    <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
  </svg>
));

BikeIcon.displayName = 'BikeIcon';

export const BatteryIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <rect x="2" y="6" width="16" height="12" rx="2" />
    <path d="M18 10v4" />
    <path d="M6 9v6" />
    <path d="M10 9v6" />
    <path d="M14 9v6" />
  </svg>
));

BatteryIcon.displayName = 'BatteryIcon';

export const GemIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path d="M6 3h12l4 6-10 13L2 9z" />
    <path d="M11 3L8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
));

GemIcon.displayName = 'GemIcon';

export const SmartphoneIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
));

SmartphoneIcon.displayName = 'SmartphoneIcon';

export const MonitorIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </svg>
));

MonitorIcon.displayName = 'MonitorIcon';

export const ShieldIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
));

ShieldIcon.displayName = 'ShieldIcon';

export const WrenchIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
));

WrenchIcon.displayName = 'WrenchIcon';

export const LockIcon = memo(({ className = "w-6 h-6", ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
));

LockIcon.displayName = 'LockIcon';

// Icon mapping for easy component switching
export const iconMap = {
  zap: ZapIcon,
  bike: BikeIcon,
  battery: BatteryIcon,
  gem: GemIcon,
  smartphone: SmartphoneIcon,
  monitor: MonitorIcon,
  shield: ShieldIcon,
  wrench: WrenchIcon,
  lock: LockIcon,
} as const;

export type IconType = keyof typeof iconMap;
