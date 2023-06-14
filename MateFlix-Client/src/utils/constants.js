import Api from "./api";

export const API_KEY = "154d84a158a843a075436d91b6ac8162";
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


const tmdb =  new Api({
    baseUrl: TMDB_BASE_URL,
    searchParams: { api_key: API_KEY },
})

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const ImageSizes = {
  poster: 'w500',
  card: 'w300',
  backdrop: 'w1280',
};

export function generateImageUrl(imagePath, size) {
  return `${IMAGE_BASE_URL}/${size}${imagePath}`;
}

export default tmdb;