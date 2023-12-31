'use client';

import ButtonSquare from '@app/components/ButtonSquare/ButtonSquare';
import InputText from '@app/components/InputText/InputText';
import InputTextArea from '@app/components/InputTextArea';
import useOSAndBrowserInfo from '@app/hooks/useOsAndBrowserInfo';
import ContactService from '@app/services/contactService';
import { emailPattern } from '@app/utils/general';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// eslint-disable-next-line no-shadow
enum InputLabel {
  NAME = 'fullname',
  EMAIL = 'email',
  MESSAGE = 'message',
}

export type ContactFormOutput = {
  [key in InputLabel]: string;
};

const ContactForm: FunctionComponent = () => {
  const [message, setMessage] = useState('');
  const [isServerError, setIsServerError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormOutput>();

  const { os, browser } = useOSAndBrowserInfo();
  const pathname = usePathname();

  const errorMessages = {
    required: 'This field should not be empty',
    email: 'The email format is wrong',
  };

  const onSubmit: SubmitHandler<ContactFormOutput> = async data => {
    setMessage('');
    const payload = {
      ...data,
      system: `OS: ${os}; Browser: ${browser};`,
      source: pathname ?? '',
    };
    try {
      const res = await ContactService.postContactForm(payload);

      if (res.message) {
        if (res.status === 'mail_sent') {
          setIsServerError(false);
          reset();
        } else {
          setIsServerError(true);
        }
        setMessage(res.message as string);
      }
    } catch (error) {
      setIsServerError(true);
      setMessage("We're having some problems, please try again later.");
    }
  };

  return (
    <form className="md:w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-inputs | flex flex-col gap-4 mb-6">
        <InputText
          {...register(InputLabel.NAME, { required: errorMessages.required })}
          placeholder="Name"
          error={errors[InputLabel.NAME]?.message}
        />
        <InputText
          {...register(InputLabel.EMAIL, {
            required: errorMessages.required,
            pattern: { value: emailPattern, message: errorMessages.email },
          })}
          placeholder="Email"
          error={errors[InputLabel.EMAIL]?.message}
        />
        <InputTextArea
          {...register(InputLabel.MESSAGE, {
            required: errorMessages.required,
          })}
          placeholder="Message"
          error={errors[InputLabel.MESSAGE]?.message}
        />
      </div>
      <ButtonSquare type="submit" loading={isSubmitting}>
        Send
      </ButtonSquare>
      {message && (
        <div
          className={`p-2 border text-sm ${
            isServerError ? 'border-red-600' : 'border-green-600'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
