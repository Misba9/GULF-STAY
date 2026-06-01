import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-luxury-black pt-32">
      <div className="text-center px-6">
        <h1 className="text-8xl font-serif text-gold mb-4">404</h1>
        <p className="text-gray-400 mb-8">This page could not be found.</p>
        <Link to="/" className="gold-btn">
          Return Home
        </Link>
      </div>
    </section>
  );
}
