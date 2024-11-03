'use client';

import Image from 'next/image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { FavoritePhoto } from '../redux/favorites/types';
import { addToFavorites, removeFromFavorites } from '../redux/favorites/favoritesSlice';
import { Heart, Sparkles, Star } from 'lucide-react';

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
        className="group relative m-2.5 w-[350px] cursor-pointer rounded-[5px] bg-customBackground p-[5px] text-center transition-shadow transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
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
            <div
              className={`absolute right-2 top-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${isFavorite ? 'opacity-100' : ''}`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorite ? handleRemoveFromFavorites() : handleAddToFavorites();
                }}
              >
                <Star
                  size={25}
                  color="white"
                  strokeWidth={1.25}
                  className="transition-all duration-500 hover:scale-125"
                />
              </button>
            </div>
          </div>
        )}
        {copyright && <span className="text-[10px]">{copyright}</span>}
        <span className="text-[10px]">{date}</span>
      </div>
    );
  },
);

PhotoCard.displayName = 'PhotoCard';
export default PhotoCard;
