type Entity = '&amp;' | '&quot;' | '&#039;';

type Entities = {
  [key in Entity]: string;
};

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url: string): string {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text: string) {
  if (typeof text !== 'string') {
    throw new Error(
      `Failed to decode HTML entity: invalid type ${typeof text}`
    );
  }

  const decoded = text;

  const entities: Entities = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(
    /&amp;|&quot;|&#039;/g,
    char => entities[char as Entity]
  );
}
