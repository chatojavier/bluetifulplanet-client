import SafeHTML from '@app/components/SafeHTML';
import { FunctionComponent } from 'react';
import ContactForm from './ContactForm';

interface ContactMeProps {
  id: string;
  title: string;
  content?: string | null;
}

const ContactMe: FunctionComponent<ContactMeProps> = ({
  id,
  title,
  content,
}) => {
  return (
    <div id={id} className="page | h-full flex">
      <h1 className="sr-only">{title}</h1>
      {content && (
        <div className="wp-content | max-w-5xl w-full m-auto px-4 py-12 md:flex justify-between">
          <div className="contact-info">
            <SafeHTML html={content} />
          </div>
          <ContactForm />
        </div>
      )}
    </div>
  );
};

export default ContactMe;
