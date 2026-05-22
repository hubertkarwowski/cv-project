type NavLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: NavLink[];
};

const LINK_SZABLONY: NavLink = { label: 'Szablony', href: '#' };
const LINK_PORADNIK: NavLink = { label: 'Poradnik', href: '#' };
const LINK_FAQ: NavLink = { label: 'FAQ', href: '#' };

const NAV_LINKS: NavLink[] = [LINK_SZABLONY, LINK_PORADNIK, LINK_FAQ];

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Produkt',
    links: [
      { label: 'Kreator CV', href: '#' },
      LINK_SZABLONY,
      { label: 'Kreator listu motywacyjnego', href: '#' },
      { label: 'Cennik', href: '#' },
    ],
  },
  {
    title: 'Zasoby',
    links: [
      { label: 'Przykłady CV', href: '#' },
      { label: 'Jak napisać CV', href: '#' },
      { label: 'Blog kariery', href: '#' },
      LINK_PORADNIK,
    ],
  },
  {
    title: 'Wsparcie',
    links: [
      LINK_FAQ,
      { label: 'Kontakt', href: '#' },
      { label: 'O nas', href: '#' },
    ],
  },
  {
    title: 'Prawne',
    links: [
      { label: 'Polityka prywatności', href: '#' },
      { label: 'Regulamin usługi', href: '#' },
      { label: 'Polityka cookies', href: '#' },
    ],
  },
];

const CONTACT_INFO = {
  email: 'kontakt@cfuture.com',
  linkedin: '#',
  instagram: '#',
};

// Jeden czysty i czytelny eksport na dole pliku
export { CONTACT_INFO, FOOTER_SECTIONS, NAV_LINKS };
export type { FooterSection, NavLink };
