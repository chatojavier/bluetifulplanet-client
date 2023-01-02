import { forwardRef, ForwardRefRenderFunction, FunctionComponent, PropsWithChildren } from "react";

interface DrawerProps {
  open: boolean;
}

const Drawer: ForwardRefRenderFunction<HTMLDivElement, PropsWithChildren<DrawerProps>> = ({
  children,
  open
}, ref) => {
  return (
    <div
      className={`drawer | absolute z-10 bottom-0 | w-screen h-[calc(100vh-5rem)] | bg-black bg-opacity-70 transition-all duration-1000 ${
        open ? "bg-opacity-70 visible" : "bg-opacity-0 invisible"
      }`}
    >
      <div
        className={`drawer__card | h-full bg-white overflow-hidden py-16 transition-all duration-1000 ${
          open ? "w-80 px-16" : "w-0 p-0 delay-300"
        }`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default forwardRef(Drawer);
