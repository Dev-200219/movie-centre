import './App.css';
import Navbar from './Components/Navbar';
import MovieBanner from './Components/MovieBanner';
import MovieList from './Components/MovieList';
import Favorite from './Components/Favorite';
import TVList from './Components/TVList';
import TVBanner from './Components/TVBanner';
import {BrowserRouter as Router, Route, Routes, Navigate}  from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Navigate to={'/movie'} replace/>}/>
        <Route exact path='/tv' element={<><TVBanner type='tv'/><TVList type='tv'/></>}/>
        <Route exact path='/movie' element={<><MovieBanner type='movie'/><MovieList type='movie'/></>}/>
        <Route exact path='/favorites' element={<Favorite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
