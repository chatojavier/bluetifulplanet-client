import { forwardRef, ForwardRefRenderFunction, PropsWithChildren } from 'react';

interface DrawerProps {
  open: boolean;
  className?: string;
}

const Drawer: ForwardRefRenderFunction<
  HTMLDivElement,
  PropsWithChildren<DrawerProps>
> = ({ children, open, className = '' }, ref) => {
  return (
    <div
      className={`drawer | fixed z-10 bottom-0 | w-screen | bg-black bg-opacity-70 transition-all duration-1000 ${className} ${
        open ? 'bg-opacity-70 visible' : 'bg-opacity-0 invisible'
      }`}
    >
      <div
        className={`drawer__card | h-full bg-white overflow-hidden py-16 transition-all duration-1000 ${
          open ? 'open w-80 px-16' : 'close w-0 p-0 delay-300'
        }`}
        ref={ref}
        data-testid="drawer-wrapper"
      >
        {children}
      </div>
    </div>
  );
};

export default forwardRef(Drawer);
