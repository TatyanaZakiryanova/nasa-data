'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useAuth } from '../contexts/auth-context';
import useFavorites from '../hooks/use-favorites';
import { FavoritePhoto } from '../redux/favorites/types';

interface PhotoCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  date: string;
  copyright?: string;
  center?: string;
  description: string;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = React.memo(
  ({ id, title, imageUrl, date, copyright, center, description, onClick }) => {
    const { user } = useAuth();
    const photo: FavoritePhoto = {
      id,
      title,
      imageUrl: imageUrl || '',
      date,
      copyright: copyright || '',
      center: center || '',
      description,
    };

    const { isFavorite, handleToggleFavorite } = useFavorites({ photo });

    return (
      <div
        className="group relative z-10 m-2.5 w-[350px] cursor-pointer rounded-[5px] bg-customBackground p-[5px] text-center transition-shadow transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
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
            {user && (
              <div
                className={`absolute right-2 top-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${isFavorite ? 'opacity-100' : ''}`}
              >
                <button onClick={handleToggleFavorite}>
                  <Star
                    size={25}
                    color="white"
                    strokeWidth={1.25}
                    className="transition-all duration-500 hover:scale-125"
                  />
                </button>
              </div>
            )}
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
