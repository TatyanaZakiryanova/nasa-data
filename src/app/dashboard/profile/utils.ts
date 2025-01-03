import { Timestamp } from 'firebase/firestore';

import { FavoritePhoto } from '@/app/redux/favorites/types';

import { SortOrder } from './types';

export const formatDate = (timestamp: Timestamp) => {
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

export const sortFavorites = (favorites: FavoritePhoto[], order: SortOrder) => {
  if (order === SortOrder.NEWEST) {
    return [...favorites].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (order === SortOrder.OLDEST) {
    return [...favorites].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  return favorites;
};
