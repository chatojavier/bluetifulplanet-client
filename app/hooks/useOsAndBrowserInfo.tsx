import { useState, useEffect } from 'react';

const useOSAndBrowserInfo = () => {
  const [os, setOs] = useState('');
  const [browser, setBrowser] = useState('');

  useEffect(() => {
    // Get the user's operating system from user agent string
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf('Win') !== -1) {
      setOs('Windows');
    } else if (userAgent.indexOf('Mac') !== -1) {
      setOs('Mac OS');
    } else if (userAgent.indexOf('Linux') !== -1) {
      setOs('Linux');
    } else if (userAgent.indexOf('Android') !== -1) {
      setOs('Android');
    } else if (userAgent.indexOf('iOS') !== -1) {
      setOs('iOS');
    } else {
      setOs('Unknown OS');
    }

    // Get the user's browser
    if (userAgent.indexOf('Chrome') !== -1) {
      setBrowser('Google Chrome');
    } else if (userAgent.indexOf('Firefox') !== -1) {
      setBrowser('Mozilla Firefox');
    } else if (userAgent.indexOf('Safari') !== -1) {
      setBrowser('Apple Safari');
    } else if (
      userAgent.indexOf('MSIE') !== -1 ||
      userAgent.indexOf('Trident/') !== -1
    ) {
      setBrowser('Internet Explorer');
    } else if (userAgent.indexOf('Edge') !== -1) {
      setBrowser('Microsoft Edge');
    } else {
      setBrowser('Unknown Browser');
    }
  }, []);

  return { os, browser };
};

export default useOSAndBrowserInfo;
