// In a more complex, production, app this constant may be kept in .env variables
// But keep it as is for simplicity
export const PIXABAY_API_KEY = '29564925-b146e97aef096401dca2f6d0d';

export interface PixabayImageRequest {
  key?: string;
  q?: string;
  lang?: string;
  id?: string;
  response_group?: 'image_details' | 'high_resolution';
  image_type?: 'all' | 'photo' | 'illustration' | 'vector';
  orientation?: 'all' | 'horizontal' | 'vertical';
  category?: string;
  min_width?: number;
  min_height?: number;
  editors_choice?: boolean;
  safesearch?: boolean;
  order?: 'popular' | 'latest';
  page?: number;
  per_page?: number;
}

export interface ImageHit {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: number;
}

export interface ImageResponse {
  total: number;
  totalHits: number;
  hits: ImageHit[];
}
