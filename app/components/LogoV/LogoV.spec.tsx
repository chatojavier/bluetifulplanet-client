import { render } from '@testing-library/react';
import LogoV from './LogoV';

describe('LogoV', () => {
  it('should render properly', () => {
    const { container } = render(<LogoV />);

    const svgLogo = container.querySelector('svg[data-icon="logo-vertical"]');
    expect(svgLogo).toBeInTheDocument();
  });
});
