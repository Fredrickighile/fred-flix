
import './css/App.css'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Favourite from './pages/Favourite'
import Navbar from './Components/Navbar';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <MovieProvider>
      <Navbar/>
        <main className='main-content'>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/favourites" element={<Favourite/>} />
      </Routes>
    </main>
    </MovieProvider>
  
  );
}







export default App
