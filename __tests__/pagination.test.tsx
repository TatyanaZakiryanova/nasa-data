import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useAppDispatch } from '@/app/redux/hooks';
import { fetchPhotos } from '@/app/redux/photos/asyncActions';
import Pagination from '@/app/ui/pagination';

jest.mock('@/app/redux/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/app/redux/photos/asyncActions', () => ({
  fetchPhotos: jest.fn(),
}));

describe('Pagination', () => {
  const mockDispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  it('calls fetchPhotos  with nextPageUrl when Next button is clicked', async () => {
    const paginationLinks = {
      nextPageUrl: 'nextPageUrl',
      prevPageUrl: 'prevPageUrl',
      loading: false,
    };

    render(<Pagination {...paginationLinks} />);

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(fetchPhotos({ url: 'nextPageUrl' })),
    );
  });

  it('calls fetchPhotos with prevPageUrl when Prev button is clicked', async () => {
    const paginationLinks = {
      nextPageUrl: 'nextPageUrl',
      prevPageUrl: 'prevPageUrl',
      loading: false,
    };

    render(<Pagination {...paginationLinks} />);

    const prevButton = screen.getByText(/previous/i);
    fireEvent.click(prevButton);

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(fetchPhotos({ url: 'prevPageUrl' })),
    );
  });

  it('disables Next button when nextPageUrl is null', () => {
    const paginationLinks = {
      nextPageUrl: null,
      prevPageUrl: 'prevPageUrl',
      loading: false,
    };
    render(<Pagination {...paginationLinks} />);
    const nextButton = screen.getByText(/next/i);
    expect(nextButton).toBeDisabled();
  });

  it('disables Prev button when prevPageUrl is null', () => {
    const paginationLinks = {
      nextPageUrl: 'nextPageUrl',
      prevPageUrl: null,
      loading: false,
    };

    render(<Pagination {...paginationLinks} />);
    const prevButton = screen.getByText(/previous/i);
    expect(prevButton).toBeDisabled();
  });
});
