/* eslint-disable sonarjs/no-duplicate-string */
import GalleriesService from '@app/services/GalleriesService';
import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';
import MediaItemsService from '@app/services/MediaItemsService';
import { act } from 'react-dom/test-utils';
import { MediaItem } from '@app/api/wp/media-items/utils';
import { CommentStatusEnum } from '@app/graphql/__generated__/graphql';
import Gallery, { generateStaticParams } from './page';

type GalleryObject = NonNullable<
  Awaited<ReturnType<typeof GalleriesService.getGalleryBySlug>>
>;

type GalleryObjectBasic = NonNullable<
  Awaited<ReturnType<typeof GalleriesService.getAllGalleriesBasic>>
>;

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('@app/services/GalleriesService', () => ({
  __esModule: true,
  default: {
    getGalleryBySlug: jest.fn(),
    getAllGalleriesBasic: jest.fn(),
  },
}));

jest.mock('@app/services/MediaItemsService', () => ({
  __esModule: true,
  default: {
    getMediaItemsById: jest.fn(),
  },
}));

const observe = jest.fn();
const unobserve = jest.fn();

class MockIntersectionObserver implements IntersectionObserver {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, no-undef
    _callback: IntersectionObserverCallback,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, no-undef
    _options?: IntersectionObserverInit
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  ) {}

  root!: Document | Element | null;

  rootMargin!: string;

  thresholds!: readonly number[];

  observe = observe;

  unobserve = unobserve;

  disconnect = jest.fn();

  takeRecords = jest.fn();

  static toString = () => 'IntersectionObserver';
}

window.IntersectionObserver = MockIntersectionObserver;

