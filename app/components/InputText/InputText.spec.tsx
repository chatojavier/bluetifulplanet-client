/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { FunctionComponent } from 'react';
import userEvent from '@testing-library/user-event';
import InputText from './InputText';

const InputWrapper: FunctionComponent<any> = ({
  label,
  placeholder,
  required = false,
}) => {
  const {
    register,
    formState: { errors = {} },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(jest.fn())}>
      <InputText
        {...register(label, { required })}
        error={errors[label] ? 'error' : ''}
        placeholder={placeholder}
      />
      <button type="submit">submitButton</button>
    </form>
  );
};

describe('InputText', () => {
  it('should render input properties properly', () => {
    const inputName = 'mockName';
    const inputPlaceholder = 'Mock Input Placeholder';
    render(<InputWrapper label={inputName} placeholder={inputPlaceholder} />);

    const inputEl = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputEl.name).toBe(inputName);
    expect(inputEl.placeholder).toBe(inputPlaceholder);
  });
  it('should show error if it is required and not filled', async () => {
    const user = userEvent.setup();
    const inputName = 'mockName';
    render(<InputWrapper label={inputName} required />);

    const inputEl = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button') as HTMLButtonElement;

    expect(inputEl).not.toHaveClass('border-red-600');

    await user.click(submitButton);
    expect(inputEl).toHaveClass('border-red-600');
  });
});
