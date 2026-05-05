import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import '../css/MovieCard.css';

export function getVibe(rating) {
  if (rating >= 8.0) return { verdict: 'Must watch', cls: 'vibe-fire' };
  if (rating >= 7.0) return { verdict: 'Worth it',   cls: 'vibe-solid' };
  if (rating >= 6.0) return { verdict: 'Decent',     cls: 'vibe-solid' };
  if (rating >= 5.0) return { verdict: 'Maybe',      cls: 'vibe-meh' };
  return                    { verdict: 'Skip it',     cls: 'vibe-skip' };
}

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorite, isFavorite } = useMovieContext();
  const fav     = isFavorite(movie.id);
  const rating  = movie.vote_average || 0;
  const vibe    = getVibe(rating);
  const isTV    = movie.media_type === 'tv' || !!movie.first_air_date;
  const title   = movie.title || movie.name || 'Untitled';
  const year    = (movie.release_date || movie.first_air_date || '').substring(0, 4);
  const poster  = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const linkTo = isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fav ? removeFromFavorite(movie.id) : addToFavorites({ ...movie, _isTV: isTV });
  };

  return (
    <Link to={linkTo} className="movie-card">
      <div className="poster-wrap">
        {poster
          ? <img src={poster} alt={title} className="movie-poster" loading="lazy" />
          : <div className="poster-fallback">🎬</div>
        }

        {isTV && <span className="tv-badge">Series</span>}

        <div className="rating-pill">
          <span className="rating-star">★</span>
          {rating ? rating.toFixed(1) : 'N/A'}
        </div>

        <button className={`fav-btn ${fav ? 'is-fav' : ''}`} onClick={handleFav} aria-label="Save">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <div className="card-info">
        <div className="card-title" title={title}>{title}</div>
        <div className="card-bottom">
          <span className="card-year">{year || '—'}</span>
          <span className={`card-verdict ${vibe.cls}`}>{vibe.verdict}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
