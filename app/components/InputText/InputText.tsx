import { InputHTMLAttributes, LegacyRef, forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type InputTextProps = {
  error?: string | boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputText = forwardRef(
  (props: InputTextProps, ref: LegacyRef<HTMLInputElement>) => {
    const { error, size = 40, className, type = 'text', ...restProps } = props;
    const inputCommonClasses =
      'w-full border bg-gray-100 p-3 text-xs | focus:rounded-none focus:bg-white transition-all duration-700 | placeholder:text-gray-500 placeholder:font-semibold placeholder:text-xs placeholder:uppercase';

    return (
      <div className={`input-text | w-full relative ${className ?? ''}`}>
        <input
          ref={ref}
          type={type}
          size={size}
          className={`${inputCommonClasses} ${
            error ? 'border-red-600' : 'border-gray-100 focus:border-black'
          }`}
          {...restProps}
        />
        {error && (
          <div className="input-error | absolute top-2 right-2 text-xs text-red-600">
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default InputText;
