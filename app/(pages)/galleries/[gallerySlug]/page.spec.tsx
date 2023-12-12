/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-constructor */
import GalleriesService from '@app/services/GalleriesService';
import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';
import MediaItemsService, {
  MediaItemComplete,
} from '@app/services/MediaItemsService';
import { act } from 'react-dom/test-utils';
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
  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
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
      photosId: ['photo01', 'photo02', 'photo03', 'photo04', 'photo05'],
      id: 'gallery01',
      title: 'Test Gallery',
      slug: 'test-page-slug',
      status: 'publish',
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
    ] as MediaItemComplete[],
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
      .mockImplementationOnce(() => Promise.resolve(galleryData));
    jest
      .spyOn(MediaItemsService, 'getMediaItemsById')
      .mockImplementationOnce(() => Promise.resolve(images));

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
    };
    jest
      .spyOn(GalleriesService, 'getGalleryBySlug')
      .mockImplementationOnce(() => Promise.resolve(pageDataUpdated));

    await renderGallery();

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
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
      .mockResolvedValue(null);

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([]);
  });

  it('should filter out any pages that are not published or have a different template', async () => {
    galleries.push({ status: 'draft', slug: 'test-page-2', id: '2' });

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([{ gallerySlug: 'test-page' }]);
  });
});
