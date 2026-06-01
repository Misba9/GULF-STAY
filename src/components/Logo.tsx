import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export type LogoVariant = 'header' | 'footer' | 'drawer' | 'about';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Where the logo links (default: home). */
  to?: string;
  /** Decorative display without link (e.g. about showcase). */
  static?: boolean;
}

const VARIANT_CLASS: Record<LogoVariant, string> = {
  header: 'site-logo-link--header',
  footer: 'site-logo-link--footer',
  drawer: 'site-logo-link--drawer',
  about: 'site-logo-link--about',
};

const LOGO_SRC: Record<LogoVariant, string> = {
  header: SITE.navbarLogo,
  drawer: SITE.navbarLogo,
  footer: SITE.logo,
  about: SITE.logo,
};

export function Logo({ variant = 'header', className = '', to = '/', static: isStatic = false }: LogoProps) {
  const src = LOGO_SRC[variant];
  const isNavbar = variant === 'header' || variant === 'drawer';
  const classes = [
    'site-logo-link',
    VARIANT_CLASS[variant],
    isNavbar ? 'site-logo-link--navbar' : 'site-logo-link--filled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const image = (
    <img
      src={src}
      alt={SITE.name}
      className="site-logo-img"
      width={isNavbar ? 180 : 180}
      height={isNavbar ? 80 : 56}
      decoding="async"
      fetchPriority={variant === 'header' ? 'high' : 'auto'}
    />
  );

  if (isStatic) {
    return (
      <div className={classes} role="img" aria-label={SITE.name}>
        {image}
      </div>
    );
  }

  return (
    <Link to={to} className={classes} aria-label={`${SITE.name} — ${to === '/' ? 'Home' : 'About'}`}>
      {image}
    </Link>
  );
}
