import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../Images/logoone.png'
import './NavBar.css'

class NavBar extends React.Component {
    render() {
        return ( 
            <nav className="nav" id="navbar">
                <div className="nav-content">
                <img src={logo} className="nav-logo" alt="logo"
                    onClick={<Link to="/"></Link>}
                />
                    <div className="nav-item">
                            <Link to="/find-pitch" className="link">
                                Home 
                            </Link>
                            <Link to="/about" className="link">
                                About
                            </Link>
                            <Link to="/suggest-site" className="link" >
                                Suggest a Site
                            </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar; 