"use client";

import { FunctionComponent, useRef, useState } from "react";
import useOutsideElement from "../../hooks/useOutsideElement";
import BurgerMenu from "../BurgerMenu";
import Drawer from "../Drawer";
import LogoH from "../LogoH";
import SocialMediaLinks from "../SocialMediaLinks";
import { useRouter } from "next/navigation";
import MenuLinks from "../MenuLinks";

interface HeaderProps {
  navBarHeight?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ navBarHeight = "5rem" }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  useOutsideElement([drawerRef, navBarRef], () => setDrawerOpen(false));
  const router = useRouter();

  const menuLinks = [
    { name: "Home", path: "/", subMenu: null },
    {
      name: "Photos",
      path: "/photos",
      subMenu: [
        { name: "Main Gallery", path: "main-gallery" },
        { name: "Personal Favourites", path: "personal-favourites" },
        { name: "Pollinators & lights", path: "pollinators-and-lights" },
      ],
    },
    { name: "Blog", path: "/blog", subMenu: null },
    { name: "About Me", path: "/about-us", subMenu: null },
    { name: "Contact Me", path: "/contact", subMenu: null },
  ];

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
          <LogoH
            className="h-full cursor-pointer"
            onClick={() => {
              router.push("/");
              setDrawerOpen(false);
            }}
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
