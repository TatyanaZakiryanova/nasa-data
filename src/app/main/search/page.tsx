import ClientSearch from './components/client-search';
import { Photo } from './types';

export default async function SearchPage() {
  const mediaType = 'image';
  const pageSize = 10;

  const resMeta = await fetch(
    `https://images-api.nasa.gov/search?q=galaxy&media_type=${mediaType}`,
    {
      cache: 'no-store',
    },
  );

  if (!resMeta.ok) throw new Error('Failed to fetch total hits');
  const metaData = await resMeta.json();

  const totalHits = metaData.collection.metadata?.total_hits ?? 0;
  if (totalHits === 0) throw new Error('No images found');

  const maxPage = Math.ceil(totalHits / pageSize);

  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  const res = await fetch(
    `https://images-api.nasa.gov/search?q=galaxy&media_type=${mediaType}&page=${randomPage}&page_size=${pageSize}`,
    { cache: 'no-store' },
  );

  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();

  const initialPhotos: Photo[] = data.collection.items.map((item: any) => ({
    nasa_id: item.data[0].nasa_id,
    title: item.data[0].title,
    description: item.data[0].description,
    date_created: item.data[0].date_created,
    imageLink: item.links?.[0]?.href ?? '',
  }));

  initialPhotos.sort(() => Math.random() - 0.5);
  return <ClientSearch initialPhotos={initialPhotos} />;
}
