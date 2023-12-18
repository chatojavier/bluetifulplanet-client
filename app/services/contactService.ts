import fetchData from './fetchData';

export type ContactFormData = {
  fullname: string;
  email: string;
  message: string;
  source: string;
  system: string;
};

const postContactForm = async (formData: ContactFormData) => {
  const url = '/contact-me/api';
  return fetchData.post(url, formData);
};

const contactService = {
  postContactForm,
};

export default contactService;
