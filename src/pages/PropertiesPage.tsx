import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import { PropertyCard } from '../components/PropertyCard';
import { PROPERTIES, PROPERTY_FILTERS } from '../data/properties';
import type { PropertyType } from '../types/property';

export function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState<PropertyType | 'All'>('All');

  const filtered =
    activeFilter === 'All' ? PROPERTIES : PROPERTIES.filter((p) => p.type === activeFilter);

  return (
    <>
      <PageHeader
        eyebrow="Curated Selection"
        title="Our Luxury Properties"
        description="Handpicked vacation homes across Dubai's most prestigious neighborhoods."
      />
      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 mb-16">
            {PROPERTY_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === f ? 'bg-gold text-luxury-black' : 'border border-white/10 hover:border-gold'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((prop) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <PropertyCard property={prop} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
