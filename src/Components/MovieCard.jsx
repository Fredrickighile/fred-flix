import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import '../css/MovieCard.css';

function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorite } = useMovieContext();
  
  // Check if movie is already in favorites
  const isFavorite = favorites && favorites.some(fav => fav.id === movie.id);
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation(); // Prevent event bubbling
    
    if (isFavorite) {
      removeFromFavorite(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  
  // Image path handling
  const imagePath = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg'; // Provide a placeholder image
  
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster-container">
        <img 
          src={imagePath} 
          alt={`${movie.title} poster`} 
          className="movie-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-poster.jpg';
          }}
        />
        <div className="movie-overlay">
          <div className="movie-rating">
            <span className="star-icon">★</span>
            <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <button 
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg 
              className="heart-icon" 
              viewBox="0 0 24 24" 
              width="24" 
              height="24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <div className="movie-year">{movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown'}</div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
      </div>
    </Link>
  );
}

export default MovieCard;