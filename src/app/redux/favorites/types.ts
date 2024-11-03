export interface FavoritePhoto {
  id: string;
  title: string;
  imageUrl: string;
  copyright?: string;
  date: string;
}

export interface FavoritesState {
  items: FavoritePhoto[];
}
