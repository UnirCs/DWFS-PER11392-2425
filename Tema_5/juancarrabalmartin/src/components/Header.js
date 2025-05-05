import React from 'react';
import banner from '../assets/banner.jpg';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <img src={banner} alt="Banner" className="banner-image" />
        </header>
    );
};

export default Header;

