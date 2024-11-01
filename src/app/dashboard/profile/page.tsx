'use client';

import { useEffect, useState } from 'react';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useAuth } from '@/app/contexts/auth-context';
import { db } from '@/app/lib/firebase';
import Loader from '@/app/ui/loader/loader';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
        } else {
          console.error('Пользователь не найден');
        }
      } catch {
        console.error('Ошибка при загрузке данных пользователя');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (authLoading || isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>
            Created At
            {new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}
          </p>
          {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" />}
        </div>
      ) : (
        <p>User data not found</p>
      )}
    </div>
  );
}
