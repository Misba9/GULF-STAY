interface BrandIconProps {
  className?: string;
}

/** Gold skyline + home mark — crisp at any navbar size */
export function BrandIcon({ className = '' }: BrandIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 32V20M16 32V24M24 32V16"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <path d="M20 32V14" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 36h32" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 36L20 28l8 8" stroke="#D4AF37" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="16.5" y="31" width="7" height="5" rx="0.5" stroke="#D4AF37" strokeWidth="1.3" />
      <path d="M18 31v5M22 31v5M16.5 33.5h7" stroke="#D4AF37" strokeWidth="1" />
    </svg>
  );
}
