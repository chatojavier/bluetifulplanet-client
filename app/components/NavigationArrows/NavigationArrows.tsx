import Link from 'next/link';
import { FunctionComponent } from 'react';

interface NavigationArrowsProps {
  label: string;
  url: string;
  next?: boolean;
}

const NavigationArrows: FunctionComponent<NavigationArrowsProps> = ({
  label,
  url,
  next,
}) => {
  return (
    <Link
      href={url}
      className={`post_nav next | fixed top-1/2 -mt-12 bg-black bg-opacity-20 py-[17px] px-3 h-24 text-xs leading-[18px] font-medium z-10 overflow-hidden w-[38px] flex flex-row items-center invisible transition-all ease-[cubic-bezier(0.77,0,0.175,1)] duration-1000 | sm:visible | group hover:w-60 hover:text-black hover:bg-white hover:shadow-lg | ${
        next ? 'left-auto right-0 text-right' : 'left-0'
      }`}
    >
      <div className="rel | relative block h-[18px] w-full">
        <span
          className={`inline-block absolute top-1/2 w-[180px] -translate-y-1/2 | ${
            next ? 'left-auto right-[35px]' : 'left-[35px]'
          }`}
        >
          {label}
        </span>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="9.981px"
          height="17.982px"
          viewBox="0 0 9.981 17.982"
          enableBackground="new 0 0 9.981 17.982"
          xmlSpace="preserve"
          className={`absolute top-1/2 fill-white -mt-[9px] | group-hover:fill-black | ${
            next ? 'left-auto right-0' : 'left-0'
          }`}
        >
          <polygon
            fillRule="evenodd"
            clipRule="evenodd"
            points={
              next
                ? '0,16.872 1.108,17.982 9.981,9.031 9.942,8.991 9.981,8.951 1.108,0 0,1.11 7.811,8.991'
                : '9.981,1.111 8.873,0 0,8.952 0.04,8.991 0,9.031 8.873,17.982 9.981,16.872 2.171,8.992'
            }
          />
        </svg>
      </div>
    </Link>
  );
};

export default NavigationArrows;
