import { InitialPhoto, Photo } from './types';

export const getPhotoDetails = (photo: Photo | InitialPhoto) => ({
  id: 'nasa_id' in photo ? photo.nasa_id : `${photo.date}-${photo.url.split('/').pop()}`,
  title: photo.title,
  imageSrc: 'url' in photo ? photo.url : photo.fullImageLink || photo.imageLink,
  description: 'description' in photo ? photo.description : photo.explanation,
  date_created: 'date_created' in photo ? photo.date_created : photo.date,
  center: 'center' in photo ? photo.center : null,
  copyright: 'copyright' in photo ? photo.copyright : null,
});
