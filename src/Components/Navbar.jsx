import React from "react";
import './CSS/Navbar.css'
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar-container">
                <Link to='/'><h1>Movie Centre</h1></Link>
                <div className="options-container">
                    <Link to='/movie'><h3>Movies</h3></Link>
                    <Link to='/tv'><h3>TV Series</h3></Link>
                    <Link to='/favorites'><h3>Favorites</h3></Link>
                </div>
            </div>
        )    
    }
}

export default Navbar;