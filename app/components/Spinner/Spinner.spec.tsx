import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render properly', () => {
    const { container } = render(<Spinner />);

    const svgSpinner = container.querySelector('svg[data-icon="spinner"]');
    expect(svgSpinner).toBeInTheDocument();
  });
});
