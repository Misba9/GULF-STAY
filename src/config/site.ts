export const SITE = {
  name: 'Gulf Stay Homes',
  tagline: 'Vacation Homes',
  logo: '/logo.png',
  /** Used in header & mobile menu */
  navbarLogo: '/navbar-logo-2.png',
  phone: '+971562033367',
  phoneDisplay: '+971 562033367',
  email: 'reservation@gulfstayhomes.ae',
  address: 'Al Rafa, Bur Dubai, UAE',
  whatsappNumber: '971562033367',
  /** Get your free key at https://web3forms.com */
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '',
} as const;

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Book', path: '/book' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const;
