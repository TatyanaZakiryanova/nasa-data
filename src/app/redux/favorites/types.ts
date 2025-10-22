export interface FavoritePhoto {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  description: string;
}

export interface FavoritesState {
  items: FavoritePhoto[];
}
