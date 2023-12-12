import { SVGProps } from 'react';

const ImageZoom = ({
  width = '30',
  height = '30',
  ...rest
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0"
    y="0"
    width={width}
    height={height}
    viewBox="0 0 30 30"
    enableBackground="new 0 0 30 30"
    xmlSpace="preserve"
    data-testid="gallery-image-zoom-icon"
    {...rest}
  >
    <rect fillRule="evenodd" clipRule="evenodd" width="2" height="10" />
    <rect fillRule="evenodd" clipRule="evenodd" width="10" height="2" />
    <rect x="28" fillRule="evenodd" clipRule="evenodd" width="2" height="10" />
    <rect x="20" fillRule="evenodd" clipRule="evenodd" width="10" height="2" />
    <rect y="20" fillRule="evenodd" clipRule="evenodd" width="2" height="10" />
    <rect y="28" fillRule="evenodd" clipRule="evenodd" width="10" height="2" />
    <rect
      x="28"
      y="20"
      fillRule="evenodd"
      clipRule="evenodd"
      width="2"
      height="10"
    />
    <rect
      x="20"
      y="28"
      fillRule="evenodd"
      clipRule="evenodd"
      width="10"
      height="2"
    />
    <rect
      x="14"
      y="10"
      fillRule="evenodd"
      clipRule="evenodd"
      width="2"
      height="10"
    />
    <rect
      x="10"
      y="14"
      fillRule="evenodd"
      clipRule="evenodd"
      width="10"
      height="2"
    />
  </svg>
);

export default ImageZoom;
