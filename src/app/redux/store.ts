import { configureStore } from '@reduxjs/toolkit';

import photosReducer from './photos/photosSlice';
import favoritesReducer from './favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
