'use client';

import { doc, DocumentData, getDoc, Timestamp } from 'firebase/firestore';
import { CircleUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '@/app/contexts/auth-context';
import { db } from '@/app/lib/firebase';
import Loader from '@/app/ui/loader/loader';
import Modal from '@/app/ui/modal';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const router = useRouter();

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
          openModal('User not found');
          router.push('/dashboard/search');
        }
      } catch {
        openModal('Error loading user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

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

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
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
