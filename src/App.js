import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MovieList from './Components/MovieList';
import Favorite from './Components/Favorite';
import {BrowserRouter as Router, Route, Routes}  from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<><Banner/><MovieList/></>}/>
        <Route exact path='/favorites' element={<Favorite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
