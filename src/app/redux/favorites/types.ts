export interface FavoritePhoto {
  id: string;
  title: string;
  imageUrl: string;
  copyright: string;
  center: string;
  date: string;
  description: string;
}

export interface FavoritesState {
  items: FavoritePhoto[];
}
