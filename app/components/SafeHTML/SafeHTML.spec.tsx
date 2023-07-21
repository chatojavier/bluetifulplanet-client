import { render, screen } from '@testing-library/react';
import SafeHTML from './SafeHTML';

describe('SafeHTML', () => {
  it('sanitizes the HTML', () => {
    const html = '<script>alert("XSS")</script><p>Hello world!</p>';

    const { container } = render(<SafeHTML html={html} />);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
    expect(container.getElementsByTagName('script')).toHaveLength(0);
  });
});
