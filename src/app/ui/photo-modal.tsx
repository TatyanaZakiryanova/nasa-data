import { Loader, Star, StarOff } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import { useAuth } from '../context/auth-context';
import useFavorites from '../hooks/use-favorites';
import { FavoritePhoto } from '../redux/favorites/types';
import Button from './button';

interface PhotoModalProps {
  id: string;
  title: string;
  imageSrc?: string;
  description: string;
  date_created: string;
  center: string | null;
  copyright: string | null;
}

const PhotoModal: React.FC<PhotoModalProps> = React.memo(
  ({ id, title, imageSrc, description, date_created, center, copyright }) => {
    const { user } = useAuth();
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    const photo: FavoritePhoto = {
      id,
      title,
      imageUrl: imageSrc || '',
      date: date_created,
      copyright: copyright || '',
      center: center || '',
      description,
    };

    const { isFavorite, handleToggleFavorite } = useFavorites({ photo });

    return (
      <>
        {!isImageLoaded && <Loader className="animate-spin p-2" size={40} />}
        <img
          src={imageSrc}
          alt="Full size"
          className="mb-1 rounded-sm object-contain"
          onLoad={() => setIsImageLoaded(true)}
        />
        {user && (
          <Button onClick={handleToggleFavorite} className="my-3 w-48 text-sm">
            {!isFavorite ? (
              <p className="flex items-center justify-center gap-2 p-2">
                Add to favorites
                <Star size={22} color="white" strokeWidth={1.25} />
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2 p-2">
                Remove from favorites
                <StarOff size={22} color="white" strokeWidth={1.25} />
              </p>
            )}
          </Button>
        )}
        <span className="mb-1 text-[10px]">{date_created.replace('T', ', ').replace('Z', '')}</span>
        <span className="mb-1 text-[10px]">{center ? `Center: ${center}` : null}</span>
        <span className="mb-1 text-[10px]">{copyright}</span>
        <p>{description}</p>
      </>
    );
  },
);

PhotoModal.displayName = 'PhotoModal';
export default PhotoModal;
