import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu: FunctionComponent<BurgerMenuProps> = ({
  className = '',
  open,
  setOpen,
}) => {
  return (
    <div className={`${styles.burgerMenu} | h-fit | ${className}`}>
      <div className="menu cross menu--1">
        <label data-testid="burger-menu-label">
          <input
            type="checkbox"
            checked={open}
            onChange={() => setOpen(prev => !prev)}
          />
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            data-icon="burger-menu"
          >
            <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
            <path className="line--2" d="M0 50h70" />
            <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default BurgerMenu;
