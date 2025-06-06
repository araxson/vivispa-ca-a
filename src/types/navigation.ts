export interface NavItem {
  name: string;
  href: string;
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
