/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-constructor */
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import useOnScreen from './useOnScreen';

const observe = jest.fn();
const unobserve = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
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

const MockComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible] = useOnScreen({ rootMargin: '0px', threshold: 1 });

  return (
    <div>
      <div className="container" ref={containerRef}>
        {isVisible ? 'Visible' : 'Not Visible'}
      </div>
    </div>
  );
};

describe('useOnScreen', () => {
  it('should render "Visible" when the container is in the viewport', () => {
    render(<MockComponent />);
    const container = screen.getByText(/visible/i);
    expect(container).toBeInTheDocument();
  });
});
