/* eslint-disable import/no-extraneous-dependencies */
import { DeepOmit } from '@apollo/client/utilities/types/DeepOmit';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url: string): string {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export function removeAllTrailingSlash(url: string): string {
  if (typeof url !== 'string') return url;
  return url.replace(/\//g, '');
}

/**
 * removeDeepProperty
 */

interface Item<Key> {
  name: Key;
}

type Items<Name extends string> = {
  [Key in Name]?: Item<Key>;
};

export const removeDeepProperty = <T, K extends string>(
  query: T,
  property: K
) => {
  if (query) {
    if (typeof query === 'object' && !Array.isArray(query)) {
      if (Object.keys(query).some(key => key === property)) {
        // eslint-disable-next-line no-param-reassign
        delete (query as Items<K>)[property];
        Object.values(query).forEach(node => {
          removeDeepProperty(node, property);
        });
      }
      if (Object.keys(query).length > 0) {
        Object.values(query).forEach(node => {
          removeDeepProperty(node, property);
        });
      }
    }
    if (Array.isArray(query)) {
      query.forEach(item => {
        removeDeepProperty(item, property);
      });
    }
  }

  return query as DeepOmit<T, K>;
};

export function objectToFormData(obj: Record<string, string | Blob>) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

export const formatDate = (date: string | number | Date, pattern = 'PPP') => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, pattern);
};

export const emailPattern =
  // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const fetchPostForm = async (
  data: Record<string, string | Blob>,
  input: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any
) => {
  const payload = objectToFormData(data);
  const configDefault = {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
    },
    body: payload,
  };

  const res = await fetch(input, { ...configDefault, ...config });

  return res.json();
};

export const isBrowser = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

export const isObject = <T extends Record<string, unknown>>(
  value: T
): boolean => value !== null && typeof value === 'object';
export const isFunction = (
  value: unknown
): value is (...args: unknown[]) => unknown => typeof value === 'function';
export const isString = (value: unknown): value is string =>
  typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
export const isUndef = (value: unknown): value is undefined =>
  typeof value === 'undefined';
