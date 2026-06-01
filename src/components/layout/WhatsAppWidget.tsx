import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Home, HeadphonesIcon, X } from 'lucide-react';
import { getWhatsAppUrl } from '../../lib/whatsapp';

const QUICK_ACTIONS = [
  {
    label: 'Book a stay',
    icon: Calendar,
    intent: 'booking' as const,
    description: 'Send reservation details',
  },
  {
    label: 'Property inquiry',
    icon: Home,
    intent: 'property' as const,
    description: 'Ask about a listing',
  },
  {
    label: 'Guest support',
    icon: HeadphonesIcon,
    intent: 'support' as const,
    description: 'Help during your stay',
  },
];

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="glass p-4 w-72 shadow-2xl mb-2"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Chat on WhatsApp</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.intent}
                  href={getWhatsAppUrl({ intent: action.intent })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <action.icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-gold">{action.label}</div>
                    <div className="text-[10px] text-gray-500">{action.description}</div>
                  </div>
                </a>
              ))}
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-xs uppercase tracking-widest text-gold hover:underline"
            >
              Open general chat →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform relative"
        aria-label="WhatsApp menu"
      >
        <MessageCircle size={32} className="text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-luxury-black" />
      </button>
    </div>
  );
}
