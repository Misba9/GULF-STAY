import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { SITE } from '../../config/site';

export function ContactForm() {
  const [result, setResult] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult('Sending....');

    const accessKey = SITE.web3formsAccessKey;
    if (!accessKey) {
      setResult('Error — form not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env');
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append('access_key', accessKey);
    formData.append('from_name', SITE.name);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = (await response.json()) as { success?: boolean; message?: string };

    if (data.success) {
      setResult('Success!');
      event.currentTarget.reset();
    } else {
      setResult(data.message ?? 'Error');
    }
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors';
  const labelClass = 'text-[10px] uppercase tracking-widest text-gray-500';

  const isSending = result === 'Sending....';
  const isSuccess = result === 'Success!';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          Subject
        </label>
        <select id="contact-subject" name="subject" className={`${inputClass} appearance-none`}>
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

      <button
        type="submit"
        disabled={isSending}
        className="w-full gold-btn flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isSending ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Sending...
          </>
        ) : (
          'Submit'
        )}
      </button>

      {result && (
        <p
          className={`text-sm flex items-center gap-2 ${
            isSuccess ? 'text-green-400' : isSending ? 'text-gray-400' : 'text-amber-400'
          }`}
        >
          {isSuccess && <CheckCircle size={18} />}
          {!isSuccess && !isSending && <AlertCircle size={18} />}
          {result}
        </p>
      )}
    </form>
  );
}
