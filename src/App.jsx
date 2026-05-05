import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Home        from './pages/Home'
import Favourite   from './pages/Favourite'
import MovieDetail from './pages/MovieDetail'
import TVDetail    from './pages/TVDetail'
import Navbar      from './Components/Navbar'
import Footer      from './Components/Footer'
import { MovieProvider } from './context/MovieContext'

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"            element={<Home />}        />
          <Route path="/favourites"  element={<Favourite />}   />
          <Route path="/movie/:id"   element={<MovieDetail />} />
          <Route path="/tv/:id"      element={<TVDetail />}    />
        </Routes>
      </main>
      <Footer />
    </MovieProvider>
  );
}

export default App;
