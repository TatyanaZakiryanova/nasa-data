'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import Button from '@/app/ui/button';
import Input from '@/app/ui/input';

import { Photo } from './types';
import PhotoCard from '@/app/ui/photo-card';
import { extractPhotosData } from './utils/utils';

export default function Search() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchData = useCallback(
    async (
      url: string = `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`,
    ) => {
      setLoading(true);
      setError(false);
      setPhotos([]);
      setIsSearched(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        const photosData = extractPhotosData(data.collection.items);
        const totalItems = data.collection.metadata?.total_hits || 0;
        setPhotos(photosData);
        setTotalItems(totalItems);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [searchValue],
  );

  const searchKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        fetchData();
      }
    },
    [fetchData],
  );

  return (
    <>
      <div className="mb-5 flex flex-col justify-center md:flex-row">
        <Input
          id="Search-input"
          name="Search"
          inputValue={searchValue}
          handleInput={handleSearch}
          searchKey={searchKey}
          loading={loading}
          className="mb-3 w-full p-3 md:mb-0 md:mr-3 md:w-[400px]"
        >
          <Button onClick={fetchData} disabled={loading} className="px-5 py-2 md:w-auto">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Input>
      </div>
      {!loading && !isSearched && (
        <p className="flex justify-center">Search for amazing space photos provided by NASA:</p>
      )}
      {error && <p className="my-2.5 text-center text-xl">Unable to complete the request</p>}
      {!loading && !error && isSearched && photos.length === 0 && (
        <p className="my-2.5 text-center text-xl">No photos were found for this request</p>
      )}
      {photos.length > 0 && (
        <p className="my-2.5 text-center text-sm">Results found: {totalItems}</p>
      )}
      <div className="mt-5 flex flex-wrap justify-center">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.nasa_id}
            title={photo.title}
            imageUrl={photo.imageLink}
            date={photo.date_created}
          />
        ))}
      </div>
    </>
  );
}
