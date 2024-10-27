import React from 'react';
import { useState } from 'react';

interface PhotoModalProps {
  imageSrc?: string;
  description: string;
  date_created: string;
  center: string;
}

const PhotoModal: React.FC<PhotoModalProps> = React.memo(
  ({ imageSrc, description, date_created, center }) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    return (
      <>
        {!isImageLoaded && <p>Loading image...</p>}
        <img
          src={imageSrc}
          alt="Full size"
          className="mb-1 rounded-sm object-contain"
          onLoad={() => setIsImageLoaded(true)}
        />
        <span className="mb-1 text-[10px]">{date_created}</span>
        <span className="mb-1 text-[10px]">Center: {center}</span>
        <p>{description}</p>
      </>
    );
  },
);

PhotoModal.displayName = 'PhotoModal';
export default PhotoModal;
