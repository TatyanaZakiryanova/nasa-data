'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import { fetchPhotos } from '@/app/redux/photos/asyncActions';
import { Status } from '@/app/redux/photos/types';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import Pagination from '@/app/ui/pagination';
import PhotoCard from '@/app/ui/photo-card';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { photos, status, totalItems, prevPageUrl, nextPageUrl } = useAppSelector(
    (state) => state.photos,
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = useCallback(() => {
    if (searchValue.trim()) {
      dispatch(fetchPhotos({ searchValue }));
      setIsSearched(true);
    }
  }, [searchValue, dispatch]);

  const searchKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchValue.trim()) {
        dispatch(fetchPhotos({ searchValue }));
        setIsSearched(true);
      }
    },
    [searchValue, dispatch],
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
          loading={status === Status.LOADING}
          className="mb-3 w-full p-3 md:mb-0 md:mr-3 md:w-[400px]"
        >
          <Button
            onClick={handleSearchClick}
            disabled={status === Status.LOADING}
            className="px-5 py-2 md:w-auto"
          >
            {status === Status.LOADING ? 'Searching...' : 'Search'}
          </Button>
        </Input>
      </div>
      {!(status === Status.LOADING) && !isSearched && (
        <p className="flex justify-center">Search for amazing space photos provided by NASA:</p>
      )}
      {status === Status.ERROR && (
        <p className="my-2.5 text-center text-xl">Unable to complete the request</p>
      )}
      {!(status === Status.LOADING) &&
        !(status === Status.ERROR) &&
        isSearched &&
        photos.length === 0 && (
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
      {photos.length > 0 && (
        <Pagination
          prevPageUrl={prevPageUrl}
          nextPageUrl={nextPageUrl}
          loading={status === Status.LOADING}
        />
      )}
    </>
  );
}
