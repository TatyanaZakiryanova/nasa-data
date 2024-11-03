'use client';

import { FavoritePhoto } from '@/app/redux/favorites/types';
import { useAppSelector } from '@/app/redux/hooks';
import Modal from '@/app/ui/modal';
import PhotoCard from '@/app/ui/photo-card';
import PhotoModal from '@/app/ui/photo-modal';
import { useState } from 'react';

export default function PhotoCollection() {
  const [selectedPhoto, setSelectedPhoto] = useState<FavoritePhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const favoritesPhotos = useAppSelector((state) => state.favorites.items);

  const openModal = (photo: FavoritePhoto) => {
    setIsModalOpen(true);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {favoritesPhotos.length > 0 ? (
          favoritesPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              id={photo.id}
              title={photo.title}
              imageUrl={photo.imageUrl}
              date={photo.date}
              description={photo.description}
              onClick={() => openModal(photo)}
            />
          ))
        ) : (
          <p className="text-sm">There are no photos in your collection yet.</p>
        )}
      </div>
      {selectedPhoto && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPhoto.title}>
          <PhotoModal
            imageSrc={selectedPhoto.imageUrl}
            description={selectedPhoto.description}
            date_created={selectedPhoto.date}
            center={selectedPhoto.center}
            copyright={selectedPhoto.copyright}
          />
        </Modal>
      )}
    </>
  );
}
