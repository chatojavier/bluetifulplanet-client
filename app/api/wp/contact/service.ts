import { ApiRoutes } from '@app/api/api.types';
import fetchData from '@app/utils/fetchData';
import { ContactFormReturn } from './utils';

export type ContactFormData = {
  fullname: string;
  email: string;
  message: string;
  source: string;
  system: string;
};

const postContactForm = async (formData: ContactFormData) => {
  const host = process.env.WORDPRESS_HOST;
  const endpoint = ApiRoutes.CONTACT_FORM;
  const contactFormId = process.env.CONTACT_FORMID;
  const url = `${host}${endpoint}/${contactFormId}/feedback`;

  return fetchData.post<ContactFormReturn>(url, formData);
};

export default postContactForm;
