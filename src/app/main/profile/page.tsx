'use client';

import { CircleAlert, CircleUser, Film, UserRoundPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';

import { useToast } from '@/app/context/toast-context';
import useUserData from '@/app/hooks/use-userdata';
import { store } from '@/app/redux/store';
import Button from '@/app/ui/button';
import Loader from '@/app/ui/loader/loader';

import PhotoCollection from './components/photo-collection';

export default function Profile() {
  const router = useRouter();
  const { userData, isLoading, user, authLoading } = useUserData();
  const { showToast } = useToast();

  if (authLoading || isLoading) {
    return <Loader />;
  }

  const openEditPage = () => {
    if (user && user.emailVerified) {
      router.push('/main/profile/edit');
    } else {
      showToast('Please confirm your email address to edit your profile');
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <h1 className="text-2xl">Profile</h1>
        <Button onClick={openEditPage} className="flex justify-center gap-1 px-3 py-1 text-sm">
          Edit <UserRoundPen size={18} />
        </Button>
      </div>
      {userData ? (
        <div>
          <div className="mb-8 flex flex-col items-center gap-2">
            <CircleUser strokeWidth={1} size={60} />
            <h1 className="text-xl font-bold">{userData.name}</h1>
            <div className="mb-3 flex flex-col items-center justify-center gap-2">
              <h2 className="text-sm">{userData.email}</h2>
              {user && !user.emailVerified && (
                <span
                  className="flex cursor-pointer items-center gap-1 text-xs text-customTextColor text-opacity-50 hover:underline"
                  onClick={() =>
                    showToast('A verification letter has already been sent to your email')
                  }
                >
                  <CircleAlert size={16} />
                  Please confirm your email
                </span>
              )}
            </div>
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
    </div>
  );
}
