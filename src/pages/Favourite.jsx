import React, { useState } from 'react';
import "../css/Favorites.css";
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../Components/MovieCard';

function Favorites() {
  const { favorites, removeFromFavorite } = useMovieContext();

  const [sortOrder, setSortOrder] = useState('added'); // 'added', 'title', 'rating'
  
  const getSortedFavorites = () => {
    if (!favorites || favorites.length === 0) return [];
    
    const sortedList = [...favorites];
    
    switch(sortOrder) {
      case 'title':
        return sortedList.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sortedList.sort((a, b) => b.vote_average - a.vote_average);
      case 'added':
      default:
        return sortedList; // Assuming the list is already in order of addition
    }
  };
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favorites.forEach(movie => removeFromFavorite(movie.id));
    }
  };
  
  if (favorites && favorites.length > 0) {
    const sortedFavorites = getSortedFavorites();
    
    return (
      <div className="favorites">
        <div className="favorites-header">
          <h2>Your Favorites</h2>
          <p className="favorites-count">{favorites.length} movie{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        
        <div className="favorites-controls">
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="added">Recently Added</option>
              <option value="title">Title (A-Z)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
          
          <button onClick={handleClearAll} className="clear-favorites-btn">
            Clear All
          </button>
        </div>
        
        <div className="movies-grid">
          {sortedFavorites.map((movie, index) => (
            <div 
              className="favorite-card-wrapper" 
              key={movie.id}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MovieCard movie={movie} key={movie.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="favorites-empty">
      <div className="empty-icon">❤️</div>
      <h2>No favorite movies yet</h2>
      <p>Start adding movies to your favorites and they will appear here.</p>
      <a href="/" className="browse-movies-btn">Browse Popular Movies</a>
    </div>
  );
}

export default Favorites;