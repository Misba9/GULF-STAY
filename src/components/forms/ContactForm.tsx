import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToWeb3Forms } from '../../lib/web3forms';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    const result = await submitToWeb3Forms({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      subject: String(data.get('subject') ?? 'Contact'),
      message: String(data.get('message') ?? ''),
    });

    if (result.success) {
      setStatus('success');
      setFeedback(result.message);
      form.reset();
    } else {
      setStatus('error');
      setFeedback(result.message);
    }
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors';
  const labelClass = 'text-[10px] uppercase tracking-widest text-gray-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClass} htmlFor="contact-name">
            Full Name *
          </label>
          <input id="contact-name" name="name" type="text" required className={inputClass} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor="contact-email">
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className={labelClass} htmlFor="contact-phone">
          Phone / WhatsApp
        </label>
        <input id="contact-phone" name="phone" type="tel" className={inputClass} placeholder="+971 50 000 0000" />
      </div>
      <div className="space-y-2">
        <label className={labelClass} htmlFor="contact-subject">
          Subject *
        </label>
        <select id="contact-subject" name="subject" required className={`${inputClass} appearance-none`}>
          <option className="bg-luxury-black">Booking Inquiry</option>
          <option className="bg-luxury-black">Property Management</option>
          <option className="bg-luxury-black">General Question</option>
          <option className="bg-luxury-black">Corporate Stay</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className={labelClass} htmlFor="contact-message">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={inputClass}
          placeholder="How can we help you?"
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle size={18} />
          {feedback}
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-2 text-amber-400 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          {feedback}
        </div>
      )}

      <button type="submit" disabled={status === 'loading'} className="w-full gold-btn flex items-center justify-center gap-2">
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
