import { useState } from 'react';
import "../css/Favorites.css";
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../Components/MovieCard';

function Favorites() {
  const { favorites, removeFromFavorite } = useMovieContext();
  const [sort, setSort] = useState('added');

  const getSorted = () => {
    const list = [...(favorites || [])];
    if (sort === 'title')  return list.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
    if (sort === 'rating') return list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    return list;
  };

  const handleClear = () => {
    if (window.confirm('Remove all saved titles?')) {
      favorites.forEach(m => removeFromFavorite(m.id));
    }
  };

  if (!favorites?.length) {
    return (
      <div className="favorites">
        <div className="fav-hero">
          <p className="fav-eyebrow">Your collection</p>
          <h1 className="fav-title">Saved titles</h1>
        </div>
        <div className="fav-empty">
          <span className="empty-glyph">❤</span>
          <h2>Nothing saved yet</h2>
          <p>Browse films and series, then tap the heart to save them here.</p>
          <a href="/" className="browse-btn">Start browsing</a>
        </div>
      </div>
    );
  }

  const sorted = getSorted();
  const fireCount = favorites.filter(m => (m.vote_average || 0) >= 8).length;

  return (
    <div className="favorites">
      <div className="fav-hero">
        <p className="fav-eyebrow">Your collection</p>
        <h1 className="fav-title">Saved titles</h1>
        <p className="fav-subtitle">
          {favorites.length} saved &nbsp;·&nbsp; {fireCount} must-watch
        </p>
      </div>

      <hr className="fav-divider" />

      <div className="fav-controls">
        <div className="sort-controls">
          <span className="sort-lbl">Sort by</span>
          {[['added','Recently added'],['title','A–Z'],['rating','Rating']].map(([val, label]) => (
            <button
              key={val}
              className={`sort-btn ${sort === val ? 'active' : ''}`}
              onClick={() => setSort(val)}
            >{label}</button>
          ))}
        </div>
        <button className="clear-btn" onClick={handleClear}>Clear all</button>
      </div>

      <div className="movies-grid">
        {sorted.map((movie, i) => (
          <div
            key={movie.id}
            className="fav-card-wrap"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
