import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FavoritePhoto, FavoritesState } from './types';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoritePhoto[]>) => {
      state.items = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<FavoritePhoto>) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
