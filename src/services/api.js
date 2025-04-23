// const Api_Key = "184ed192d8a916574b779bfd3344513e"
// const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


//sending a request to this api
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

const data = await response.json()
return data.results
 
};

export const SearchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  

const data = await response.json()
return data.results

};