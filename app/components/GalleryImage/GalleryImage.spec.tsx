import { render, screen } from '@testing-library/react';
import GalleryImage from './GalleryImage';

const mockImageProps = {
  src: '/image.jpg',
  alt: 'Image alt text',
  width: 100,
  height: 100,
};

describe('GalleryImage', () => {
  it('should render the component without errors', () => {
    render(<GalleryImage {...mockImageProps} />);
    expect(screen.getByTestId('gallery-image')).toBeInTheDocument();
  });

  it('should apply the provided className', () => {
    const customClass = 'custom-class';
    render(<GalleryImage {...mockImageProps} className={customClass} />);
    const galleryImage = screen.getByAltText(mockImageProps.alt);
    expect(galleryImage).toHaveClass(customClass);
  });

  it('should render the Image component with the provided props', () => {
    render(<GalleryImage {...mockImageProps} />);
    const imageComponent = screen.getByAltText(mockImageProps.alt);
    expect(imageComponent).toBeInTheDocument();
    expect(imageComponent).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fimage.jpg&w=256&q=75'
    );
  });

  it('should render the SVG component', () => {
    render(<GalleryImage {...mockImageProps} />);
    const svgComponent = screen.getByTestId('gallery-image-zoom-icon');
    expect(svgComponent).toBeInTheDocument();
  });

  it('should call the onClick function when the image is clicked', () => {
    const onClick = jest.fn();
    render(<GalleryImage {...mockImageProps} onClick={onClick} />);
    const galleryImage = screen.getByAltText(mockImageProps.alt);
    galleryImage.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('should call the onClick function when the image is focused and the enter key is pressed', () => {
    const onClick = jest.fn();
    render(<GalleryImage {...mockImageProps} onClick={onClick} />);
    const galleryImage = screen.getByAltText(mockImageProps.alt);
    galleryImage.focus();
    galleryImage.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call the onClick function when the image is focused and a key different than enter is pressed', () => {
    const onClick = jest.fn();
    render(<GalleryImage {...mockImageProps} onClick={onClick} />);
    const galleryImage = screen.getByAltText(mockImageProps.alt);
    galleryImage.focus();
    galleryImage.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(onClick).not.toHaveBeenCalled();
  });
});