describe('Gallery component', () => {
  const galleryData: GalleryObject = {
    gallery: {
      id: 'gallery01',
      databaseId: 1,
      photosId: ['photo01', 'photo02', 'photo03', 'photo04', 'photo05'],
      title: 'Test Gallery',
      slug: 'test-page-slug',
      status: 'publish',
      commentStatus: 'open',
      comments: [],
      commentCount: 0,
    },
  };

  const pageProps = { params: { gallerySlug: 'test-page-slug' } };

  const images = {
    mediaItems: [
      {
        id: 'photo01',
        mediaDetails: { height: 100, width: 80 },
        altText: 'photo01',
        sourceUrl: '/photos/01.jpg',
      },
      {
        id: 'photo02',
        mediaDetails: { height: 200, width: 80 },
        altText: 'photo02',
        sourceUrl: '/photos/02.jpg',
      },
      {
        id: 'photo03',
        mediaDetails: { height: 150, width: 80 },
        altText: 'photo03',
        sourceUrl: '/photos/03.jpg',
      },
      {
        id: 'photo04',
        mediaDetails: { height: 250, width: 80 },
        altText: 'photo04',
        sourceUrl: '/photos/04.jpg',
      },
      {
        id: 'photo05',
        mediaDetails: { height: 180, width: 80 },
        altText: 'photo05',
        sourceUrl: '/photos/05.jpg',
      },
    ] as MediaItem[],
  };

  const renderGallery = async () =>
    act(async () => {
      const component = await Gallery(pageProps);
      render(component);
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the page with title and content', async () => {
    jest
      .spyOn(GalleriesService, 'getGalleryBySlug')
      .mockResolvedValue(galleryData);
    jest
      .spyOn(MediaItemsService, 'getMediaItemsById')
      .mockResolvedValue(images);

    await renderGallery();

    await waitFor(() => {
      expect(GalleriesService.getGalleryBySlug).toHaveBeenCalledWith(
        pageProps.params.gallerySlug
      );
      expect(
        screen.getByAltText(images.mediaItems[0].altText as string)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(images.mediaItems[1].altText as string)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(images.mediaItems[2].altText as string)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(images.mediaItems[3].altText as string)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(images.mediaItems[4].altText as string)
      ).toBeInTheDocument();
    });
  });

  it('handles not found page', async () => {
    const pageDataUpdated = {
      gallery: {
        ...galleryData.gallery,
        status: 'draft',
      },
    } as GalleryObject;
    jest
      .spyOn(GalleriesService, 'getGalleryBySlug')
      .mockImplementationOnce(() => Promise.resolve(pageDataUpdated));

    await renderGallery();

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });

  it('should render comments if commentStatus is open', async () => {
    const galleryDataUpdated = {
      ...galleryData,
      gallery: {
        ...galleryData.gallery,
        commentStatus: 'open',
        commentCount: 2,
        comments: [
          {
            id: 'comment01',
            databaseId: 1,
            status: CommentStatusEnum.Approve,
            parentId: undefined,
            date: '2021-01-01',
            content: 'Test comment 1',
            author: {
              name: 'Test Author 1',
              avatar: {
                url: '/avatar01.jpg',
                height: 100,
                width: 100,
              },
            },
          },
          {
            id: 'comment02',
            databaseId: 2,
            status: CommentStatusEnum.Approve,
            parentId: 'comment01',
            date: '2021-01-02',
            content: 'Test comment 2',
            author: {
              name: 'Test Author 2',
              avatar: {
                url: '/avatar02.jpg',
                height: 100,
                width: 100,
              },
            },
          },
        ],
      },
    } as GalleryObject;

    jest
      .spyOn(GalleriesService, 'getGalleryBySlug')
      .mockResolvedValue(galleryDataUpdated);
    jest
      .spyOn(MediaItemsService, 'getMediaItemsById')
      .mockResolvedValue(images);

    await renderGallery();

    expect(await screen.findByText('2 Thoughts')).toBeInTheDocument();
    expect(screen.getByText('on Test Gallery')).toBeInTheDocument();
    expect(screen.getByText('Test comment 1')).toBeInTheDocument();
    expect(screen.getByText('Test comment 2')).toBeInTheDocument();
    expect(screen.getByText('Test Author 1')).toBeInTheDocument();
    expect(screen.getByText('Test Author 2')).toBeInTheDocument();
    expect(
      screen.getByText('January 1st, 2021 at 12:00 AM')
    ).toBeInTheDocument();
    expect(
      screen.getByText('January 2nd, 2021 at 12:00 AM')
    ).toBeInTheDocument();
  });

  it('should not render comments if commentStatus is closed', async () => {
    const galleryDataUpdated = {
      ...galleryData,
      gallery: {
        ...galleryData.gallery,
        commentStatus: 'closed',
        commentCount: 2,
        comments: [
          {
            id: 'comment01',
            databaseId: 1,
            status: CommentStatusEnum.Approve,
            parentId: undefined,
            date: '2021-01-01',
            content: 'Test comment 1',
            author: {
              name: 'Test Author 1',
              avatar: {
                url: '/avatar01.jpg',
                height: 100,
                width: 100,
              },
            },
          },
        ],
      },
    } as GalleryObject;

    jest
      .spyOn(GalleriesService, 'getGalleryBySlug')
      .mockResolvedValue(galleryDataUpdated);
    jest
      .spyOn(MediaItemsService, 'getMediaItemsById')
      .mockResolvedValue(images);

    await renderGallery();

    expect(screen.queryByText('2 Thoughts')).toBeNull();
    expect(screen.queryByText('Test comment 1')).toBeNull();
    expect(screen.queryByTestId('post-comments')).toBeNull();
  });
});

describe('generateStaticParams', () => {
  let galleries: GalleryObjectBasic['galleries'];

  beforeEach(() => {
    galleries = [
      {
        id: '1',
        status: 'publish',
        slug: 'test-page',
      },
    ];

    jest
      .spyOn(GalleriesService, 'getAllGalleriesBasic')
      .mockResolvedValue({ galleries });
  });

  it('should generate static params from the given pages', async () => {
    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([{ gallerySlug: 'test-page' }]);
  });

  it('should return an empty array if no pages are provided', async () => {
    jest
      .spyOn(GalleriesService, 'getAllGalleriesBasic')
      .mockResolvedValue({ galleries: [] });

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([]);
  });

  it('should filter out any pages that are not published or have a different template', async () => {
    galleries.push({ status: 'draft', slug: 'test-page-2', id: '2' });

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([{ gallerySlug: 'test-page' }]);
  });
});
