import { fireEvent, render, screen } from '@testing-library/react';

import { useAuth } from '@/app/context/auth-context';
import useFavorites from '@/app/hooks/use-favorites';
import PhotoCard from '@/app/ui/photo-card';

jest.mock('@/app/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/app/hooks/use-favorites', () => jest.fn());

describe('PhotoCard', () => {
  const photo = {
    id: 'photo1',
    title: 'Test Photo',
    imageUrl: '/test.jpg',
    date: '2024-02-12',
    description: 'desc',
  };

  it('does not display the star if user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: jest.fn(),
    });

    render(<PhotoCard {...photo} onClick={jest.fn()} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('displays the star if user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        uid: '123',
      },
    });

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: jest.fn(),
    });

    render(<PhotoCard {...photo} onClick={jest.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls handleToggleFavorite when star is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'user123' } });

    const handleToggleFavoriteMock = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: handleToggleFavoriteMock,
    });

    render(<PhotoCard {...photo} onClick={jest.fn()} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleToggleFavoriteMock).toHaveBeenCalled();
  });

  it('displays the star with opacity 100 when isFavorite is true', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: true,
      handleToggleFavorite: jest.fn(),
    });

    render(<PhotoCard {...photo} onClick={jest.fn()} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement.closest('div')).toHaveClass('opacity-100');
  });

  it('does not display the star with opacity 100 when isFavorite is false', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: jest.fn(),
    });

    render(<PhotoCard {...photo} onClick={jest.fn()} />);

    const buttonElement = screen.queryByRole('button');
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement?.closest('div')).toHaveClass('opacity-0');
  });
});
