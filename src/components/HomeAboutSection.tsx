import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

const STATS = [
  { label: 'Premium Properties', val: '50+' },
  { label: 'Happy Guests', val: '5000+' },
  { label: 'Guest Rating', val: '4.9★' },
  { label: 'Support', val: '24/7' },
];

export function HomeAboutSection() {
  return (
    <section id="about" className="home-about" aria-labelledby="home-about-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="home-about__grid">
          <motion.div
            className="home-about__logo-wrap"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="home-about__logo-card">
              <Logo variant="about" static />
              <p className="home-about__tagline">Vacation Homes · Dubai, UAE</p>
            </div>
          </motion.div>

          <motion.div
            className="home-about__content"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-gold tracking-widest uppercase text-sm">The Gulf Stay Experience</span>
            <h2 id="home-about-heading" className="text-4xl md:text-5xl font-serif mt-4 mb-6">
              Redefining Hospitality in Dubai
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Welcome to Gulf Stay Homes Vacation Homes LLC — a trusted vacation home management company based in Dubai.
              We provide carefully curated luxury apartments, holiday homes, and premium accommodations for travelers
              seeking comfort, convenience, and exceptional experiences.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Our mission is to deliver hotel-quality hospitality with the privacy and flexibility of a home. Every
              property in our portfolio is handpicked to meet rigorous standards of luxury and style.
            </p>

            <div className="home-about__stats">
              {STATS.map((item) => (
                <div key={item.label} className="home-about__stat">
                  <div className="text-2xl md:text-3xl font-serif text-white mb-1">{item.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gold">{item.label}</div>
                </div>
              ))}
            </div>

            <Link to="/about" className="gold-btn inline-flex items-center gap-2 mt-10 group">
              Learn More About Us
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
