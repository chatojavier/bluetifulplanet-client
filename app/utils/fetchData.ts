/* global RequestInit */
/* global NextFetchRequestConfig */

type CustomInit = Omit<RequestInit, 'next'> & NextFetchRequestConfig;

const post = async <T = unknown>(
  url: string,
  body: Record<string, unknown>,
  init?: CustomInit
) => {
  const res = await fetch(url, {
    method: 'POST',
    cache: 'no-store',
    headers: init?.headers ?? {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: T = await res.json();

  return data;
};

const get = async <T = unknown>(url: string, init?: CustomInit): Promise<T> => {
  const res = await fetch(url, {
    method: 'GET',
    ...(init?.tags ? { next: { tags: init.tags } } : {}),
    ...(init?.revalidate ? { next: { revalidate: init.revalidate } } : {}),
    ...init,
  });

  const data: T = await res.json();

  return data;
};

const fetchData = {
  post,
  get,
};

export default fetchData;
