import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favorite from './Components/Favorite';
import {BrowserRouter as Router, Route, Routes, Navigate}  from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Navigate to={'/movie'} replace/>}/>
        <Route exact path='/tv' element={<><Banner type='tv'/><List type='tv'/></>}/>
        <Route exact path='/movie' element={<><Banner type='movie'/><List type='movie'/></>}/>
        <Route exact path='/favorites' element={<Favorite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
