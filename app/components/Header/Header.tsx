'use client';

import { FunctionComponent, useRef, useState } from 'react';
import BurgerMenu from '@components/BurgerMenu';
import Drawer from '@components/Drawer';
import SocialMediaLinks from '@components/SocialMediaLinks';
import { useRouter } from 'next/navigation';
import MenuLinks from '@components/MenuLinks';
import Image from 'next/image';
import useOutsideElement from '@app/hooks/useOutsideElement';
import { MenuItem } from '@api/wp/menus/utils';
import { SocialMedia } from '@api/wp/options/utils';

interface HeaderProps {
  menuLinks?: MenuItem[];
  socialMedia?: SocialMedia;
}

const Header: FunctionComponent<HeaderProps> = ({
  menuLinks = [],
  socialMedia,
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  useOutsideElement([drawerRef, navBarRef], () => setDrawerOpen(false));
  const router = useRouter();

  return (
    <div className="header">
      <div className="header__nav-bar__white-space | h-12 | md:h-20" />
      <div
        className="header__nav-bar | flex justify-between fixed top-0 z-20 | w-full p-3 bg-white | | h-12 | md:h-20 md:p-6"
        ref={navBarRef}
      >
        <div className="header--left | flex items-center space-x-3">
          <BurgerMenu
            className="w-[18px] md:mr-4"
            open={drawerOpen}
            setOpen={setDrawerOpen}
          />
          <Image
            src="/bluetiful_logo_h.svg"
            alt="Bluetiful Planet Logo"
            width={180}
            height={32}
            priority
            onClick={() => {
              router.push('/');
              setDrawerOpen(false);
            }}
            className="cursor-pointer | w-auto h-6 | md:h-8"
          />
        </div>
        <div className="header--right">
          <SocialMediaLinks socialMediaData={socialMedia} />
        </div>
      </div>
      <Drawer
        open={drawerOpen}
        ref={drawerRef}
        className="h-[calc(100vh-3rem)] md:h-[calc(100vh-5rem)]"
      >
        <MenuLinks
          links={menuLinks}
          open={drawerOpen}
          setOpen={setDrawerOpen}
        />
      </Drawer>
    </div>
  );
};

export default Header;
