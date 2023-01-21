"use client";

import { FunctionComponent, useRef, useState } from "react";
import BurgerMenu from "@components/BurgerMenu";
import Drawer from "@components/Drawer";
import SocialMediaLinks from "@components/SocialMediaLinks";
import { useRouter } from "next/navigation";
import MenuLinks from "@components/MenuLinks";
import { MenuLink } from "types/menus";
import Image from "next/image";
import useOutsideElement from "@app/hooks/useOutsideElement";

interface HeaderProps {
  menuLinks?: MenuLink[];
  navBarHeight?: string;
}

const Header: FunctionComponent<HeaderProps> = ({
  navBarHeight = "5rem",
  menuLinks = [],
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  useOutsideElement([drawerRef, navBarRef], () => setDrawerOpen(false));
  const router = useRouter();

  return (
    <div className="header">
      <div
        className="header__nav-bar__white-space"
        style={{ height: navBarHeight }}
      ></div>
      <div
        className="header__nav-bar | flex justify-between fixed top-0 z-20 | w-full p-6 bg-white"
        style={{ height: navBarHeight }}
        ref={navBarRef}
      >
        <div className="header--left | flex items-center space-x-3">
          <BurgerMenu
            className="w-[60px]"
            open={drawerOpen}
            setOpen={setDrawerOpen}
          />
          <Image
            src={"/bluetiful_logo_h.svg"}
            alt="Bluetiful Planet Logo"
            width={180}
            height={32}
            priority
            onClick={() => {
              router.push("/");
              setDrawerOpen(false);
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="header--right">
          <SocialMediaLinks />
        </div>
      </div>
      <Drawer open={drawerOpen} ref={drawerRef}>
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
