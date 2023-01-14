import { useRouter } from "next/navigation";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MenuLink } from "../../types/menus";

interface MenuLinksProps {
  links: MenuLink[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  subMenu?: boolean;
}

const MenuLinks: FunctionComponent<MenuLinksProps> = ({
  links,
  open,
  setOpen,
  subMenu = false,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<boolean[]>(
    links.map(() => false)
  );
  const subMenuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    if(!subMenu && !open)
    setOpenSubMenu((prev) => prev.map(() => false));
  }, [open, subMenu])
  return (
    <ul
      className={`menu-links | uppercase overflow-hidden ${
        subMenu && (!open ? 'max-h-0' : "max-h-40  mt-2")
      } ${
        !subMenu
          ? "space-y-6 text-sm"
          : "transition-all duration-700 space-y-2 ml-4 text-xs"
      }`}
      ref={subMenuRef}
    >
      {links.map((link, index) => (
        <li
          className={`menu-links__single | cursor-pointer transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          } ${
            link.subMenu &&
            "before:content-['+'] before:absolute before:left-12"
          }`}
          style={{
            transitionDelay: open && !subMenu ? `${index * 100 + 530}ms` : "0s",
          }}
          key={link.id}
          onClick={() => {
            if (!link.subMenu) {
              router.push(link.path);
              setOpen(false);
              setOpenSubMenu((prev) => prev.map(() => false));
            } else {
              setOpenSubMenu((prev) => {
                const arrayUpdated = [...prev];
                arrayUpdated[index] = !prev[index];
                return arrayUpdated;
              });
            }
          }}
        >
          {link.name}
          {link.subMenu && (
            <MenuLinks
              links={link.subMenu}
              open={openSubMenu[index]}
              setOpen={setOpen}
              subMenu
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
