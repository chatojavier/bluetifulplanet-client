import { ApiRoutes } from '@app/api/api.types';
import fetchData from '@app/utils/fetchData';
import { objectToFormData } from '@app/utils/general';
import { ContactFormReturn } from './utils';

export type ContactFormData = {
  fullname: string;
  email: string;
  message: string;
  source: string;
  system: string;
  formId: string;
};

const postContactForm = async (
  data: ContactFormData,
  formHost?: string | null
) => {
  const apiHost = process.env.WORDPRESS_HOST;
  const endpoint = ApiRoutes.CONTACT_FORM;
  const { formId, ...restData } = data;
  const url = `${apiHost}${endpoint}/${formId}/feedback`;

  const user = process.env.WP_REST_API_USER;
  const pass = process.env.WP_REST_API_PASS;
  const base64Auth = Buffer.from(`${user}:${pass}`).toString('base64');

  const init = {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${base64Auth}`,
    },
  };

  const formData = objectToFormData({
    ...restData,
    _wpcf7_unit_tag: formId,
    ...(formHost && { host: formHost }),
  });

  return fetchData.post<ContactFormReturn>(url, formData, init);
};

export default postContactForm;
