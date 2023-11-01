/* eslint-disable import/no-extraneous-dependencies */
import { DeepOmit } from '@app/types/general';
import format from 'date-fns/format';

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
  return format(new Date(date), pattern);
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
