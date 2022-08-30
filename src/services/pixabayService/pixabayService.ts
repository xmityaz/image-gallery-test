import {
  ImageResponse,
  PixabayImageRequest,
  PIXABAY_API_KEY,
} from './pixabayConstants';

export type MinimlPixabeyRequest = Pick<
  PixabayImageRequest,
  'q' | 'page' | 'per_page'
>;

const getSearchParams = ({q, page, per_page}: MinimlPixabeyRequest = {}) => {
  return new URLSearchParams({
    key: PIXABAY_API_KEY,
    q,
    page: page?.toString(),
    per_page: per_page?.toString(),
  }).toString();
};

class PixabayService {
  private handlePixabayHttpError = (e: Response) => {
    throw new Error(e.statusText);
  };

  searchImages = async (params: MinimlPixabeyRequest) => {
    try {
      const rawResponse = await fetch(
        `https://pixabay.com/api/?${getSearchParams(params)}`
      );
      const response: ImageResponse = await rawResponse.json();
      return response;
    } catch (e) {
      this.handlePixabayHttpError(e);
    }
  };
}

export const pixabayService = new PixabayService();
