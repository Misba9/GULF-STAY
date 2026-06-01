import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';

const FAQS = [
  {
    q: 'How do I book a property?',
    a: 'Use our online booking wizard at /book with live price estimates, or contact us via WhatsApp for personalized assistance. We confirm availability within 24 hours.',
  },
  {
    q: 'Are properties fully furnished?',
    a: 'Yes. Every home is professionally designed with high-end appliances, linens, and essential amenities.',
  },
  {
    q: 'Is airport pickup available?',
    a: 'Premium chauffeur services and airport transfers are available upon request for a seamless arrival.',
  },
  {
    q: 'Can I extend my stay?',
    a: 'Extensions depend on availability. Contact your guest manager at least 48 hours before check-out.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bank transfer, card payments, and corporate invoicing. Details are shared after reservation confirmation.',
  },
  {
    q: 'Is there a security deposit?',
    a: 'A refundable deposit may apply depending on the property and length of stay. This will be communicated before confirmation.',
  },
];

export function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about booking and staying with Gulf Stay Homes."
      />
      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.q} className="glass group">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <span className="text-lg font-medium pr-4">{faq.q}</span>
                  <ChevronRight className="text-gold group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-gray-500 mb-6">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="outline-btn">
                Contact Us
              </Link>
              <Link to="/book" className="gold-btn">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
