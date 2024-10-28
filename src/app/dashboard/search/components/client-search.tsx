'use client';

import { Provider } from 'react-redux';
import { InitialPhoto } from '../types';
import { store } from '@/app/redux/store';
import Search from './search';

interface ClientSearchProps {
  initialPhotos: InitialPhoto[];
}

export default function ClientSearch({ initialPhotos }: ClientSearchProps) {
  return (
    <Provider store={store}>
      <Search initialPhotos={initialPhotos} />
    </Provider>
  );
}
