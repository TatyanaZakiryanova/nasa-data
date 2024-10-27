'use client';

import React from 'react';

import { useAppDispatch } from '../redux/hooks';
import { fetchPhotos } from '../redux/photos/asyncActions';
import Button from './button';

interface PaginationProps {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ prevPageUrl, nextPageUrl, loading }) => {
    const dispatch = useAppDispatch();

    return (
      <div className="mt-2.5 flex justify-center">
        <Button
          onClick={() => {
            if (prevPageUrl) {
              dispatch(fetchPhotos({ url: prevPageUrl }));
            }
          }}
          disabled={!prevPageUrl || loading}
          className="mr-2 w-28 px-4 py-2 text-center"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (nextPageUrl) {
              dispatch(fetchPhotos({ url: nextPageUrl }));
            }
          }}
          disabled={!nextPageUrl}
          className="w-28 px-4 py-2 text-center"
        >
          Next
        </Button>
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';
export default Pagination;
