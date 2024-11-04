import { unstable_cache } from 'next/cache';
import Image from 'next/image';

interface NASAData {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}

//получение фотографии/видео дня на стороне сервера
const API_KEY = process.env.NASA_API_KEY;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const getDataOfTheDay = unstable_cache(
  async (): Promise<NASAData> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: NASAData = await response.json();

    return data;
  },
  ['data-of-the-day'],
  { revalidate: 86400 }, //кэширование результата на сутки
);

export default async function DataOfTheDay() {
  const data = await getDataOfTheDay();

  const isVideo = data.media_type === 'video';

  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold">{data.title}</h1>
        <h2 className="text-md">{data.date}</h2>
        {isVideo ? (
          <div className="relative h-0 w-full pb-[56.25%]">
            <iframe
              src={data.url}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={data.title}
              className="absolute left-0 top-0 h-full w-full"
            ></iframe>
          </div>
        ) : (
          <div className="relative h-[90vh] w-full">
            <Image src={data.url} alt={data.title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <p>{data.explanation}</p>
      </div>
    </div>
  );
}
