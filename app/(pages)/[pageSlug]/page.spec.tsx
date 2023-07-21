import PagesService from '@app/services/PagesService';
import { PageMapped } from '@app/utils/pages';
import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { PageTemplate } from '@app/types/general';
import Page, { generateStaticParams } from './page';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Page component', () => {
  const pageData = {
    page: {
      title: 'Test Page',
      content: '<p>Test Content</p>',
      template: 'Plain Content',
      status: 'publish',
    } as PageMapped,
  };

  const pageProps = { params: { pageSlug: 'test-page-slug' } };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the page with title and content', async () => {
    jest
      .spyOn(PagesService, 'getPageByUri')
      .mockImplementationOnce(() => Promise.resolve(pageData));

    render(await Page(pageProps));

    expect(PagesService.getPageByUri).toHaveBeenCalledWith(
      pageProps.params.pageSlug
    );
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles not found page', async () => {
    const pageDataUpdated = {
      page: {
        ...pageData.page,
        status: 'draft',
      },
    };
    jest
      .spyOn(PagesService, 'getPageByUri')
      .mockImplementationOnce(() => Promise.resolve(pageDataUpdated));

    render(await Page(pageProps));

    expect(notFound).toHaveBeenCalled();
  });
});

describe('generateStaticParams', () => {
  let pages;

  beforeEach(() => {
    pages = [
      {
        template: PageTemplate.PLAIN_CONTENT,
        status: 'publish',
        uri: 'test-page',
      } as PageMapped,
    ];

    jest.spyOn(PagesService, 'getAllPages').mockResolvedValue({ pages });
  });

  it('should generate static params from the given pages', async () => {
    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([{ pageSlug: 'test-page' }]);
  });

  it('should return an empty array if no pages are provided', async () => {
    jest.spyOn(PagesService, 'getAllPages').mockResolvedValue(null);

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([]);
  });

  it('should filter out any pages that are not published or have a different template', async () => {
    pages.push({ template: PageTemplate.DEFAULT, status: 'draft' });

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([{ pageSlug: 'test-page' }]);
  });
});
