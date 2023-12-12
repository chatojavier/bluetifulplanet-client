import { render, screen, fireEvent } from '@testing-library/react';
import PrevNextButton from './PrevNextButton';

describe('PrevNextButton', () => {
  const modalPrevButtonTestId = 'modal-prev-button';

  it('should render the component without errors', () => {
    render(<PrevNextButton variant="prev" />);
    expect(screen.getByTestId(modalPrevButtonTestId)).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const onClick = jest.fn();
    render(<PrevNextButton variant="next" onClick={onClick} />);
    const button = screen.getByTestId('modal-next-button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call the onClick function when Enter key is pressed', () => {
    const onClick = jest.fn();
    render(<PrevNextButton variant="prev" onClick={onClick} />);
    const button = screen.getByTestId(modalPrevButtonTestId);
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call the onClick function when disabled', () => {
    const onClick = jest.fn();
    render(<PrevNextButton variant="next" onClick={onClick} disabled />);
    const button = screen.getByTestId('modal-next-button');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should have the correct variant class', () => {
    render(<PrevNextButton variant="prev" />);
    const button = screen.getByTestId(modalPrevButtonTestId);
    expect(button).toHaveClass('left-4');
  });

  it('should have the correct icon for the variant', () => {
    render(<PrevNextButton variant="next" />);
    const icon = screen.getByTestId('prev-next-button-icon');
    expect(icon).toHaveClass('fa-chevron-right');
  });
});
