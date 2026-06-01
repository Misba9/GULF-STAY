import type { Property, PropertyType } from '../types/property';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    slug: 'royal-palm-suite',
    title: 'Royal Palm Suite',
    location: 'Palm Jumeirah',
    price: 2500,
    beds: 3,
    baths: 3,
    guests: 6,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'An ultra-luxurious beachfront apartment on Palm Jumeirah with panoramic sea views, private balcony, and resort-style amenities.',
    amenities: ['Sea View', 'Private Pool Access', 'Smart Home', 'Concierge', 'Parking', 'High-Speed WiFi'],
    featured: true,
  },
  {
    id: '2',
    slug: 'marina-sky-villa',
    title: 'Marina Sky Villa',
    location: 'Dubai Marina',
    price: 1800,
    beds: 2,
    baths: 2,
    guests: 4,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6162a9a0d9?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Contemporary villa steps from Dubai Marina Walk with skyline views and premium finishes throughout.',
    amenities: ['Marina View', 'Gym Access', 'Housekeeping', 'Parking', 'WiFi'],
    featured: true,
  },
  {
    id: '3',
    slug: 'downtown-elegance',
    title: 'Downtown Elegance',
    location: 'Downtown Dubai',
    price: 3200,
    beds: 4,
    baths: 4,
    guests: 8,
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Signature penthouse overlooking Burj Khalifa with expansive terraces, designer interiors, and 24/7 guest support.',
    amenities: ['Burj View', 'Private Terrace', 'Butler Service', 'Jacuzzi', 'Valet Parking'],
    featured: true,
  },
  {
    id: '4',
    slug: 'burj-view-residences',
    title: 'Burj View Residences',
    location: 'Business Bay',
    price: 1200,
    beds: 1,
    baths: 1,
    guests: 2,
    type: 'Studio',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Boutique studio ideal for business travelers and couples, minutes from Downtown Dubai.',
    amenities: ['City View', 'Work Desk', 'Kitchenette', 'WiFi', 'Pool Access'],
  },
  {
    id: '5',
    slug: 'jbr-beachfront',
    title: 'JBR Beachfront',
    location: 'JBR',
    price: 2100,
    beds: 2,
    baths: 2,
    guests: 4,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Walk to the beach from this stylish JBR apartment with open-plan living and premium appliances.',
    amenities: ['Beach Access', 'Balcony', 'Gym', 'Pool', 'WiFi'],
  },
  {
    id: '6',
    slug: 'desert-rose-estate',
    title: 'Desert Rose Estate',
    location: 'Arabian Ranches',
    price: 4500,
    beds: 5,
    baths: 6,
    guests: 10,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Expansive family villa with private garden, pool, and entertainment areas — perfect for group stays.',
    amenities: ['Private Pool', 'Garden', 'BBQ Area', 'Maid Room', 'Garage', 'Smart TV'],
  },
];

export const PROPERTY_FILTERS: Array<PropertyType | 'All'> = [
  'All',
  'Apartment',
  'Villa',
  'Penthouse',
  'Studio',
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString('en-AE');
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
