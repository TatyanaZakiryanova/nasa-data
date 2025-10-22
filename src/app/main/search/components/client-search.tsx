'use client';

import { Provider } from 'react-redux';

import { store } from '@/app/redux/store';

import { Photo } from '../types';
import Search from './search';

interface ClientSearchProps {
  initialPhotos: Photo[];
}

export default function ClientSearch({ initialPhotos }: ClientSearchProps) {
  return (
    <Provider store={store}>
      <Search initialPhotos={initialPhotos} />
    </Provider>
  );
}
