'use client';

import { doc, getDoc } from 'firebase/firestore';
import { CircleUser, Film, UserRoundPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { useAuth } from '@/app/context/auth-context';
import { useToast } from '@/app/context/toast-context';
import { db } from '@/app/lib/firebase';
import { store } from '@/app/redux/store';
import Button from '@/app/ui/button';
import Loader from '@/app/ui/loader/loader';
import Modal from '@/app/ui/modal';

import EditProfile from './components/edit-profile';
import PhotoCollection from './components/photo-collection';
import { UserData } from './types';
import { formatDate } from './utils';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (!user && !authLoading) {
      router.replace('/main/login');
      return;
    }

    const fetchUserData = async () => {
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
    };

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return <Loader />;
  }

  const handleOpenEditModal = () => {
    if (user && user.emailVerified) {
      setEditModalIsOpen(true);
    } else {
      showToast('Please confirm your email address to edit your profile');
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <h1 className="text-2xl">Profile</h1>
        <Button
          onClick={handleOpenEditModal}
          className="flex justify-center gap-1 px-3 py-1 text-sm"
        >
          Edit <UserRoundPen size={18} />
        </Button>
      </div>
      {userData ? (
        <div>
          <div className="mb-8 flex flex-col items-center gap-2">
            <CircleUser strokeWidth={1} size={60} />
            <h1 className="text-xl font-bold">{userData.name}</h1>
            <h2 className="mb-3 text-sm">{userData.email}</h2>
            <p className="text-xs">Profile created: {formatDate(userData.createdAt)} UTC+3</p>
            <p className="text-xs">Last login: {formatDate(userData.lastLogin)} UTC+3</p>
            {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" />}
          </div>
          <p className="mb-5 flex items-center justify-center gap-1 text-xl">
            <Film size={20} strokeWidth={1.5} />
            Photo collection
          </p>
          <Provider store={store}>
            <PhotoCollection />
          </Provider>
        </div>
      ) : (
        <p>User data not found</p>
      )}
      {user && userData && (
        <Modal isOpen={editModalIsOpen} onClose={() => setEditModalIsOpen(false)}>
          <EditProfile
            userData={userData}
            setUserData={setUserData}
            onClose={() => setEditModalIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
