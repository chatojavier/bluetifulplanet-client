import { isBrowser } from '@app/utils/general';
import { useEffect } from 'react';

const useFixDocumentBody = () => {
  useEffect(() => {
    if (isBrowser()) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export default useFixDocumentBody;
