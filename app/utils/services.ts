import { objectToFormData } from './general';

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

export const servicesValues = 'servicesValues';

export default {
  fetchPostForm,
};
