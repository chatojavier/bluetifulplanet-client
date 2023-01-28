import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FullSliderNavigation from './FullSliderNavigation';

const slidePrev = jest.fn();
const slideNext = jest.fn();

jest.mock('swiper/react', () => ({
  useSwiper: () => ({
    slidePrev,
    slideNext,
  }),
}));

describe('FullSliderNavigation', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should call slidePrev and slideNext when click left and right', async () => {
    render(<FullSliderNavigation />);

    const user = userEvent.setup();

    const leftNavigator = screen.getByRole('button', {
      name: /prev-slide/i,
    });
    const rightNavigator = screen.getByRole('button', {
      name: /next-slide/i,
    });

    await user.click(leftNavigator);
    expect(slidePrev).toBeCalledTimes(1);

    await user.click(rightNavigator);
    expect(slideNext).toBeCalledTimes(1);
  });

  it('should call slidePrev and slideNext when press enter key', async () => {
    render(<FullSliderNavigation />);

    const user = userEvent.setup();

    const leftNavigator = screen.getByRole('button', {
      name: /prev-slide/i,
    });
    const rightNavigator = screen.getByRole('button', {
      name: /next-slide/i,
    });

    await user.type(leftNavigator, '{enter}');
    expect(slidePrev).toBeCalledTimes(2);

    await user.type(rightNavigator, '{enter}');
    expect(slideNext).toBeCalledTimes(2);
  });
});
