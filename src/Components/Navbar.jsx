import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar-container">
                <Link to='/' style={{textDecoration:'none', color:'white'}}><h1 className="m-2">Movie Centre</h1></Link>
                <Link to='/favorites' style={{textDecoration:'none', color:'white'}}><h3 className="m-2 ms-3">Favorites</h3></Link>
            </div>
        )    
    }
}

export default Navbar;