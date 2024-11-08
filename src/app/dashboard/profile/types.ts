import { Timestamp } from 'firebase/firestore';

export interface UserData {
  uid: string;
  email: string;
  name: string;
  profilePicture: string | null;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  roles: string[];
}

export enum SortOrder {
  DEFAULT = 'default',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
