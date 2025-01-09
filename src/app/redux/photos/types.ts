import { Photo } from '@/app/main/search/types';

export interface FetchPhotosParams {
  searchValue?: string;
  url?: string;
}

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PhotosState {
  photos: Photo[];
  totalItems: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  status: Status;
}
