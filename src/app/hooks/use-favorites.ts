import { deleteDoc, doc, setDoc } from 'firebase/firestore';

import { useAuth } from '../context/auth-context';
import { db } from '../lib/firebase';
import { addToFavorites, removeFromFavorites } from '../redux/favorites/favoritesSlice';
import { FavoritePhoto } from '../redux/favorites/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface useFavoritesProps {
  photo: FavoritePhoto;
}

export default function useFavorites({ photo }: useFavoritesProps) {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const favoritePhotos = useAppSelector((state) => state.favorites.items);
  const isFavorite = favoritePhotos.some((favoritePhoto) => favoritePhoto.id === photo.id);

  const handleAddToFavorites = async () => {
    const favoritePhoto: FavoritePhoto = {
      id: photo.id,
      title: photo.title,
      imageUrl: photo.imageUrl || '',
      date: photo.date,
      description: photo.description,
    };
    dispatch(addToFavorites(favoritePhoto));

    if (user) {
      const docRef = doc(db, `users/${user.uid}/favorites`, photo.id);
      await setDoc(docRef, favoritePhoto);
    }
  };

  const handleRemoveFromFavorites = async () => {
    dispatch(removeFromFavorites(photo.id));
    if (user) {
      const docRef = doc(db, `users/${user.uid}/favorites`, photo.id);
      await deleteDoc(docRef);
    }
  };

  const handleToggleFavorite = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isFavorite) {
      handleRemoveFromFavorites();
    } else {
      handleAddToFavorites();
    }
  };

  return { isFavorite, handleToggleFavorite };
}
