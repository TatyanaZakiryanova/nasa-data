import { createSlice } from '@reduxjs/toolkit';

import { fetchPhotos } from './asyncActions';
import { PhotosState, Status } from './types';

const initialState: PhotosState = {
  photos: [],
  totalItems: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  status: Status.IDLE,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = Status.LOADING;
        state.photos = [];
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.photos = action.payload.photosData;
        state.nextPageUrl = action.payload.pagination.nextPageUrl;
        state.prevPageUrl = action.payload.pagination.prevPageUrl;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default photosSlice.reducer;
