import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { SearchMovies, getPopularMovies } from "../services/Api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Error loading popular movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setSearchPerformed(true);
    
    try {
      const searchResults = await SearchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error("Error searching movies:", err);
      setError("Failed to search movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchPerformed(false);
    setLoading(true);
    
    // Reload popular movies
    getPopularMovies()
      .then(popularMovies => {
        setMovies(popularMovies);
        setError(null);
      })
      .catch(err => {
        console.error("Error reloading popular movies:", err);
        setError("Failed to load movies. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">Movie Explorer</h1>
        <p className="home-subtitle">
          {searchPerformed 
            ? `Search results for "${searchQuery}"` 
            : "Discover popular movies"}
        </p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search movies"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="search-button" disabled={loading || !searchQuery.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
        {searchPerformed && (
          <button type="button" className="reset-button" onClick={handleClearSearch}>
            Show Popular
          </button>
        )}
      </form>

      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span> {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No movies found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}

export default Home;