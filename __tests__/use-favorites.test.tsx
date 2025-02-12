import { useAuth } from '@/app/context/auth-context';
import useFavorites from '@/app/hooks/use-favorites';
import { db } from '@/app/lib/firebase';
import { addToFavorites, removeFromFavorites } from '@/app/redux/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { renderHook } from '@testing-library/react';
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

jest.mock('@/app/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/app/redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn().mockReturnValue('mockedFirestoreInstance'),
  doc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('useFavorites', () => {
  const mockDispatch = jest.fn();
  const mockUser = { uid: 'user123' };
  const photo = {
    id: 'photo1',
    title: 'Test Photo',
    imageUrl: 'test.jpg',
    date: '2024-02-12',
    copyright: 'Test',
    center: 'NASA',
    description: 'desc',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (getAuth as jest.Mock).mockReturnValue({
      currentUser: mockUser,
    });
  });

  it('returns correct isFavorite value', () => {
    (useAppSelector as jest.Mock).mockReturnValue([{ id: 'photo1' }]);

    const { result } = renderHook(() => useFavorites({ photo }));
    expect(result.current.isFavorite).toBe(true);
  });

  it('adds photo to favorites and updates firestore', async () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useFavorites({ photo }));
    result.current.handleToggleFavorite({ stopPropagation: jest.fn() });

    expect(mockDispatch).toHaveBeenCalledWith(addToFavorites(photo));
    expect(setDoc).toHaveBeenCalledWith(
      doc(db, `users/${mockUser.uid}/favorites`, photo.id),
      photo,
    );
  });

  it('removes photo from favorites and updates firestore', async () => {
    (useAppSelector as jest.Mock).mockReturnValue([{ id: 'photo1' }]);

    const { result } = renderHook(() => useFavorites({ photo }));
    result.current.handleToggleFavorite({ stopPropagation: jest.fn() });

    expect(mockDispatch).toHaveBeenCalledWith(removeFromFavorites(photo.id));

    expect(deleteDoc).toHaveBeenCalledWith(doc(db, `users/${mockUser.uid}/favorites`, photo.id));
  });
});
