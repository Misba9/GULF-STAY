import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { HeroVideoBackground } from '../components/HeroVideoBackground';
import { HomeAboutSection } from '../components/HomeAboutSection';
import { PROPERTIES } from '../data/properties';

export function HomePage() {
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <HeroVideoBackground />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-block text-gold tracking-[0.5em] uppercase text-sm mb-6">Ultra-Premium Rentals</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
              Experience <span className="gold-gradient italic">Luxury Living</span> <br /> in Dubai
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-12 font-light leading-relaxed">
              Exclusive vacation homes and premium holiday rentals designed for comfort, elegance, and unforgettable
              stays.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/properties" className="gold-btn group inline-flex items-center justify-center">
                Explore Properties
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
              </Link>
              <Link to="/book" className="outline-btn inline-flex items-center justify-center">
                Book Your Stay
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 w-full z-20 hidden lg:block">
          <div className="container mx-auto px-6 flex justify-between items-end">
            <div className="flex gap-20">
              {[
                { label: 'Properties', val: '50+' },
                { label: 'Happy Guests', val: '5k+' },
                { label: 'Rating', val: '4.9★' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  <div className="text-3xl font-serif text-gold">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeAboutSection />

      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-gold tracking-widest uppercase text-sm">Featured</span>
              <h2 className="text-4xl md:text-6xl font-serif mt-4">Signature Stays</h2>
            </div>
            <Link to="/properties" className="outline-btn text-sm">
              View All Properties
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-luxury-gray">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold tracking-widest uppercase text-sm">Ready to stay?</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Reserve in Minutes</h2>
          <p className="text-gray-400 mb-10">
            Use our advanced booking wizard with instant price estimates, or message us on WhatsApp for white-glove
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="gold-btn">
              Start Booking
            </Link>
            <Link to="/contact" className="outline-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
