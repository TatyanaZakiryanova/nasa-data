import { FavoritePhoto } from '@/app/redux/favorites/types';

import { SortOrder } from './types';

export const sortFavorites = (favorites: FavoritePhoto[], order: SortOrder) => {
  if (order === SortOrder.NEWEST) {
    return [...favorites].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (order === SortOrder.OLDEST) {
    return [...favorites].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  return favorites;
};
