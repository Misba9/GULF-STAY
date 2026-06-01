export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Studio';

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  guests: number;
  type: PropertyType;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
}
