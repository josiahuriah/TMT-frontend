import React, { useState } from 'react';
import {useNavigate, Link, NavLink} from 'react-router-dom';
import TMTLogo from '/assets/logo3.png';
import MenuIcon from '/assets/menu-icon.png';
import { Button } from "@/components/ui/button"

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

        return(
            <header className="header">
            <Link to="/">
                <img src={TMTLogo} alt="Logo" className="logo" />
            </Link>
            <div className="header-menu-toggle">
                <img
                    src={MenuIcon}
                    alt="Menu"
                    className="menu-icon"
                    onClick={toggleMenu} // Click to toggle menu
                />
                <div className={`header-menu ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/" className="header-item" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/rental" className="header-item" onClick={toggleMenu}>Car Rentals</NavLink>
                    <NavLink to="/about-us" className="header-item" onClick={toggleMenu}>About Us</NavLink>
                    <NavLink to="/contact" className="header-item" onClick={toggleMenu}>Contact</NavLink>
                    <NavLink to="/admin" className="header-item" onClick={toggleMenu}>Admin</NavLink>
                </div>
            </div>
            <Button
                className="cta-button"
                onClick={() => navigate('/rental')}
            >
                Book
            </Button>
        </header>
);
}

export default Header