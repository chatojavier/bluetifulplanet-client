export type ContactFormReturn = {
  contact_form_id: number;
  status: 'mail_sent' | 'mail_failed' | 'validation_failed';
  message: string;
  posted_data_hash: string;
  invalid_fields: string[];
};
