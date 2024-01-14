'use client';

import {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';

const PreventContextMenu: FunctionComponent = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  const handleClick: MouseEventHandler = e => {
    e.preventDefault();
    setIsVisible(false);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
    enableScroll();
  };

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowMessage(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
      disableScroll();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  return showMessage ? (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`fixed w-full h-full bg-gradient-to-b from-transparent to-black z-50 flex justify-center items-center text-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-1000`}
      onClick={handleClick}
    >
      <div className="text-white">
        Images cannot be downloaded from this website.
      </div>
    </div>
  ) : null;
};

export default PreventContextMenu;
