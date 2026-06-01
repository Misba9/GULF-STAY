import { PageHeader } from '../components/layout/PageHeader';
import { BookingForm } from '../components/forms/BookingForm';

export function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="Book Your Luxury Stay"
        description="Multi-step reservation with live price estimates. Submit online or continue on WhatsApp for instant support."
      />
      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
