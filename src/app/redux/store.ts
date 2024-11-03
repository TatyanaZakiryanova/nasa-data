import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favorites/favoritesSlice';
import photosReducer from './photos/photosSlice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
