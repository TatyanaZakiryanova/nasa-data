'use client';

import React from 'react';

import Button from './button';

interface PaginationProps {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  fetchData: (url: string) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ prevPageUrl, nextPageUrl, fetchData, loading }) => {
    return (
      <div className="mt-2.5 flex justify-center">
        <Button
          onClick={() => {
            if (prevPageUrl) {
              fetchData(prevPageUrl);
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
              fetchData(nextPageUrl);
            }
          }}
          disabled={!nextPageUrl || loading}
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
