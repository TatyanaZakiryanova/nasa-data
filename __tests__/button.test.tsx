import Button from '@/app/ui/button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
  it('calls onClick when clicked and not disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    render(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);

    expect(buttonElement).toHaveClass('cursor-not-allowed');
    expect(buttonElement).toHaveClass('bg-gray-300');
  });

  it('applies hover styles when not disabled', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);

    expect(buttonElement).not.toHaveClass('cursor-not-allowed');
    expect(buttonElement).not.toHaveClass('bg-gray-300');
  });
});
