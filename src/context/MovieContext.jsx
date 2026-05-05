import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites    = (movie) => setFavorites(prev =>
    prev.some(m => m.id === movie.id) ? prev : [...prev, movie]
  );
  const removeFromFavorite = (id) => setFavorites(prev => prev.filter(m => m.id !== id));
  const isFavorite         = (id) => favorites.some(m => m.id === id);

  return (
    <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorite, isFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};
