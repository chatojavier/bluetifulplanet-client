import { MenuItem } from '@app/api/wp/menus/utils';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MenuLinksProps {
  links: MenuItem[];
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
    if (!subMenu && !open) setOpenSubMenu(prev => prev.map(() => false));
  }, [open, subMenu]);

  const handleClickLink = (link: MenuItem, index: number) => {
    if (!link.subMenu) {
      router.push(link.path);
      setOpen(false);
      setOpenSubMenu(prev => prev.map(() => false));
    } else {
      setOpenSubMenu(prev => {
        const arrayUpdated = [...prev];
        arrayUpdated[index] = !prev[index];
        return arrayUpdated;
      });
    }
  };

  return (
    <ul
      className={`menu-links | uppercase overflow-hidden ${
        subMenu && (!open ? 'max-h-0' : 'max-h-40  mt-2')
      } ${
        !subMenu
          ? 'space-y-6 text-sm'
          : 'transition-all duration-700 space-y-2 ml-4 text-xs'
      }`}
      ref={subMenuRef}
    >
      {links.map((link, index) => (
        <li key={link.id}>
          <div
            className={`menu-links__single | cursor-pointer transition-opacity duration-500 ${
              open ? 'opacity-100' : 'opacity-0'
            } ${
              link.subMenu &&
              "before:content-['+'] before:absolute before:left-12"
            }`}
            style={{
              transitionDelay:
                open && !subMenu ? `${index * 100 + 530}ms` : '0s',
            }}
            key={link.id}
            onClick={() => handleClickLink(link, index)}
            onKeyDown={() => handleClickLink(link, index)}
            role="link"
            tabIndex={0}
          >
            {link.label}
            {link.subMenu && (
              <MenuLinks
                links={link.subMenu}
                open={openSubMenu[index]}
                setOpen={setOpen}
                subMenu
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
