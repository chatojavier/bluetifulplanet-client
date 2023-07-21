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

    const imgNums = ['004', '000', '001', '002', '003', '004', '000'];
    imageElements.forEach((el, i) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regEx = new RegExp(
        `(?=.*admin.bluetifulplanet.local)(?=.*image${imgNums[i]})`,
        'gi'
      );
      expect(el.src).toMatch(regEx);
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

    const imgNums = ['004', '000', '003', '004', '000'];
    imageElements.forEach((el, i) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regEx = new RegExp(
        `(?=.*admin.bluetifulplanet.local)(?=.*image${imgNums[i]})`,
        'gi'
      );
      expect(el.src).toMatch(regEx);
    });
  });

  it('should render only the orientation selected (when selected)', async () => {
    const { rerender } = render(
      <FullSlider gallery={MockImagesGallery} displayOrientation="landscape" />
    );

    const imageElementsLandscape = screen.queryAllByRole(
      'img'
    ) as HTMLImageElement[];

    expect(imageElementsLandscape).toHaveLength(7);

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
