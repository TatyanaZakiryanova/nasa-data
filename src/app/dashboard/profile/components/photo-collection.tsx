'use client';

import { useAppSelector } from '@/app/redux/hooks';
import PhotoCard from '@/app/ui/photo-card';

export default function PhotoCollection() {
  const favoritesPhotos = useAppSelector((state) => state.favorites.items);
  return (
    <div className="flex flex-wrap justify-center">
      {favoritesPhotos.length > 0 ? (
        favoritesPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            id={photo.id}
            title={photo.title}
            imageUrl={photo.imageUrl}
            date={photo.date}
          />
        ))
      ) : (
        <p className="text-sm">There are no photos in your collection yet.</p>
      )}
    </div>
  );
}
