import { useState, useMemo, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import { PROPERTIES, calculateNights, formatPrice, getPropertyBySlug } from '../../data/properties';
import { submitToWeb3Forms } from '../../lib/web3forms';
import { getWhatsAppUrl } from '../../lib/whatsapp';

const STEPS = ['Property', 'Dates', 'Details', 'Confirm'];

interface BookingFormProps {
  initialPropertySlug?: string;
}

export function BookingForm({ initialPropertySlug }: BookingFormProps) {
  const [searchParams] = useSearchParams();
  const slugFromUrl = initialPropertySlug ?? searchParams.get('property') ?? '';

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const [propertySlug, setPropertySlug] = useState(slugFromUrl || PROPERTIES[0].slug);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (slugFromUrl) setPropertySlug(slugFromUrl);
  }, [slugFromUrl]);

  const property = getPropertyBySlug(propertySlug) ?? PROPERTIES[0];
  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const subtotal = nights > 0 ? property.price * nights : 0;
  const serviceFee = nights > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + serviceFee;

  const today = new Date().toISOString().split('T')[0];

  const inputClass =
    'w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors';
  const labelClass = 'text-[10px] uppercase tracking-widest text-gray-500';

  function canProceed(): boolean {
    if (step === 1) return Boolean(checkIn && checkOut && nights > 0 && guests <= property.guests);
    if (step === 2) return Boolean(name.trim() && email.trim() && phone.trim());
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const message = [
      `Property: ${property.title} (${property.location})`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Nights: ${nights}`,
      `Guests: ${guests}`,
      `Estimated total: AED ${formatPrice(total)}`,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const result = await submitToWeb3Forms(
      {
        name,
        email,
        phone,
        subject: `Reservation Request — ${property.title}`,
        message,
      },
      {
        property: property.title,
        check_in: checkIn,
        check_out: checkOut,
        nights: String(nights),
        guests: String(guests),
        estimated_total: `AED ${formatPrice(total)}`,
      }
    );

    if (result.success) {
      setStatus('success');
      setFeedback(result.message);
      setStep(3);
    } else {
      setStatus('error');
      setFeedback(result.message);
    }
  }

  const whatsappBookUrl = getWhatsAppUrl({
    intent: 'booking',
    propertyName: property.title,
    checkIn,
    checkOut,
    guests,
  });

  return (
    <div className="glass p-8 md:p-10">
      {/* Step indicator */}
      <div className="flex justify-between mb-10 overflow-x-auto gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= step ? 'bg-gold text-luxury-black' : 'bg-white/10 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs uppercase tracking-widest hidden sm:inline ${i <= step ? 'text-gold' : 'text-gray-500'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-600 mx-1" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <CheckCircle className="text-gold mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-serif mb-4">Reservation Request Sent</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">{feedback}</p>
            <a href={whatsappBookUrl} target="_blank" rel="noopener noreferrer" className="gold-btn inline-flex items-center gap-2">
              <MessageCircle size={18} /> Follow up on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
          >
            {step === 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif">Select Your Property</h3>
                <div className="grid gap-4 max-h-[420px] overflow-y-auto pr-2">
                  {PROPERTIES.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setPropertySlug(p.slug)}
                      className={`flex gap-4 p-4 border text-left transition-all ${
                        propertySlug === p.slug ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/50'
                      }`}
                    >
                      <img src={p.image} alt="" className="w-24 h-20 object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="font-serif">{p.title}</div>
                        <div className="text-xs text-gray-500">{p.location}</div>
                        <div className="text-gold text-sm mt-1">AED {formatPrice(p.price)} / night</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif">Choose Dates & Guests</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass}>Check-in *</label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Check-out *</label>
                    <input
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Number of guests (max {property.guests})</label>
                  <input
                    type="number"
                    min={1}
                    max={property.guests}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
                {nights > 0 && (
                  <div className="p-6 border border-gold/30 bg-gold/5">
                    <div className="flex items-center gap-2 text-gold mb-4">
                      <Calendar size={18} />
                      <span className="text-sm uppercase tracking-widest">Price estimate</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          AED {formatPrice(property.price)} × {nights} nights
                        </span>
                        <span>AED {formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Service fee (5%)</span>
                        <span>AED {formatPrice(serviceFee)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-serif text-gold pt-2 border-t border-white/10">
                        <span>Estimated total</span>
                        <span>AED {formatPrice(total)}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
                      Final price confirmed by our team after availability check
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif">Guest Information</h3>
                <div className="space-y-2">
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass}>Email *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Phone / WhatsApp *</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Special requests</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={inputClass}
                    placeholder="Early check-in, airport transfer, etc."
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif">Review & Submit</h3>
                <div className="space-y-4 text-sm border border-white/10 p-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property</span>
                    <span>{property.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dates</span>
                    <span>
                      {checkIn} → {checkOut} ({nights} nights)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guest</span>
                    <span>{name}</span>
                  </div>
                  <div className="flex justify-between text-gold font-serif text-lg pt-4 border-t border-white/10">
                    <span>Estimated total</span>
                    <span>AED {formatPrice(total)}</span>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 text-amber-400 text-sm">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <p>{feedback}</p>
                      <a href={whatsappBookUrl} className="underline mt-2 inline-block">
                        Book via WhatsApp instead →
                      </a>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  By submitting, you agree to our terms. This is a reservation request — our team will confirm
                  availability within 24 hours.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {step > 0 && status !== 'success' && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="outline-btn flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  disabled={!canProceed()}
                  onClick={() => setStep((s) => s + 1)}
                  className="gold-btn flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Continue <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="gold-btn flex-1 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Submitting...
                    </>
                  ) : (
                    'Submit Reservation Request'
                  )}
                </button>
              )}
              <a
                href={whatsappBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-btn flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
