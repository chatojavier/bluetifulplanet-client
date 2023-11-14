import Link from 'next/link';
import React, { useCallback } from 'react';
import { ArrowRightLong } from '../Icons';

type Props = {
  path: string;
  currentPage: number;
  totalPages: number;
  searchParam?: string;
  className?: string;
};

const Pagination: React.FC<Props> = ({
  path,
  currentPage,
  totalPages,
  searchParam = 'page',
  className = '',
}) => {
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxPagesToShow = 10;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(maxPagesToShow, totalPages);
      } else {
        startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
      }
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  const pageNumbers = getPageNumbers();
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <nav className={`border-t w-full flex justify-between ${className}`}>
      <Link
        className={`page-link flex items-center gap-4 pt-4 -mt-[1px] text-black ${
          !hasPreviousPage && 'opacity-50 pointer-events-none cursor-none'
        }`}
        href={`${path}?${searchParam}=${currentPage - 1}`}
        aria-disabled={!hasPreviousPage}
      >
        <ArrowRightLong className="transform rotate-180 w-5" />
        Previous
      </Link>
      <ul className="pagination flex -mt-[1px]">
        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={`page-item px-4 pt-4 ${
              pageNumber === currentPage
                ? 'border-t-2 border-bluetifulBlue font-bold text-bluetifulBlue'
                : 'text-black'
            }`}
          >
            <Link
              className={`page-link ${
                pageNumber === currentPage
                  ? 'active text-bluetifulBlue'
                  : 'text-black'
              }`}
              href={`${path}?${searchParam}=${pageNumber}`}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className={`page-link flex items-center gap-4 pt-4 -mt-[1px] text-black ${
          !hasNextPage && 'opacity-50 pointer-events-none cursor-none'
        }}`}
        href={`${path}?${searchParam}=${currentPage + 1}`}
        aria-disabled={!hasNextPage}
      >
        Next
        <ArrowRightLong className="w-5" />
      </Link>
    </nav>
  );
};

export default Pagination;
