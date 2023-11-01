/* eslint-disable camelcase */
import { Abhaya_Libre, Nunito, Raleway } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

export const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const gilda = Abhaya_Libre({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gilda',
});
