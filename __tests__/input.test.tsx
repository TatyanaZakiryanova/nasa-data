import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Input from '@/app/ui/input';

describe('Input', () => {
  it('calls handleInput when text is entered', () => {
    const handleInput = jest.fn();
    render(<Input id="test-input" name="test" inputValue="" handleInput={handleInput} />);

    fireEvent.change(screen.getByPlaceholderText(/search for photos.../i), {
      target: { value: 'new value' },
    });

    expect(handleInput).toHaveBeenCalledTimes(1);
  });

  it('renders loading indicator when loading is true', () => {
    const handleInput = jest.fn();
    render(
      <Input id="test-input" name="test" inputValue="" loading={true} handleInput={handleInput} />,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
