import SafeHTML from '@app/components/SafeHTML/SafeHTML';
import PagesService from '@app/apollo/PagesService';
import { PageTemplate } from '@app/types/general';
import { removeAllTrailingSlash } from '@app/utils/general';
import { notFound } from 'next/navigation';
import ContactForm from './ContactForm';

export type PageProps = {
  params: {
    pageSlug: string;
  };
};

const pageSlug = 'contact-me';

const getPageData = async () => {
  const result = await PagesService.queryPageByUri(pageSlug);

  if (
    !result ||
    result.page.template !== PageTemplate.CONTACT_ME ||
    result.page.status !== 'publish'
  ) {
    notFound();
  }

  return result;
};

const Page = async () => {
  const {
    page: { title, content = '' },
  } = await getPageData();

  // eslint-disable-next-line no-console
  console.log(`Rendering page [${pageSlug}]`);
  const id = removeAllTrailingSlash(pageSlug);

  return (
    <div id={id} className="page | h-full flex">
      <h1 className="hidden">{title}</h1>
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

export default Page;
