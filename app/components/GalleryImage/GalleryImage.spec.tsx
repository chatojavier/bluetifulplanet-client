import { render, screen } from '@testing-library/react';
import GalleryImage from './GalleryImage';

describe('GalleryImage', () => {
  it('should render the component without errors', () => {
    render(
      <GalleryImage
        src="/image.jpg"
        alt="Image Alt Text Mock"
        width={100}
        height={100}
      />
    );
    expect(screen.getByTestId('gallery-image')).toBeInTheDocument();
  });

  it('should apply the provided className', () => {
    const className = 'custom-class';
    render(
      <GalleryImage
        className={className}
        src="/image.jpg"
        alt="Image Alt Text Mock"
        width={100}
        height={100}
      />
    );
    const galleryImage = screen.getByAltText('Image Alt Text Mock');
    expect(galleryImage).toHaveClass(className);
  });

  it('should render the Image component with the provided props', () => {
    const imageProps = {
      src: '/image.jpg',
      alt: 'Image alt text',
      width: 100,
      height: 100,
    };
    render(<GalleryImage {...imageProps} />);
    const imageComponent = screen.getByAltText(imageProps.alt);
    expect(imageComponent).toBeInTheDocument();
    expect(imageComponent).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fimage.jpg&w=256&q=75'
    );
  });

  it('should render the SVG component', () => {
    render(
      <GalleryImage
        src="/image.jpg"
        alt="Image Alt Text Mock"
        width={100}
        height={100}
      />
    );
    const svgComponent = screen.getByTestId('gallery-image-zoom-icon');
    expect(svgComponent).toBeInTheDocument();
  });
});
