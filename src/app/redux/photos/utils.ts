import { CollectionLink, Item, Link, Photo } from '../../dashboard/search/types';

//функция для извлечения данных о фото из ответа API
export const extractPhotosData = (items: Item[]): Photo[] => {
  return (
    items.map((item: Item) => {
      const imageLinkPreview = item.links?.find((link: Link) => link.rel === 'preview')?.href;
      const imageLinkFull =
        item.links?.find((link: Link) => link.rel === 'captions')?.href || imageLinkPreview;

      return {
        title: item.data[0]?.title || 'No title',
        nasa_id: item.data[0]?.nasa_id,
        description: item.data[0]?.description || 'No description',
        imageLink: imageLinkPreview,
        fullImageLink: imageLinkFull,
        date_created: item.data[0]?.date_created || 'Unknown date',
        center: item.data[0]?.center || 'Unknown center',
      };
    }) || []
  );
};

//функция для извлечения ссылок для пагинации из ответа API
export const extractPaginationLinks = (
  links: CollectionLink[],
): { nextPageUrl: string; prevPageUrl: string } => {
  const nextPageUrl = links?.find((link: CollectionLink) => link.rel === 'next')?.href || '';
  const prevPageUrl = links?.find((link: CollectionLink) => link.rel === 'prev')?.href || '';
  return { nextPageUrl, prevPageUrl };
};
