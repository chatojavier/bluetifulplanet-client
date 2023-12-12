import { MockImagesGallery } from '@app/__mocks__/homePage.mock';
import { act, render, screen } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import FullSlider from './FullSlider';

function fireResize(width: number, height: number) {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}

describe('FullSlider', () => {
  it('should render slider with mock images with loop clones', async () => {
    render(<FullSlider gallery={MockImagesGallery} />);

    const imageElements = (await screen.findAllByRole(
      'img'
    )) as HTMLImageElement[];

    imageElements.forEach((el, i) => {
      const uriEncoded = encodeURIComponent(
        MockImagesGallery[i]?.sourceUrl as string
      );
      expect(el.src).toContain(uriEncoded);
    });
  });

  it('should render slider without null image objects, or null url images', async () => {
    const MockImagesGalleryUpdated = cloneDeep(MockImagesGallery);
    if (MockImagesGalleryUpdated[1])
      MockImagesGalleryUpdated[1].sourceUrl = null;

    if (MockImagesGalleryUpdated[2]) MockImagesGalleryUpdated[2] = null;

    if (MockImagesGalleryUpdated[3]) {
      MockImagesGalleryUpdated[3].altText = null;
      MockImagesGalleryUpdated[3].mediaDetails = null;
    }

    if (
      MockImagesGalleryUpdated[4] &&
      MockImagesGalleryUpdated[4].mediaDetails
    ) {
      MockImagesGalleryUpdated[4].mediaDetails.height = null;
      MockImagesGalleryUpdated[4].mediaDetails.width = null;
    }

    render(<FullSlider gallery={MockImagesGalleryUpdated} />);

    const imageElements = (await screen.findAllByRole(
      'img'
    )) as HTMLImageElement[];

    const encodedUrls = MockImagesGalleryUpdated.map(image =>
      encodeURIComponent(image?.sourceUrl as string)
    );

    expect(imageElements).toHaveLength(3);
    expect(imageElements[0].src).toContain(encodedUrls[0]);
    expect(imageElements[1].src).toContain(encodedUrls[3]);
    expect(imageElements[2].src).toContain(encodedUrls[4]);
  });

  it('should render only the orientation selected (when selected)', async () => {
    const { rerender } = render(
      <FullSlider gallery={MockImagesGallery} displayOrientation="landscape" />
    );

    const imageElementsLandscape = screen.queryAllByRole(
      'img'
    ) as HTMLImageElement[];

    expect(imageElementsLandscape).toHaveLength(5);

    act(() => {
      fireResize(200, 500);
    });
    rerender(
      <FullSlider gallery={MockImagesGallery} displayOrientation="landscape" />
    );

    const imageElementsPortrait = screen.queryAllByRole(
      'img'
    ) as HTMLImageElement[];

    expect(imageElementsPortrait).toHaveLength(0);
  });
});
