import { doc, updateDoc } from 'firebase/firestore';
import { ChangeEvent, Dispatch, useState } from 'react';

import { db } from '@/app/lib/firebase';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';

import { UserData } from '../types';

interface ProfileEditProps {
  userData: UserData;
  setUserData: Dispatch<React.SetStateAction<UserData | null>>;
  onClose: () => void;
}

export default function EditProfile({ userData, setUserData, onClose }: ProfileEditProps) {
  const [name, setName] = useState<string>(userData.name);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setUploading(true);
    try {
      await updateDoc(doc(db, 'users', userData.uid), {
        name: name,
      });
      setUserData((prev) => ({
        ...prev!,
        name: name,
      }));
      onClose();
    } catch {
      console.error('Error update profile');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 p-5">
        <h1 className="mb-3">Editing profile</h1>
        <label className="text-sm">Name:</label>
        <Input
          id="name"
          name="name"
          type="text"
          inputValue={name}
          handleInput={handleInput}
          placeholder="Name"
          className="p-1"
          required
        />
        <Button type="submit" disabled={uploading} className="mt-3 py-2 text-sm">
          {uploading ? 'Updating profile...' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
