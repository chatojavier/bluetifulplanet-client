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

/** Union of primitives to skip with deep omit utilities. */
type Primitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null;

/** Deeply omit members of an array of interface or array of type. */
export type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

/** Deeply omit members of an interface or type. */
export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP // extra level of indirection needed to trigger homomorhic behavior // distribute over unions
        ? TP extends Primitive
          ? TP // leave primitives and functions alone
          : TP extends any[]
          ? DeepOmitArray<TP, K> // Array special handling
          : DeepOmit<TP, K>
        : never;
    };

/** Deeply omit members of an array of interface or array of type, making all members optional. */
export type PartialDeepOmitArray<T extends any[], K> = Partial<{
  [P in Partial<keyof T>]: Partial<PartialDeepOmit<T[P], K>>;
}>;

/** Deeply omit members of an interface or type, making all members optional. */
export type PartialDeepOmit<T, K> = T extends Primitive
  ? T
  : Partial<{
      [P in Exclude<keyof T, K>]: T[P] extends infer TP // extra level of indirection needed to trigger homomorhic behavior // distribute over unions
        ? TP extends Primitive
          ? TP // leave primitives and functions alone
          : TP extends any[]
          ? PartialDeepOmitArray<TP, K> // Array special handling
          : Partial<PartialDeepOmit<TP, K>>
        : never;
    }>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;
