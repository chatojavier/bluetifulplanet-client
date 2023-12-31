import { ApiRoutes } from '@api/api.types';
import localPostContactForm, { ContactFormData } from '@api/wp/contact/service';
import { ContactFormReturn } from '@app/api/wp/contact/utils';
import fetchData from '@app/utils/fetchData';
import { isBrowser } from '@app/utils/general';

const postContactForm = async (formData: ContactFormData) => {
  if (!isBrowser()) {
    return localPostContactForm(formData);
  }

  return fetchData.post<ContactFormReturn>(ApiRoutes.CONTACT, formData);
};

const ContactService = {
  postContactForm,
};

export default ContactService;
