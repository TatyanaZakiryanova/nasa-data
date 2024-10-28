import ClientSearch from './components/client-search';
import { InitialPhoto } from './types';

export default async function SearchPage() {
  //получение подборки начальных фотографий, которая рендерится на стороне сервера
  const API_KEY = process.env.NASA_API_KEY;
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const initialPhotos: InitialPhoto[] = await res.json();

  const filteredPhotos = initialPhotos.filter((photo) => photo.media_type === 'image');

  return <ClientSearch initialPhotos={filteredPhotos} />;
}
