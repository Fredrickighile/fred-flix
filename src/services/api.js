const API_KEY  = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const get = async (path) => {
  const res  = await fetch(`${BASE_URL}${path}${path.includes('?') ? '&' : '?'}api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

/* ── Movies ── */
export const getPopularMovies = async () => (await get('/movie/popular')).results;

export const SearchMovies = async (query) =>
  (await get(`/search/movie?query=${encodeURIComponent(query)}`)).results;

export const getMoviesByGenre = async (genreId) =>
  (await get(`/discover/movie?with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=500`)).results;

export const getMovieDetails = async (id) => {
  const [details, credits, videos] = await Promise.all([
    get(`/movie/${id}`),
    get(`/movie/${id}/credits`),
    get(`/movie/${id}/videos`),
  ]);
  return { details, credits, videos };
};

export const getSimilarMovies = async (id) =>
  (await get(`/movie/${id}/similar`)).results;

/* ── TV Series ── */
export const getPopularTV = async () => (await get('/tv/popular')).results;

export const SearchTV = async (query) =>
  (await get(`/search/tv?query=${encodeURIComponent(query)}`)).results;

export const getTVByGenre = async (genreId) =>
  (await get(`/discover/tv?with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=200`)).results;

export const getTVDetails = async (id) => {
  const [details, credits, videos] = await Promise.all([
    get(`/tv/${id}`),
    get(`/tv/${id}/credits`),
    get(`/tv/${id}/videos`),
  ]);
  return { details, credits, videos };
};

export const getSimilarTV = async (id) =>
  (await get(`/tv/${id}/similar`)).results;
