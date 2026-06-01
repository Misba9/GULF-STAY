import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { SITE } from '../../config/site';
import { Logo } from '../Logo';

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="site-footer__grid">
          <div className="footer-brand">
            <Logo variant="footer" />
            <p className="footer-brand__description">
              Luxury vacation home management in Dubai. Hotel-quality hospitality with the privacy of home.
            </p>
            <div className="footer-brand__social">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="footer-social-link"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h4 className="site-footer__heading">Quick Links</h4>
            <ul className="site-footer__list">
              {[
                { label: 'Home', path: '/' },
                { label: 'Properties', path: '/properties' },
                { label: 'Book a Stay', path: '/book' },
                { label: 'About', path: '/about' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h4 className="site-footer__heading">Popular Locations</h4>
            <ul className="site-footer__list">
              {['Palm Jumeirah', 'Dubai Marina', 'Downtown Dubai', 'JBR', 'Business Bay', 'City Walk'].map(
                (item) => (
                  <li key={item}>
                    <Link to="/properties" className="site-footer__link">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="site-footer__column">
            <h4 className="site-footer__heading">Contact</h4>
            <ul className="site-footer__list">
              <li>
                <a href={`tel:${SITE.phone}`} className="site-footer__link">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="site-footer__link">
                  {SITE.email}
                </a>
              </li>
              <li className="text-gray-500">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__copyright">
            © 2026 Gulf Stay Homes Vacation Homes L.L.C. All rights reserved.
          </p>
          <div className="site-footer__badges">
            <span>DTCM Licensed</span>
            <span>VAT Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
