import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLProps, KeyboardEventHandler, forwardRef, MouseEvent } from 'react';

type PrevNextButtonProps = HTMLProps<HTMLDivElement> & {
  variant: 'prev' | 'next';
};

const PrevNextButton = forwardRef<HTMLDivElement, PrevNextButtonProps>(
  ({ onClick, variant, disabled, ...rest }, ref) => {
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      if (e.key === 'Enter' && onClick)
        onClick(e as unknown as MouseEvent<HTMLDivElement>);
    };
    return (
      <div
        className={`prev-next-button-wrapper | absolute text-white text-[2rem] z-20 ${
          variant === 'prev' ? 'left-4' : 'right-4'
        } ${disabled ? 'opacity-20 cursor-auto' : ''}`}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={!disabled ? handleKeyDown : undefined}
        role="button"
        tabIndex={0}
        ref={ref}
        aria-disabled={disabled}
        data-testid={`modal-${variant}-button`}
        {...rest}
      >
        <FontAwesomeIcon
          icon={variant === 'prev' ? faChevronLeft : faChevronRight}
          data-testid="prev-next-button-icon"
        />
      </div>
    );
  }
);

export default PrevNextButton;
