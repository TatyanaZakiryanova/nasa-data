'use client';

import Image from 'next/image';
import React from 'react';

interface PhotoCardProps {
  title: string;
  imageUrl?: string;
  date: string;
  copyright?: string;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = React.memo(
  ({ title, imageUrl, date, copyright, onClick }) => {
    return (
      <div
        className="m-2.5 w-[350px] rounded-[5px] bg-customBackground p-[5px] text-center transition-shadow transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
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
      </div>
    );
  },
);

PhotoCard.displayName = 'PhotoCard';
export default PhotoCard;
