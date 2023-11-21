/* eslint-disable react/button-has-type */
import {
  ButtonHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
} from 'react';
import Spinner from '../Spinner';

type ButtonSquareProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
> & {
  loading?: boolean;
  type: 'submit' | 'button';
};

const ButtonSquare: FunctionComponent<ButtonSquareProps> = ({
  children,
  disabled,
  loading,
  type,
  value,
  className,
  ...restProps
}) => {
  return (
    <button
      type={type}
      className={`block uppercase text-xs font-semibold px-10 py-2 border-2 border-black mb-6 disabled:border-gray-500 disabled:text-gray-500 hover:border-bluetifulBlue hover:text-bluetifulBlue ${
        className ?? ''
      }`}
      disabled={loading || disabled}
      {...restProps}
    >
      {loading && <Spinner size="xs" className="mr-3" />}
      {children || value}
    </button>
  );
};

export default ButtonSquare;
