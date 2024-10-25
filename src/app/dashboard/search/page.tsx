'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { Item, Link, Photo } from './types';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';

export default function Search() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    setPhotos([]);
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${searchValue}`);
      const data = await response.json();
      const photosData =
        data.collection.items.map((item: Item) => {
          const imageLink = item.links?.find((link: Link) => link.rel === 'preview')?.href;
          return {
            title: item.data[0]?.title || 'No title',
            imageLink,
          };
        }) || [];
      setPhotos(photosData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <div>
        {photos.map((photo, index) => (
          <div key={index}>
            <h3>{photo.title}</h3>
            {photo.imageLink && <img src={photo.imageLink} alt={photo.title} />}
          </div>
        ))}
      </div>
    </>
  );
}
