import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MovieList from './Components/MovieList';
import Favorite from './Components/Favorite';

function App() {
  return (
    <>
      <Navbar/>
      {/* <Banner/>
      <MovieList/> */}
      <Favorite/>
    </>
  );
}

export default App;
