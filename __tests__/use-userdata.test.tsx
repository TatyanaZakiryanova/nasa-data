import { act, renderHook } from '@testing-library/react';
import { getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/auth-context';
import { useToast } from '@/app/context/toast-context';
import useUserData from '@/app/hooks/use-userdata';

jest.mock('@/app/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/app/context/toast-context', () => ({
  useToast: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn().mockReturnValue('mockedFirestoreInstance'),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('useUserData', () => {
  const mockShowToast = jest.fn();
  const mockRouter = { replace: jest.fn() };
  const mockUser = { uid: 'user123' };
  const mockUserData = { name: 'John', age: 30 };

  (useAuth as jest.Mock).mockReturnValue({ user: mockUser, loading: false });
  (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (getDoc as jest.Mock).mockResolvedValue({ exists: () => true, data: () => mockUserData });

  it('returns initial state', () => {
    const { result } = renderHook(() => useUserData());

    expect(result.current.userData).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBe(mockUser);
    expect(result.current.authLoading).toBe(false);
  });

  it('load user data', async () => {
    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await result.current.fetchUserData();
    });

    expect(result.current.userData).toEqual(mockUserData);
    expect(result.current.isLoading).toBe(false);
  });

  it('redirects to login page when user is not authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });

    renderHook(() => useUserData());

    expect(mockRouter.replace).toHaveBeenCalledWith('/main/login');
  });
});
