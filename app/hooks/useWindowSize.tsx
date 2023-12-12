import { Breakpoint, DisplayOrientation } from '@app/types/general';
import { useEffect, useState } from 'react';

type WindowSize = {
  size: [number, number];
  breakpoint: Breakpoint | undefined;
  windowOrientation: DisplayOrientation;
  isMobile: boolean;
};

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize['size']>([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const [width, heigth] = size;

  let breakpoint;
  if (width >= Breakpoint.XS) breakpoint = Breakpoint.XS;
  if (width >= Breakpoint.SM) breakpoint = Breakpoint.SM;
  if (width >= Breakpoint.MD) breakpoint = Breakpoint.MD;
  if (width >= Breakpoint.LG) breakpoint = Breakpoint.LG;
  if (width >= Breakpoint.XL) breakpoint = Breakpoint.XL;
  if (width >= Breakpoint.XXL) breakpoint = Breakpoint.XXL;

  const windowOrientation: DisplayOrientation =
    width >= heigth ? 'landscape' : 'portrait';

  const isMobile =
    (width <= Breakpoint.SM && windowOrientation === 'portrait') ||
    (heigth <= Breakpoint.SM && windowOrientation === 'landscape');

  return { size, breakpoint, windowOrientation, isMobile };
};

export default useWindowSize;
