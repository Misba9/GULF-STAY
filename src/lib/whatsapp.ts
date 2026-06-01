import { SITE } from '../config/site';

export type WhatsAppIntent =
  | 'general'
  | 'booking'
  | 'property'
  | 'support';

export interface WhatsAppOptions {
  intent?: WhatsAppIntent;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  customMessage?: string;
}

function encode(text: string) {
  return encodeURIComponent(text);
}

export function buildWhatsAppMessage(options: WhatsAppOptions): string {
  if (options.customMessage) return options.customMessage;

  const { intent = 'general', propertyName, checkIn, checkOut, guests } = options;

  switch (intent) {
    case 'booking':
      return [
        'Hello Gulf Stay Homes,',
        'I would like to make a reservation:',
        propertyName ? `Property: ${propertyName}` : null,
        checkIn ? `Check-in: ${checkIn}` : null,
        checkOut ? `Check-out: ${checkOut}` : null,
        guests ? `Guests: ${guests}` : null,
        '',
        'Please confirm availability and total price.',
      ]
        .filter(Boolean)
        .join('\n');

    case 'property':
      return `Hello! I'm interested in "${propertyName ?? 'your property'}". Could you share availability and rates?`;

    case 'support':
      return 'Hello, I need assistance with my stay at Gulf Stay Homes.';

    default:
      return 'Hello Gulf Stay Homes! I would like to inquire about your luxury vacation rentals in Dubai.';
  }
}

export function getWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const text = buildWhatsAppMessage(options);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encode(text)}`;
}

export function openWhatsApp(options: WhatsAppOptions = {}) {
  window.open(getWhatsAppUrl(options), '_blank', 'noopener,noreferrer');
}
