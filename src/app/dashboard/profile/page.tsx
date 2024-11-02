'use client';

import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { CircleUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '@/app/contexts/auth-context';
import { db } from '@/app/lib/firebase';
import Loader from '@/app/ui/loader/loader';
import Modal from '@/app/ui/modal';

import { formatDate } from './utils';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!user && !authLoading) {
      router.replace('/dashboard/login');
      return;
    }

    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          openModal('User not found');
        }
      } catch {
        openModal('Error loading user data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return <Loader />;
  }

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 2000);
  };

  return (
    <div>
      <h1 className="mb-3 flex flex-col items-center text-2xl">
        Profile
        <CircleUser size={60} />
      </h1>
      {userData ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2>{userData.email}</h2>
            <p className="text-xs">Created at: {formatDate(userData.createdAt)} UTC+3</p>
            <p className="text-xs">Last login: {formatDate(userData.lastLogin)} UTC+3</p>
            {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" />}
          </div>
          <h1 className="mb-3 text-xl">Photo collection</h1>
        </div>
      ) : (
        <p>User data not found</p>
      )}
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
