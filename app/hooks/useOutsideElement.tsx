import { RefObject, useEffect } from 'react';

const useOutsideElement = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!Array.isArray(ref)) {
        if (!ref.current?.contains(event.target as Node)) {
          onClickOutside();
        }
      } else {
        const elements = ref.map(singleRef => singleRef.current);
        if (!elements.some(el => el?.contains(event.target as Node))) {
          onClickOutside();
        }
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside, ref]);
};

export default useOutsideElement;
