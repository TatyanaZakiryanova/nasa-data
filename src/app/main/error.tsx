'use client';

import Button from '../ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 pt-52">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()} className="px-4 py-2">
        Try again
      </Button>
    </div>
  );
}
