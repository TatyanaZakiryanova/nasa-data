export interface Photo {
  title: string;
  description: string;
  imageLink?: string;
}

export interface Link {
  href: string;
  rel: string;
  render?: string;
}

export interface DataItem {
  title: string;
  description: string;
}

export interface Item {
  data: DataItem[];
  links: Link[];
}
