const post = async (url: string, body: Record<string, unknown>) => {
  const res = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.status >= 400) throw new Error(data.message);

  return data;
};

const get = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  });

  const data = await res.json();

  if (res.status >= 400) throw new Error(data.message);

  return data;
};

const fetchData = {
  post,
  get,
};

export default fetchData;
