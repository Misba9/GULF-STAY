import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Users, Check, ArrowLeft, MessageCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PageHeader } from '../components/layout/PageHeader';
import { getPropertyBySlug, formatPrice } from '../data/properties';
import { getWhatsAppUrl } from '../lib/whatsapp';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;

  if (!property) return <Navigate to="/properties" replace />;

  const whatsappUrl = getWhatsAppUrl({
    intent: 'property',
    propertyName: `${property.title} — ${property.location}`,
  });

  return (
    <>
      <PageHeader eyebrow={property.type} title={property.title} description={property.description} />

      <section className="py-16 bg-luxury-black">
        <div className="container mx-auto px-6">
          <Link to="/properties" className="inline-flex items-center gap-2 text-gold text-sm mb-8 hover:underline">
            <ArrowLeft size={16} /> Back to properties
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Swiper modules={[Navigation, Pagination]} navigation pagination className="aspect-[4/3]">
                {property.images.map((img) => (
                  <SwiperSlide key={img}>
                    <img src={img} alt={property.title} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <div>
              <div className="flex items-center text-gray-400 gap-2 mb-6">
                <MapPin size={16} className="text-gold" />
                {property.location}
              </div>

              <div className="text-4xl font-serif text-gold mb-2">AED {formatPrice(property.price)}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">per night</div>

              <div className="grid grid-cols-3 gap-6 mb-10 p-6 glass">
                <div className="text-center">
                  <Bed className="text-gold mx-auto mb-2" size={20} />
                  <div className="font-serif text-xl">{property.beds}</div>
                  <div className="text-[10px] uppercase text-gray-500">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="text-gold mx-auto mb-2" size={20} />
                  <div className="font-serif text-xl">{property.baths}</div>
                  <div className="text-[10px] uppercase text-gray-500">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Users className="text-gold mx-auto mb-2" size={20} />
                  <div className="font-serif text-xl">{property.guests}</div>
                  <div className="text-[10px] uppercase text-gray-500">Guests</div>
                </div>
              </div>

              <h3 className="font-serif text-2xl mb-4">Amenities</h3>
              <ul className="grid grid-cols-2 gap-3 mb-10">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check size={14} className="text-gold shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/book?property=${property.slug}`} className="gold-btn text-center flex-1">
                  Book This Property
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn flex-1 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
