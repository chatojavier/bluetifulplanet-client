import { SVGProps } from 'react';

const ExpandArrows = ({
  width = '30',
  height = '30',
  className = '',
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
    className={`fill-white ${className}`}
    {...rest}
  >
    <rect x="28" fillRule="evenodd" clipRule="evenodd" width="2" height="10" />
    <rect x="20" fillRule="evenodd" clipRule="evenodd" width="10" height="2" />
    <rect y="20" fillRule="evenodd" clipRule="evenodd" width="2" height="10" />
    <rect y="28" fillRule="evenodd" clipRule="evenodd" width="10" height="2" />
  </svg>
);

export default ExpandArrows;
