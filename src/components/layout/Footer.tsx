import { Link } from 'react-router-dom';
import { ChevronRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { SITE } from '../../config/site';

export function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 border-2 border-gold flex items-center justify-center rotate-45">
                <span className="text-gold font-serif text-sm -rotate-45 font-bold">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold tracking-widest">GULF STAY</span>
                <span className="text-[8px] tracking-[0.2em] text-gold uppercase">{SITE.tagline}</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Luxury vacation home management in Dubai. Hotel-quality hospitality with the privacy of home.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 glass flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {[
                { label: 'Home', path: '/' },
                { label: 'Properties', path: '/properties' },
                { label: 'Book a Stay', path: '/book' },
                { label: 'About', path: '/about' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-8">Popular Locations</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {['Palm Jumeirah', 'Dubai Marina', 'Downtown Dubai', 'JBR', 'Business Bay', 'City Walk'].map(
                (item) => (
                  <li key={item}>
                    <Link to="/properties" className="hover:text-gold transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-8">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-xs">
            © 2026 Gulf Stay Homes Vacation Homes L.L.C. All rights reserved.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-500">
            <span>DTCM Licensed</span>
            <span>VAT Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
