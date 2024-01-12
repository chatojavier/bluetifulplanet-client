import PagesService from '@app/services/PagesService';
import { PageTemplate } from '@app/types/general';
import { removeAllTrailingSlash } from '@app/utils/general';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export type PageProps = {
  params: {
    pageSlug: string;
  };
};

export const generateMetadata = async ({
  params,
}: {
  params: PageProps['params'];
}): Promise<Metadata> => {
  const { page = null } =
    params.pageSlug && !Array.isArray(params.pageSlug)
      ? await PagesService.getPageByUri(params.pageSlug)
      : {};

  const { title } = page || {};

  return {
    title,
  };
};

const getPageData = async (params: PageProps['params']) => {
  const result =
    params.pageSlug && !Array.isArray(params.pageSlug)
      ? await PagesService.getPageByUri(params.pageSlug)
      : null;

  if (
    !result ||
    (result?.page?.template !== PageTemplate.PLAIN_CONTENT &&
      result?.page?.template !== PageTemplate.CONTACT_ME) ||
    result.page.status !== 'publish'
  ) {
    notFound();
  }

  return result;
};

const Page = async ({ params }: PageProps) => {
  const { page } = await getPageData(params);
  const { title, content } = page || {};

  const id = removeAllTrailingSlash(params.pageSlug);

  switch (page?.template) {
    case PageTemplate.CONTACT_ME: {
      const { default: ContactMe } = await import('@app/templates/ContactMe');
      return <ContactMe id={id} title={title || ''} content={content} />;
    }
    case PageTemplate.PLAIN_CONTENT: {
      const { default: PlainContent } = await import(
        '@app/templates/PlainContent'
      );
      return <PlainContent id={id} title={title || ''} content={content} />;
    }
    default:
      return null;
  }
};

export default Page;

export const generateStaticParams = async () => {
  const { pages } = await PagesService.getAllPagesBasic();

  return pages
    .filter(
      page =>
        page.template ===
          (PageTemplate.PLAIN_CONTENT || PageTemplate.CONTACT_ME) &&
        page.status === 'publish'
    )
    .map(page => ({
      pageSlug: page.slug as string,
    }));
};
