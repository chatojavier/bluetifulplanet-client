import { useEffect, useState } from 'react';

type Size = number[];

const useWindowSize = (): Size => {
  const [size, setSize] = useState<Size>([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export default useWindowSize;
