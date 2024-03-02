/* global RequestInit */
/* global NextFetchRequestConfig */

export type CustomInit = Omit<RequestInit, 'next'> & NextFetchRequestConfig;

const post = async <T = unknown>(
  url: string,
  body: Record<string, unknown>,
  init?: CustomInit
) => {
  const { headers, ...rest } = init || {};
  const res = await fetch(url, {
    method: 'POST',
    cache: 'no-store',
    headers: headers ?? {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...rest,
  });

  const data: T = await res.json();

  if (!res.ok) {
    throw new Error((data as Error).message ?? res.statusText);
  }

  return data;
};

const get = async <T = unknown>(url: string, init?: CustomInit): Promise<T> => {
  const { tags, revalidate, ...rest } = init || {};
  const res = await fetch(url, {
    method: 'GET',
    ...(tags && { next: { tags } }),
    ...(revalidate && { next: { revalidate } }),
    ...rest,
  });

  const data: T = await res.json();

  if (!res.ok) {
    throw new Error((data as Error).message ?? res.statusText);
  }

  return data;
};

const fetchData = {
  post,
  get,
};

export default fetchData;
