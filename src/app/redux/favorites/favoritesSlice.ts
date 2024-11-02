import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritePhoto, FavoritesState } from './types';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoritePhoto>) => {
      const favPhoto = state.items.some((item) => item.nasa_id === action.payload.nasa_id);
      if (!favPhoto) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.nasa_id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
