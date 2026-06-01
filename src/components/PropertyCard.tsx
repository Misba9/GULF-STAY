import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Users } from 'lucide-react';
import type { Property } from '../types/property';
import { formatPrice } from '../data/properties';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group bg-luxury-gray border border-white/5 overflow-hidden">
      <Link to={`/properties/${property.slug}`} className="block">
        <div className="relative h-80 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 glass px-3 py-1 text-[10px] uppercase tracking-widest">
            {property.type}
          </div>
          {property.featured && (
            <div className="absolute top-4 right-4 bg-gold text-luxury-black px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="w-full gold-btn py-3 text-sm text-center block">View Details</span>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link to={`/properties/${property.slug}`}>
              <h3 className="text-xl font-serif mb-1 hover:text-gold transition-colors">{property.title}</h3>
            </Link>
            <div className="flex items-center text-gray-400 text-xs gap-1">
              <MapPin size={12} className="text-gold" />
              {property.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-gold font-bold">AED {formatPrice(property.price)}</div>
            <div className="text-[10px] text-gray-500 uppercase">per night</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Bed size={14} className="text-gold" /> {property.beds} Beds
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Bath size={14} className="text-gold" /> {property.baths} Baths
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users size={14} className="text-gold" /> {property.guests} Guests
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/book?property=${property.slug}`} className="flex-1 gold-btn py-2 text-xs text-center">
            Book Now
          </Link>
          <a
            href={`https://wa.me/971562033367?text=${encodeURIComponent(
              `Hello! I'm interested in "${property.title}" at ${property.location}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 outline-btn py-2 text-xs text-center"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
