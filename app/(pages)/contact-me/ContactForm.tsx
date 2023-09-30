'use client';

import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// interface ContactFormProps {}

interface ContactFormOutput {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormOutput>();
  const inputCommonClasses =
    'border border-gray-100 bg-gray-100 text-xs p-3 | focus:rounded-none focus:border-black focus:bg-white transition-all duration-700 | placeholder:text-gray-500 placeholder:font-semibold';

  const onSubmit: SubmitHandler<ContactFormOutput> = data => {
    console.log(data);
  };

  console.log(watch('message'));

  return (
    <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-inputs | flex flex-col gap-4 mb-6">
        <input
          {...register('name', { required: true })}
          type="text"
          size={40}
          className={inputCommonClasses}
          placeholder="NAME"
        />
        {errors.name && <span>This field is required</span>}
        <input
          {...register('email')}
          type="text"
          size={40}
          className={inputCommonClasses}
          placeholder="EMAIL"
        />
        <textarea
          {...register('message')}
          cols={40}
          rows={5}
          className={`${inputCommonClasses} min-h-[200px]`}
          placeholder="MESSAGE"
        />
      </div>
      <button
        type="submit"
        className="block uppercase text-xs font-semibold px-10 py-2 border-2 border-black"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
