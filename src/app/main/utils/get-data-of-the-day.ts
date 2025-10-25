import { Photo } from '../search/types';

export const getDataOfTheDay = async (): Promise<Photo> => {
  const pageSize = 1;
  const topics = [
    'galaxy',
    'nebula',
    'mars',
    'earth',
    'telescope',
    'astronaut',
    'moon',
    'supernova',
    'space',
  ];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const metaRes = await fetch(
    `https://images-api.nasa.gov/search?q=${randomTopic}&media_type=image`,
    {
      cache: 'no-store',
    },
  );

  if (!metaRes.ok) throw new Error('Failed to fetch total hits');
  const metaData = await metaRes.json();
  const totalHits = metaData.collection.metadata?.total_hits ?? 0;
  const maxPage = Math.ceil(totalHits / pageSize);

  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const randomPage = (seed % maxPage) + 1;

  const res = await fetch(
    `https://images-api.nasa.gov/search?q=${randomTopic}&media_type=image&page=${randomPage}&page_size=${pageSize}`,
    { next: { revalidate: 86400 } }, // 24 часа
  );

  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();

  const item = data.collection.items[0];

  return {
    nasa_id: item.data[0].nasa_id,
    title: item.data[0].title,
    description: item.data[0].description,
    date_created: item.data[0].date_created,
    imageLink: item.links?.[0]?.href ?? '',
  };
};
