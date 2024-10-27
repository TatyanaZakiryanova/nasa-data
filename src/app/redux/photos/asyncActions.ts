import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiResponse } from '@/app/dashboard/search/types';
import { extractPaginationLinks, extractPhotosData } from '@/app/redux/photos/utils';

import { FetchPhotosParams } from './types';

// fetchPhotos делает запрос на получение фото по введённому значению searchValue.
// Если передан URL для пагинации, запрос выполняется по нему

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (params: FetchPhotosParams, { rejectWithValue }) => {
    const { searchValue, url } = params;

    const requestUrl =
      url || `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`;

    // API возвращает ссылки для пагинации с 'http'. Делаем замену на 'https',
    // чтобы исключить двойной запрос с редиректом
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
