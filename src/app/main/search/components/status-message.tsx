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
  switch (true) {
    case !isSearched && status !== Status.SUCCESS && status !== Status.LOADING:
      return (
        <p className="sm:text-md flex justify-center text-sm">
          Search for amazing space photos provided by NASA:
        </p>
      );
    case status === Status.ERROR:
      return (
        <p className="sm:text-md my-2.5 text-center text-sm">Unable to complete the request</p>
      );
    case isSearched && photos.length === 0 && status !== Status.LOADING:
      return (
        <p className="sm:text-md my-2.5 text-center text-sm">
          No photos were found for this request
        </p>
      );
    case photos.length > 0:
      return <p className="sm:text-md my-2.5 text-center text-sm">Results found: {totalItems}</p>;
    default:
      return null;
  }
}
