import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';

export function AboutPage() {
  const features = [
    'Prime Dubai Locations',
    'Fully Furnished Homes',
    'Professional Housekeeping',
    '24/7 Customer Support',
    'Secure Online Booking',
    'Flexible Check-in',
    'Family Friendly Stays',
    'Business Traveler Ready',
  ];

  return (
    <>
      <PageHeader
        eyebrow="The Gulf Stay Experience"
        title="Redefining Hospitality in Dubai"
        description="Trusted vacation home management with hotel-quality service and the privacy of home."
      />

      <section className="py-24 bg-luxury-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000"
                  alt="Dubai Skyline"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold p-10 hidden md:block">
                <div className="border border-luxury-black h-full w-full flex flex-col items-center justify-center text-luxury-black text-center">
                  <span className="text-5xl font-serif font-bold">10+</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Years of Excellence</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Welcome to Gulf Stay Homes Vacation Homes LLC — a trusted vacation home management company based in
                Dubai. We provide carefully curated luxury apartments, holiday homes, and premium accommodations.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                Our mission is to deliver hotel-quality hospitality with the privacy and flexibility of a home. Every
                property meets rigorous standards of luxury and style.
              </p>
              <div className="grid grid-cols-2 gap-10">
                {[
                  { label: 'Premium Properties', val: '50+' },
                  { label: 'Happy Guests', val: '5000+' },
                  { label: 'Guest Rating', val: '4.9★' },
                  { label: 'Support', val: '24/7' },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-gold pl-6">
                    <div className="text-3xl font-serif text-white mb-1">{item.val}</div>
                    <div className="text-xs uppercase tracking-widest text-gold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-6 text-center">
          <span className="text-gold tracking-widest uppercase text-sm">Why Choose Us</span>
          <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-16">Unmatched Luxury Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature}
                whileHover={{ scale: 1.05 }}
                className="p-8 glass flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Check size={24} />
                </div>
                <h3 className="text-lg font-medium">{feature}</h3>
              </motion.div>
            ))}
          </div>
          <Link to="/book" className="gold-btn inline-block mt-16">
            Book Your Stay
          </Link>
        </div>
      </section>
    </>
  );
}
