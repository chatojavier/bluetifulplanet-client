/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
type Primitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null;

type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive
          ? TP // leave primitives and functions alone
          : TP extends any[]
          ? DeepOmitArray<TP, K> // Array special handling
          : DeepOmit<TP, K>
        : never;
    };

export type Nullable<T> = T | null | undefined;

export enum PageTemplate {
  CONTACT_ME = 'Contact Me',
  PLAIN_CONTENT = 'Plain Content',
  DEFAULT = 'Default',
}

export enum Endpoints {
  GRAPHQL = '/graphql',
  FORM = '/wp-json/contact-form-7/v1/contact-forms',
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
