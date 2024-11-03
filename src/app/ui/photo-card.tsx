'use client';

import Image from 'next/image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { FavoritePhoto } from '../redux/favorites/types';
import { addToFavorites, removeFromFavorites } from '../redux/favorites/favoritesSlice';

interface PhotoCardProps {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  copyright?: string;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = React.memo(
  ({ id, title, imageUrl, date, copyright, onClick }) => {
    const dispatch = useAppDispatch();
    const favoritePhotos = useAppSelector((state) => state.favorites.items);
    const isFavorite = favoritePhotos.some((photo) => photo.id === id);

    const handleAddToFavorites = () => {
      const favoritePhoto: FavoritePhoto = {
        id: id,
        title: title,
        imageUrl: imageUrl,
        date: date,
        copyright: copyright || '',
      };
      dispatch(addToFavorites(favoritePhoto));
    };

    const handleRemoveFromFavorites = () => {
      dispatch(removeFromFavorites(id));
    };

    return (
      <div
        className="m-2.5 w-[350px] cursor-pointer rounded-[5px] bg-customBackground p-[5px] text-center transition-shadow transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
        onClick={onClick}
      >
        <h3 className="mb-1 text-xs">{title}</h3>
        {imageUrl && (
          <div className="relative h-[300px] w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ borderRadius: '5px', objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {copyright && <span className="text-[10px]">{copyright}</span>}
        <span className="text-[10px]">{date}</span>
        {isFavorite ? (
          <button className="text-white" onClick={handleRemoveFromFavorites}>
            Удалить из избранного
          </button>
        ) : (
          <button onClick={handleAddToFavorites}>Добавить в избранное</button>
        )}
      </div>
    );
  },
);

PhotoCard.displayName = 'PhotoCard';
export default PhotoCard;
