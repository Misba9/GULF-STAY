import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { SITE } from '../config/site';
import { getWhatsAppUrl } from '../lib/whatsapp';

export function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's Plan Your Stay"
        description="Reach our reservation team by form, phone, email, or WhatsApp."
      />
      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 glass flex items-center justify-center text-gold shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Call Us</div>
                    <a href={`tel:${SITE.phone}`} className="text-xl hover:text-gold">
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 glass flex items-center justify-center text-gold shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email Us</div>
                    <a href={`mailto:${SITE.email}`} className="text-xl hover:text-gold">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 glass flex items-center justify-center text-gold shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Our Office</div>
                    <div className="text-xl">{SITE.address}</div>
                  </div>
                </div>
              </div>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                <MessageCircle size={22} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="glass p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
