'use client';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuth } from '@/app/contexts/auth-context';
import { db } from '@/app/lib/firebase';
import { setFavorites } from '@/app/redux/favorites/favoritesSlice';
import { FavoritePhoto } from '@/app/redux/favorites/types';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import Modal from '@/app/ui/modal';
import PhotoCard from '@/app/ui/photo-card';
import PhotoModal from '@/app/ui/photo-modal';

export default function PhotoCollection() {
  const { user } = useAuth();
  const [selectedPhoto, setSelectedPhoto] = useState<FavoritePhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const favoritesPhotos = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const fetchFavorites = async () => {
    if (user) {
      const favoritesSnapshot = await getDocs(collection(db, `users/${user.uid}/favorites`));

      const favoritesIDs = favoritesSnapshot.docs.map((doc) => doc.id);

      const favoritesData = await Promise.all(
        favoritesIDs.map(async (id) => {
          const photoDoc = await getDoc(doc(db, `users/${user.uid}/favorites`, id));
          if (photoDoc.exists()) {
            const data = { id: photoDoc.id, ...photoDoc.data() } as FavoritePhoto;
            return data;
          }
          return null;
        }),
      );
      const filteredData = favoritesData.filter((item): item is FavoritePhoto => item !== null);
      dispatch(setFavorites(filteredData));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

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
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader className="animate-spin p-2" size={40} />
            <p className="text-sm">Photos are loading...</p>
          </div>
        ) : favoritesPhotos.length > 0 ? (
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
