'use client';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuth } from '@/app/contexts/auth-context';
import { db } from '@/app/lib/firebase';
import { setFavorites } from '@/app/redux/favorites/favoritesSlice';
import { FavoritePhoto } from '@/app/redux/favorites/types';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { Dropdown } from '@/app/ui/dropdown';
import Modal from '@/app/ui/modal';
import PhotoCard from '@/app/ui/photo-card';
import PhotoModal from '@/app/ui/photo-modal';

import { SortOrder } from '../types';
import { sortFavorites } from '../utils';

export default function PhotoCollection() {
  const { user } = useAuth();
  const [selectedPhoto, setSelectedPhoto] = useState<FavoritePhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const favoritesPhotos = useAppSelector((state) => state.favorites.items);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DEFAULT);
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

  const sortedFavorites = sortFavorites(favoritesPhotos, sortOrder);

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
      {loading ? (
        <div className="flex flex-col items-center">
          <Loader className="animate-spin p-2" size={40} />
          <p className="text-sm">Photos are loading...</p>
        </div>
      ) : sortedFavorites.length > 0 ? (
        <>
          <p className="text-xs">{sortedFavorites.length} photos</p>
          <Dropdown
            options={[SortOrder.DEFAULT, SortOrder.NEWEST, SortOrder.OLDEST]}
            currentOption={sortOrder}
            handleOption={(selectedOption) => setSortOrder(selectedOption)}
          />
          <div
            className="flex flex-wrap justify-center rounded-lg py-2"
            style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)' }}
          >
            {sortedFavorites.map((photo) => (
              <PhotoCard
                key={photo.id}
                id={photo.id}
                title={photo.title}
                imageUrl={photo.imageUrl}
                date={photo.date}
                description={photo.description}
                onClick={() => openModal(photo)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="p-2 text-sm">There are no photos in your collection yet.</p>
      )}
      {selectedPhoto && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPhoto.title}>
          <PhotoModal
            id={selectedPhoto.id}
            title={selectedPhoto.title}
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
