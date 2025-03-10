import { fireEvent, render, screen } from '@testing-library/react';

import { useAuth } from '@/app/context/auth-context';
import useFavorites from '@/app/hooks/use-favorites';
import PhotoModal from '@/app/ui/photo-modal';

jest.mock('@/app/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/app/hooks/use-favorites', () => jest.fn());

describe('PhotoModal', () => {
  const photo = {
    id: 'photo1',
    title: 'Test Photo',
    imageSrc: '/test.jpg',
    date_created: '2024-02-12',
    copyright: 'Test',
    description: 'desc',
  };

  it('does not display the favorite button if user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: jest.fn(),
    });

    const photoWithCenter = { ...photo, center: 'NASA' };
    render(<PhotoModal {...photoWithCenter} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('displays the favorite button if user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: '123' } });

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: jest.fn(),
    });

    const photoWithCenter = { ...photo, center: 'NASA' };
    render(<PhotoModal {...photoWithCenter} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls handleToggleFavorite when favorite button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: '123' } });

    const handleToggleFavoriteMock = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: handleToggleFavoriteMock,
    });

    const photoWithCenter = { ...photo, center: 'NASA' };
    render(<PhotoModal {...photoWithCenter} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleToggleFavoriteMock).toHaveBeenCalled();
  });

  it('renders favorite button with correct text when isFavorite is false', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: false,
      handleToggleFavorite: jest.fn(),
    });

    const photoWithCenter = { ...photo, center: 'NASA' };
    render(<PhotoModal {...photoWithCenter} />);
    const buttonElement = screen.getByText(/add to favorites/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders favorite button with correct text when isFavorite is true', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: true,
      handleToggleFavorite: jest.fn(),
    });

    const photoWithCenter = { ...photo, center: 'NASA' };
    render(<PhotoModal {...photoWithCenter} />);
    const buttonElement = screen.getByText(/remove from favorites/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('display the center value when center is provided', () => {
    const photoWithCenter = { ...photo, center: 'NASA' };
    render(<PhotoModal {...photoWithCenter} />);

    expect(screen.getByText(/center: nasa/i)).toBeInTheDocument();
  });

  it('does not display the center value when center is null', () => {
    const photoWithNullCenter = { ...photo, center: null };
    render(<PhotoModal {...photoWithNullCenter} />);

    expect(screen.queryByText(/center/i)).toBeNull();
  });
});
