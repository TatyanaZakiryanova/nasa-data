import Image from 'next/image';

import { getDataOfTheDay } from './utils/get-data-of-the-day';

export default async function DataOfTheDay() {
  const data = await getDataOfTheDay();

  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold">{data.title}</h1>
        <h2 className="text-md text-gray-500">
          {data.date_created.replace('T', ', ').replace('Z', '')}
        </h2>
        <div className="relative z-10 w-full" style={{ aspectRatio: '16/9' }}>
          <Image
            src={data.imageLink || ''}
            alt={data.title}
            fill
            style={{ objectFit: 'contain', objectPosition: 'top' }}
          />
        </div>
        <p className="text-sm text-gray-300">{data.description}</p>
      </div>
    </div>
  );
}
