import { render, screen } from '@testing-library/react';
import SafeHTML, { decodeHTML } from './SafeHTML';

describe('SafeHTML', () => {
  it('sanitizes the HTML', () => {
    const html = '<script>alert("XSS")</script><p>Hello world!</p>';

    const { container } = render(<SafeHTML html={html} />);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
    expect(container.getElementsByTagName('script')).toHaveLength(0);
  });
});

describe('decodeHTML function', () => {
  it('correctly decodes HTML entities', () => {
    const htmlString = 'This &quot;quote&quot; is decoded from HTML entities.';
    const expectedDecodedString = 'This "quote" is decoded from HTML entities.';
    expect(decodeHTML(htmlString)).toBe(expectedDecodedString);
  });

  it('handles special characters correctly', () => {
    const htmlString = '5 &lt; 10';
    const expectedDecodedString = '5 < 10';
    expect(decodeHTML(htmlString)).toBe(expectedDecodedString);
  });

  it('handles hexadecimal characters', () => {
    const htmlString = '&#x3C;&#x2F;&#x61;&#x3E;'; // &#x3C;/a&#x3E; = "</a>"
    const expectedDecodedString = '</a>';
    expect(decodeHTML(htmlString)).toBe(expectedDecodedString);
  });

  // Add more test cases to cover various HTML entities, special characters, and edge cases
});
