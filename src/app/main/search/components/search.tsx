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

import { InitialPhoto, Photo } from '../types';
import { getPhotoDetails } from '../utils';
import StatusMessage from './status-message';

interface SearchProps {
  initialPhotos: InitialPhoto[];
}

export default function Search({ initialPhotos }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | InitialPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialStatePhotos, setInitialStatePhotos] = useState<InitialPhoto[]>(initialPhotos);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>('');
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

  const openModal = (photo: Photo | InitialPhoto, id: string) => {
    setIsModalOpen(true);
    setSelectedPhoto(photo);
    setSelectedPhotoId(id);
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
            {status === Status.LOADING ? 'Searching...' : 'Search'}
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
        {photos.length > 0
          ? photos.map((photo) => {
              const id = photo.nasa_id;
              return (
                <PhotoCard
                  key={photo.nasa_id}
                  id={photo.nasa_id}
                  title={photo.title}
                  imageUrl={photo.imageLink}
                  center={photo.center}
                  date={photo.date_created}
                  description={photo.description}
                  onClick={() => openModal(photo, id)}
                />
              );
            })
          : status === Status.IDLE &&
            initialStatePhotos.map((initialPhoto) => {
              const id = `${initialPhoto.date}-${initialPhoto.url.split('/').pop()}`;
              return (
                <PhotoCard
                  key={id}
                  id={id}
                  title={initialPhoto.title}
                  imageUrl={initialPhoto.url}
                  copyright={initialPhoto.copyright}
                  date={initialPhoto.date}
                  description={initialPhoto.explanation}
                  onClick={() => openModal(initialPhoto, id)}
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
          <PhotoModal {...getPhotoDetails(selectedPhoto, selectedPhotoId)} />
        </Modal>
      )}
    </>
  );
}
