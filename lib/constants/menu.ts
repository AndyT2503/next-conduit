export interface Menu {
  url: string;
  title: string;
  icon?: string;
  image?: string;
}

export const NON_AUTH_MENU: Menu[] = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/login',
    title: 'Sign in',
  },
  {
    url: '/register',
    title: 'Sign up',
  },
];

export const AUTH_MENU: Menu[] = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/editor',
    title: 'New Article',
    icon: 'fa-solid fa-pen-to-square',
  },
  {
    url: '/settings',
    title: 'Settings',
    icon: 'fa-solid fa-gear',
  },
];