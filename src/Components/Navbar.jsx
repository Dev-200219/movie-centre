import React from "react";
import './Navbar.css'

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar-container">
                <h1 className="m-2">Movie Centre</h1>
                <h3 className="m-2 ms-3">Favorites</h3>
            </div>
        )    
    }
}

export default Navbar;