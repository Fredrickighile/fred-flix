import MovieCard from "../Components/MovieCard";
import { useState, useEffect } from "react";
import {
  getPopularMovies, SearchMovies, getMoviesByGenre,
  getPopularTV, SearchTV, getTVByGenre,
} from "../services/api";
import "../css/Home.css";

const MOVIE_MOODS = [
  { label: "Action",    genre: 28    },
  { label: "Comedy",    genre: 35    },
  { label: "Horror",    genre: 27    },
  { label: "Drama",     genre: 18    },
  { label: "Sci-Fi",    genre: 878   },
  { label: "Thriller",  genre: 53    },
  { label: "Animation", genre: 16    },
  { label: "Romance",   genre: 10749 },
];

const TV_MOODS = [
  { label: "Action",    genre: 10759 },
  { label: "Comedy",    genre: 35    },
  { label: "Crime",     genre: 80    },
  { label: "Drama",     genre: 18    },
  { label: "Sci-Fi",    genre: 10765 },
  { label: "Mystery",   genre: 9648  },
  { label: "Animation", genre: 16    },
  { label: "Reality",   genre: 10764 },
];

function Home() {
  const [type,      setType]      = useState('movie');
  const [query,     setQuery]     = useState('');
  const [movies,    setMovies]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeMood,setActiveMood]= useState(null);
  const [searched,  setSearched]  = useState(false);

  const moods = type === 'movie' ? MOVIE_MOODS : TV_MOODS;

  useEffect(() => { loadTrending(); }, [type]);

  const loadTrending = async () => {
    setLoading(true);
    setActiveMood(null);
    setSearched(false);
    setQuery('');
    setError(null);
    try {
      const data = type === 'movie' ? await getPopularMovies() : await getPopularTV();
      setMovies(data);
    } catch {
      setError('Could not load titles. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setSearched(true);
    setActiveMood(null);
    setError(null);
    try {
      const data = type === 'movie'
        ? await SearchMovies(query)
        : await SearchTV(query);
      setMovies(data);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMood = async (mood) => {
    if (activeMood === mood.genre) { loadTrending(); return; }
    setLoading(true);
    setActiveMood(mood.genre);
    setSearched(false);
    setQuery('');
    setError(null);
    try {
      const data = type === 'movie'
        ? await getMoviesByGenre(mood.genre)
        : await getTVByGenre(mood.genre);
      setMovies(data);
    } catch {
      setError('Could not load this genre.');
    } finally {
      setLoading(false);
    }
  };

  const sectionLabel = searched
    ? `Results for "${query}"`
    : activeMood
    ? (moods.find(m => m.genre === activeMood)?.label ?? 'Genre') + (type === 'tv' ? ' Series' : ' Films')
    : type === 'movie' ? 'Trending films' : 'Trending series';

  return (
    <div className="home">
      <div className="home-hero">
        <p className="home-eyebrow">Your personal cinema guide</p>
        <h1 className="home-title">
          Know before<br />you <em>watch.</em>
        </h1>
        <p className="home-sub">Every title rated honestly. No more 2-hour regrets.</p>

        {/* Movies / Series toggle */}
        <div className="type-toggle">
          <button
            className={`type-btn ${type === 'movie' ? 'active' : ''}`}
            onClick={() => setType('movie')}
          >Films</button>
          <button
            className={`type-btn ${type === 'tv' ? 'active' : ''}`}
            onClick={() => setType('tv')}
          >Series</button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder={type === 'movie' ? 'Search any film…' : 'Search any series…'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="search-clear" onClick={() => setQuery('')}>×</button>
          )}
          <button type="submit" className="search-btn" disabled={loading || !query.trim()}>
            Search
          </button>
        </form>

        {/* Mood pills */}
        <p className="moods-label">What are you in the mood for?</p>
        <div className="moods-row">
          {moods.map(m => (
            <button
              key={m.genre}
              className={`mood-pill ${activeMood === m.genre ? 'active' : ''}`}
              onClick={() => handleMood(m)}
            >{m.label}</button>
          ))}
        </div>
      </div>

      <hr className="home-divider" />

      {error && <div className="error-bar">{error}</div>}

      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" />
          <span>Loading…</span>
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="section-head">
            <span className="section-title">{sectionLabel}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="section-count">{movies.length} titles</span>
              {(searched || activeMood) && (
                <button className="reset-link" onClick={loadTrending}>
                  Back to trending
                </button>
              )}
            </div>
          </div>
          <div className="movies-grid">
            {movies.map(m => <MovieCard movie={m} key={m.id} />)}
          </div>
        </>
      ) : (
        <div className="no-results">Nothing found. Try a different search.</div>
      )}
    </div>
  );
}

export default Home;
