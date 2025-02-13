import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/app/context/auth-context';
import { useToast } from '@/app/context/toast-context';
import { db } from '@/app/lib/firebase';

import { UserData } from '../main/profile/types';

export default function useUserData() {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      } else {
        showToast('User not found');
      }
    } catch {
      console.error('Error loading user data');
    } finally {
      setIsLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    if (!user && !authLoading) {
      router.replace('/main/login');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [fetchUserData, user, authLoading]);

  return { userData, isLoading, user, authLoading, setUserData, fetchUserData };
}
