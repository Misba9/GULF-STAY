import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../config/site';
import { Logo } from '../Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isSolid = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `site-nav-link${isActive ? ' site-nav-link--active' : ''}`;

  return (
    <header
      className={`site-navbar ${isSolid ? 'site-navbar--solid' : 'site-navbar--transparent'}`}
      role="banner"
    >
      <div className="site-navbar__inner">
        <div className="site-navbar__brand">
          <Logo variant="header" />
        </div>

        <nav className="site-navbar__menu hidden lg:flex" aria-label="Main navigation">
          <ul className="site-navbar__links">
            {NAV_LINKS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={navLinkClass} end={item.path === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/book" className="nav-cta-btn">
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          className="site-navbar__toggle lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="site-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="site-mobile-menu__header">
              <Logo variant="drawer" />
              <button
                type="button"
                className="site-navbar__toggle"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="site-mobile-menu__nav">
              <ul className="site-mobile-menu__links">
                {NAV_LINKS.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `site-mobile-menu__link${isActive ? ' text-gold' : ''}`
                      }
                      end={item.path === '/'}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Link to="/book" className="nav-cta-btn nav-cta-btn--block">
                Book Your Stay
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
