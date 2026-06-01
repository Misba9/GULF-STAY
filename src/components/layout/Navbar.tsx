import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../config/site';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm uppercase tracking-widest transition-colors ${isActive ? 'text-gold' : 'hover:text-gold'}`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || location.pathname !== '/' ? 'py-4 glass' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-gold flex items-center justify-center rotate-45">
            <span className="text-gold font-serif text-xl -rotate-45 font-bold">G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-widest text-white">GULF STAY</span>
            <span className="text-[10px] tracking-[0.2em] text-gold uppercase">Vacation Homes</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.path} to={item.path} className={navClass} end={item.path === '/'}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/book" className="gold-btn text-xs uppercase tracking-widest px-6 py-3">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden text-gold"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={32} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-luxury-black z-[60] flex flex-col p-10"
          >
            <button
              type="button"
              className="self-end text-gold mb-10"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={40} />
            </button>
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-4xl font-serif hover:text-gold"
                  end={item.path === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/book" className="gold-btn text-center mt-4">
                Book Your Stay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
