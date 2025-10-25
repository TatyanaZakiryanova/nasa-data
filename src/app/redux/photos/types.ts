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

export interface Link {
  href: string;
  rel: string;
  render?: string;
}

export interface DataItem {
  title: string;
  nasa_id: string;
  description: string;
  date_created: string;
}

export interface Item {
  data: DataItem[];
  links: Link[];
}

export interface CollectionLink {
  href?: string;
  rel?: string;
}

export interface ApiResponse {
  collection: {
    items: Item[];
    links: CollectionLink[];
    metadata: {
      total_hits: number;
    };
  };
}
