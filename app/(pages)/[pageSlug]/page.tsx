import SafeHTML from '@app/components/SafeHTML/SafeHTML';
import PagesService from '@app/services/PagesService';
import { PageTemplate } from '@app/types/general';
import { removeAllTrailingSlash } from '@app/utils/general';
import { notFound } from 'next/navigation';

export type PageProps = {
  params: {
    pageSlug: string;
  };
};

const getPageData = async (params: PageProps['params']) => {
  const result =
    params.pageSlug && !Array.isArray(params.pageSlug)
      ? await PagesService.getPageByUri(params.pageSlug)
      : null;

  if (
    !result ||
    result.page.template !== PageTemplate.PLAIN_CONTENT ||
    result.page.status !== 'publish'
  ) {
    notFound();
  }

  return result;
};

const Page = async ({ params }: PageProps) => {
  const {
    page: { title, content = '' },
  } = await getPageData(params);

  const id = removeAllTrailingSlash(params.pageSlug);

  return (
    <div id={id} className="page | py-12">
      <h1 className="hidden">{title}</h1>
      {content && (
        <div className="wp-content | max-w-1/2 m-auto px-4">
          <SafeHTML html={content} />
        </div>
      )}
    </div>
  );
};

export default Page;

export const generateStaticParams = async () => {
  const { pages } = (await PagesService.getAllPages()) || { pages: [] };

  return pages
    ?.filter(
      page =>
        page.template === PageTemplate.PLAIN_CONTENT &&
        page.status === 'publish'
    )
    .map(page => ({
      pageSlug: page.uri as string,
    }));
};
