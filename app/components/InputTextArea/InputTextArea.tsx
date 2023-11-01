import { LegacyRef, TextareaHTMLAttributes, forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type InputTextAreaProps = {
  error?: string | boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputTextArea = forwardRef(
  (props: InputTextAreaProps, ref: LegacyRef<HTMLTextAreaElement>) => {
    const { error, rows = 12, className, ...restProps } = props;
    const inputCommonClasses =
      'w-full border bg-gray-100 p-3 text-xs leading-none | focus:rounded-none focus:bg-white transition-all duration-700 | placeholder:text-gray-500 placeholder:font-semibold placeholder:text-xs placeholder:uppercase';

    return (
      <div className={`input-text | w-full relative ${className ?? ''}`}>
        <textarea
          ref={ref}
          rows={rows}
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

export default InputTextArea;
