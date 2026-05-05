import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTVDetails, getSimilarTV } from "../services/api";
import { useMovieContext } from "../context/MovieContext";
import { getVibe } from "../Components/MovieCard";
import MovieCard from "../Components/MovieCard";
import "../css/MovieDetail.css";

function TVDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorite, isFavorite } = useMovieContext();

  const [data,    setData]    = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    Promise.all([getTVDetails(id), getSimilarTV(id)])
      .then(([d, s]) => { setData(d); setSimilar(s.slice(0, 6)); setError(null); })
      .catch(() => setError('Could not load this series.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="detail-loading">
      <div className="spinner" />
      <span>Loading…</span>
    </div>
  );

  if (error) return (
    <div className="detail-error">
      <p>{error}</p>
      <button onClick={() => navigate(-1)}>← Go back</button>
    </div>
  );

  const { details, credits, videos } = data;
  const fav     = isFavorite(details.id);
  const vibe    = getVibe(details.vote_average || 0);
  const cast    = credits.cast?.slice(0, 8) || [];
  const trailer = videos.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const backdrop= details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : null;
  const poster  = details.poster_path   ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : null;
  const year    = details.first_air_date?.substring(0, 4) || '';
  const seasons = details.number_of_seasons;

  const handleFav = () => {
    const show = {
      id: details.id,
      name: details.name,
      title: details.name,
      poster_path: details.poster_path,
      vote_average: details.vote_average,
      first_air_date: details.first_air_date,
      genre_ids: details.genres?.map(g => g.id) || [],
      media_type: 'tv',
    };
    fav ? removeFromFavorite(details.id) : addToFavorites(show);
  };

  return (
    <div className="detail-page">
      {backdrop && (
        <div className="detail-backdrop" style={{ backgroundImage: `url(${backdrop})` }}>
          <div className="backdrop-scrim" />
        </div>
      )}

      <div className="detail-content">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-main">
          <div className="detail-poster-col">
            {poster
              ? <img src={poster} alt={details.name} className="detail-poster" />
              : <div className="detail-poster-fallback">📺</div>
            }
          </div>

          <div className="detail-info">
            <div className="detail-badges">
              {year    && <span className="detail-badge">{year}</span>}
              {seasons && <span className="detail-badge">{seasons} season{seasons > 1 ? 's' : ''}</span>}
              <span className="detail-badge" style={{ color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.3)', background: 'var(--gold-dim)' }}>Series</span>
              <span className="detail-badge gold">{vibe.verdict}</span>
            </div>

            <h1 className="detail-title">{details.name}</h1>
            {details.tagline && <p className="detail-tagline">"{details.tagline}"</p>}

            <div className="detail-score">
              <div className="score-ring">
                <span className="score-num">{details.vote_average?.toFixed(1)}</span>
                <span className="score-out-of">/ 10</span>
              </div>
              <div className="score-meta">
                <span className="score-verdict">{vibe.verdict}</span>
                <span className="score-votes">{details.vote_count?.toLocaleString()} ratings</span>
              </div>
            </div>

            {details.genres?.length > 0 && (
              <div className="detail-genres">
                {details.genres.map(g => <span key={g.id} className="genre-tag">{g.name}</span>)}
              </div>
            )}

            {details.overview && <p className="detail-overview">{details.overview}</p>}

            <div className="detail-actions">
              <button className={`btn-fav ${fav ? 'is-fav' : ''}`} onClick={handleFav}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {fav ? 'Saved' : 'Save to favourites'}
              </button>
              {trailer && (
                <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" className="btn-trailer">
                  ▶ Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section-title">Cast</h2>
            <div className="cast-scroll">
              {cast.map(a => (
                <div key={a.id} className="cast-card">
                  {a.profile_path
                    ? <img src={`https://image.tmdb.org/t/p/w185${a.profile_path}`} alt={a.name} className="cast-photo" />
                    : <div className="cast-initial">{a.name.charAt(0)}</div>
                  }
                  <p className="cast-name">{a.name}</p>
                  <p className="cast-role">{a.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section-title">You might also like</h2>
            <div className="similar-grid">
              {similar.map(m => <MovieCard movie={{ ...m, media_type: 'tv' }} key={m.id} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TVDetail;
