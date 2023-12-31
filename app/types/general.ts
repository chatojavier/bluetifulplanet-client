/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */

export type Nullable<T> = T | null | undefined;

export enum PageTemplate {
  CONTACT_ME = 'Contact Me',
  PLAIN_CONTENT = 'Plain Content',
  DEFAULT = 'Default',
}

export type DeepNonNullable<T> = {
  [K in keyof T]: NonNullable<DeepNonNullable<T[K]>>;
} & {};

export enum Breakpoint {
  XS = 0,
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536,
}

export type DisplayOrientation = 'landscape' | 'portrait';
