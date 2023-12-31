/* global HeadersInit */

const post = async <T = unknown>(
  url: string,
  body: Record<string, unknown>,
  headers?: HeadersInit
) => {
  const res = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: headers ?? {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: T = await res.json();

  return data;
};

const get = async <T = unknown>(
  url: string,
  headers?: HeadersInit
): Promise<T> => {
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    ...(headers && { headers }),
  });

  const data: T = await res.json();

  return data;
};

const fetchData = {
  post,
  get,
};

export default fetchData;
