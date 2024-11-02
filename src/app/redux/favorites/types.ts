export interface FavoritePhoto {
  title: string;
  nasa_id: string;
  description: string;
  imageLink?: string;
  fullImageLink?: string;
  date_created: string;
  center: string;
}

export interface FavoritesState {
  items: FavoritePhoto[];
}
