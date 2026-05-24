export interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleBook[];
}

export interface GoogleBook {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

export interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  publishedDate?: string;
  imageLinks?: GoogleBookImageLinks;
}

export interface GoogleBookImageLinks {
  thumbnail?: string;
}
