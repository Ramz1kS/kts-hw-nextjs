import type { NavItem } from '@shared/types';

export const navItemsCenter: NavItem[] = [
  { name: 'Products', href: 'products' },
//   { name: 'Categories', href: '/categories' }, потом
  { name: 'About us', href: 'about' },
];

export const navLalasiaLink = '/products'
export const errorLink = (code: string) => `/error/${code}`
