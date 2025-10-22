'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchPhotos } from '@/app/redux/photos/asyncActions';
import { Status } from '@/app/redux/photos/types';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import Modal from '@/app/ui/modal';
import Pagination from '@/app/ui/pagination';
import PhotoCard from '@/app/ui/photo-card';
import PhotoModal from '@/app/ui/photo-modal';

import { Photo } from '../types';
import StatusMessage from './status-message';

interface SearchProps {
  initialPhotos: Photo[];
}

export default function Search({ initialPhotos }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialStatePhotos, setInitialStatePhotos] = useState<Photo[]>(initialPhotos);
  const dispatch = useAppDispatch();
  const { photos, status, totalItems, prevPageUrl, nextPageUrl } = useAppSelector(
    (state) => state.photos,
  );

  useEffect(() => {
    setInitialStatePhotos(initialPhotos);
  }, [initialPhotos]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = useCallback(() => {
    if (searchValue.trim()) {
      setIsSearched(true);
      dispatch(fetchPhotos({ searchValue }));
    }
  }, [searchValue, dispatch]);

  const searchKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchValue.trim()) {
        setIsSearched(true);
        dispatch(fetchPhotos({ searchValue }));
      }
    },
    [searchValue, dispatch],
  );

  const openModal = (photo: Photo) => {
    setIsModalOpen(true);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="mb-5 flex flex-col justify-center md:flex-row">
        <Input
          id="search"
          name="search"
          inputValue={searchValue}
          handleInput={handleSearch}
          searchKey={searchKey}
          loading={status === Status.LOADING}
          className="mb-3 w-full border-none p-3 md:mb-0 md:mr-3 md:w-[400px]"
        >
          <Button
            onClick={handleSearchClick}
            disabled={status === Status.LOADING || !searchValue}
            className="px-5 py-2 md:w-auto"
          >
            Search
          </Button>
        </Input>
      </div>
      <StatusMessage
        status={status}
        isSearched={isSearched}
        photos={photos}
        totalItems={totalItems}
      />
      <div className="mt-5 flex flex-wrap justify-center">
        {(photos.length > 0 ? photos : initialStatePhotos).map((photo) => {
          const id = photo.nasa_id;
          return (
            <PhotoCard
              key={id}
              id={id}
              title={photo.title}
              imageUrl={photo.imageLink}
              date={photo.date_created}
              description={photo.description}
              onClick={() => openModal(photo)}
            />
          );
        })}
      </div>
      {photos.length > 0 && (
        <Pagination
          prevPageUrl={prevPageUrl}
          nextPageUrl={nextPageUrl}
          loading={status === Status.LOADING}
        />
      )}
      {selectedPhoto && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPhoto.title}>
          <PhotoModal
            id={selectedPhoto.nasa_id}
            title={selectedPhoto.title}
            imageSrc={selectedPhoto.imageLink}
            description={selectedPhoto.description}
            date_created={selectedPhoto.date_created}
          />
        </Modal>
      )}
    </>
  );
}
