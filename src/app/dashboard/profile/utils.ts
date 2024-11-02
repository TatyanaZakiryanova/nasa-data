import { Timestamp } from 'firebase/firestore';

export const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};
