/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-constructor */
import { render, screen, waitFor, within } from '@testing-library/react';
import useSWRInfinite from 'swr/infinite';
import userEvent from '@testing-library/user-event';
import useOnScreen from '@app/hooks/useOnScreen';
import useWindowSize from '@app/hooks/useWindowSize';
import GalleryGrid, { ImageResponse } from './GalleryGrid';

jest.mock('swr/infinite', () => jest.fn());
jest.mock('@app/hooks/useOnScreen', () => jest.fn());
jest.mock('@app/hooks/useWindowSize', () => jest.fn());

const createPhotosId = (length: number): string[] =>
  Array.from({ length }, (_, i) => `image${i + 1}`);

const getFetchedData = (ids: string[]) => ({
  mediaItems: ids.map(id => ({
    id,
    title: `Image ${id} title`,
    sourceUrl: `/img/${id}.jpg`,
    altText: `Alt ${id} text`,
    description: `This is the description of ${id}`,
    mediaDetails: {
      width: 100,
      height: 100,
      meta: {
        aperture: 1.8,
        focalLength: 50,
        iso: 100,
        shutterSpeed: 0.01,
      },
    },
    mediaTags: [
      {
        id: 'tag1',
        name: '#tag1',
        slug: 'tag1',
      },
      {
        id: 'tag2',
        name: '#tag2',
        slug: 'tag2',
      },
      {
        id: 'tag3',
        name: '#tag3',
        slug: 'tag3',
      },
    ],
  })),
});

const swrMockReturnValue = {
  data: null,
  isLoading: false,
  size: 1,
  setSize: jest.fn(),
};

describe('GalleryGrid', () => {
  const photosId = createPhotosId(5);
  const photosPerPage = 10;
  const mockUseOnScreen = useOnScreen as jest.Mock;
  const mockUseWindowSize = useWindowSize as jest.Mock;

  beforeEach(() => {
    mockUseOnScreen.mockReturnValue([null, false]);
    mockUseWindowSize.mockReturnValue({ breakpoint: 0 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component without errors', () => {
    (useSWRInfinite as jest.Mock).mockReturnValue(swrMockReturnValue);
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
      ...swrMockReturnValue,
      isLoading: true,
    });
    render(<GalleryGrid photosId={photosId} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display the gallery images when data is fetched', () => {
    (useSWRInfinite as jest.Mock).mockReturnValue({
      ...swrMockReturnValue,
      data: [getFetchedData(photosId)],
    });
    render(<GalleryGrid photosId={photosId} />);
    photosId.forEach(id => {
      expect(screen.getByAltText(`Alt ${id} text`)).toBeInTheDocument();
    });
  });

  it('should display the gallery modal when a gallery image is clicked', async () => {
    (useSWRInfinite as jest.Mock).mockReturnValue({
      ...swrMockReturnValue,
      data: [getFetchedData(photosId)],
    });
    render(<GalleryGrid photosId={photosId} />);
    const imageId = photosId[2];
    const galleryImage = screen.getByAltText(`Alt ${imageId} text`);

    await userEvent.click(galleryImage);

    const modal = screen.getByTestId('gallery-modal');
    const modalImage = within(modal).getByAltText(`Alt ${imageId} text`);
    const modalTitle = within(modal).getByText(`Image ${imageId} title`);
    const modalSubcopy = within(modal).getByText(
      `This is the description of ${imageId}`
    );
    const modalTags = within(modal).getAllByText(/#tag\d/);
    const apperature = within(modal).getByText('f/1.8');
    const focalLength = within(modal).getByText('50mm');
    const iso = within(modal).getByText('100');
    const exposure = within(modal).getByText(/1\/100/);
    expect(modalImage).toBeInTheDocument();
    expect(modalTitle).toBeInTheDocument();
    expect(modalSubcopy).toBeInTheDocument();
    expect(modalTags).toHaveLength(3);
    expect(apperature).toBeInTheDocument();
    expect(focalLength).toBeInTheDocument();
    expect(iso).toBeInTheDocument();
    expect(exposure).toBeInTheDocument();
  });

  it('should change the gallery image when the next and prev button is clicked', async () => {
    (useSWRInfinite as jest.Mock).mockReturnValue({
      ...swrMockReturnValue,
      data: [getFetchedData(photosId)],
    });
    render(<GalleryGrid photosId={photosId} />);
    const imageId = photosId[2];
    const galleryImage = screen.getByAltText(`Alt ${imageId} text`);

    await userEvent.click(galleryImage);

    const modal = screen.getByTestId('gallery-modal');
    const modalTitle = within(modal).getByText(`Image ${imageId} title`);

    expect(modalTitle).toBeInTheDocument();

    const nextButton = screen.getByTestId('modal-next-button');
    await userEvent.click(nextButton);

    const nextImageId = photosId[3];
    const nextModalImage = within(modal).getByAltText(
      `Alt ${nextImageId} text`
    );
    const nextModalTitle = within(modal).getByText(
      `Image ${nextImageId} title`
    );
    const nextModalSubcopy = within(modal).getByText(
      `This is the description of ${nextImageId}`
    );
    expect(nextModalImage).toBeInTheDocument();
    expect(nextModalTitle).toBeInTheDocument();
    expect(nextModalSubcopy).toBeInTheDocument();

    const prevButton = screen.getByTestId('modal-prev-button');
    await userEvent.click(prevButton);
    await userEvent.click(prevButton);

    expect(modalTitle).toBeInTheDocument();

    const prevImageId = photosId[1];
    const prevModalImage = within(modal).getByAltText(
      `Alt ${prevImageId} text`
    );
    const prevModalTitle = within(modal).getByText(
      `Image ${prevImageId} title`
    );
    const prevModalSubcopy = within(modal).getByText(
      `This is the description of ${prevImageId}`
    );
    expect(prevModalImage).toBeInTheDocument();
    expect(prevModalTitle).toBeInTheDocument();
    expect(prevModalSubcopy).toBeInTheDocument();
  });

  it('should fetch more data when the last image is visible', async () => {
    const photosIdUpdated = [
      'image01',
      'image02',
      'image03',
      'image04',
      'image05',
      'image06',
      'image07',
      'image08',
      'image09',
      'image10',
      'image11',
      'image12',
      'image13',
      'image14',
      'image15',
      'image16',
      'image17',
      'image18',
      'image19',
      'image20',
    ];
    const useSWRInfiniteMock = useSWRInfinite as jest.Mock;
    mockUseOnScreen.mockReturnValue([null, true]);
    useSWRInfiniteMock.mockReturnValue({
      ...swrMockReturnValue,
      data: [getFetchedData(photosIdUpdated.slice(0, 10))],
    });
    render(
      <GalleryGrid
        photosId={photosIdUpdated}
        photosPerPage={10}
        fallback={getFetchedData(photosIdUpdated.slice(0, 10))}
      />
    );
    await waitFor(() => {
      expect(swrMockReturnValue.setSize).toHaveBeenCalledWith(2);
    });
  });
});
