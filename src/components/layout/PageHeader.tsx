import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative pt-40 pb-20 bg-luxury-gray overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-gold tracking-widest uppercase text-sm">{eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-6">{title}</h1>
          {description && (
            <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
