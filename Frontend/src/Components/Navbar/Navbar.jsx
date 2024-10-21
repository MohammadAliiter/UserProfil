import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing the CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to="/signup" className="nav-link">SignUp</Link></li>
                <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
