/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef, useState } from 'react';

const useOnScreen = <T,>(
  options?: T
): [MutableRefObject<HTMLDivElement | null>, boolean] => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options as any);

    if (containerRef.current) observer.observe(containerRef?.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef?.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useOnScreen;
