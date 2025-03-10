export interface InitialPhoto {
  id: string;
  title: string;
  url: string;
  copyright: string;
  date: string;
  media_type: string;
  explanation: string;
}

export interface Photo {
  title: string;
  nasa_id: string;
  description: string;
  imageLink?: string;
  fullImageLink?: string;
  date_created: string;
  center: string;
}
