/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-constructor */
import { render, screen } from '@testing-library/react';
import useSWRInfinite from 'swr/infinite';
import GalleryGrid from './GalleryGrid';
import { Image as ImageType } from './utils';

jest.mock('swr/infinite', () => jest.fn());

const observe = jest.fn();
const unobserve = jest.fn();

class MockIntersectionObserver implements IntersectionObserver {
  constructor(
    // eslint-disable-next-line no-undef
    _callback: IntersectionObserverCallback,
    // eslint-disable-next-line no-undef
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        mediaItems: { id: 'image01' } as unknown as ImageType[],
      }),
  })
) as jest.Mock;

describe('GalleryGrid', () => {
  const photosId = ['1', '2', '3', '4', '5'];
  const photosPerPage = 10;

  beforeEach(() => {
    (useSWRInfinite as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      size: 0,
      setSize: jest.fn(),
    });
  });

  it('should render the component without errors', () => {
    render(<GalleryGrid photosId={photosId} />);
    expect(screen.getByTestId('gallery-grid')).toBeInTheDocument();
  });

  it('should fetch data using useSWRInfinite with the correct parameters', () => {
    render(<GalleryGrid photosId={photosId} />);
    expect(useSWRInfinite).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateFirstPage: false,
        revalidateAll: false,
        revalidateIfStale: false,
      }
    );
  });

  it('should pass the correct fetcher function to useSWRInfinite', () => {
    render(<GalleryGrid photosId={photosId} />);
    const fetcherFn = (useSWRInfinite as jest.Mock).mock.calls[0][0];
    expect(fetcherFn(0)).toBe(
      `/galleries/api?ids=${photosId.slice(0, photosPerPage).join(',')}`
    );
  });

  it('should display the loading spinner while data is being fetched', () => {
    (useSWRInfinite as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      size: 0,
      setSize: jest.fn(),
    });
    render(<GalleryGrid photosId={photosId} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
