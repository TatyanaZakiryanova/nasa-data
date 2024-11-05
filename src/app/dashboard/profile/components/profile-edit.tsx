import { useState } from 'react';
import { UserData } from '../types';

interface ProfileEditProps {
  userData: UserData;
}

export default function ProfileEdit({ userData }: ProfileEditProps) {
  const [name, setName] = useState<string>(userData.name);
  return <div></div>;
}
