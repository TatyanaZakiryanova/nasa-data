import { createAsyncThunk } from '@reduxjs/toolkit';

import { extractPaginationLinks, extractPhotosData } from '@/app/redux/photos/utils';

import { ApiResponse, FetchPhotosParams } from './types';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (params: FetchPhotosParams, { rejectWithValue }) => {
    const { searchValue, url } = params;

    const requestUrl =
      url || `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`;

    const finalUrl = requestUrl.replace(/^http:\/\//, 'https://');

    try {
      const response = await fetch(finalUrl);
      const data: ApiResponse = await response.json();
      return {
        photosData: extractPhotosData(data.collection.items),
        pagination: extractPaginationLinks(data.collection.links),
        totalItems: data.collection.metadata?.total_hits || 0,
      };
    } catch {
      return rejectWithValue('API Error');
    }
  },
);
