import { Status } from '@/app/redux/photos/types';

import { Photo } from '../types';

interface StatusMessageProps {
  status: Status;
  isSearched: boolean;
  photos: Photo[];
  totalItems: number;
}

export default function StatusMessage({
  status,
  isSearched,
  photos,
  totalItems,
}: StatusMessageProps) {
  if (!isSearched && status !== Status.SUCCESS) {
    return <p className="flex justify-center">Search for amazing space photos provided by NASA:</p>;
  }

  if (status === Status.ERROR) {
    return <p className="my-2.5 text-center text-xl">Unable to complete the request</p>;
  }

  if (isSearched && photos.length === 0 && status !== Status.LOADING) {
    return <p className="my-2.5 text-center text-xl">No photos were found for this request</p>;
  }

  if (photos.length > 0) {
    return <p className="my-2.5 text-center text-sm">Results found: {totalItems}</p>;
  }
  return null;
}
