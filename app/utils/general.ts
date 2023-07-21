import { DeepOmit } from '@app/types/general';

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
