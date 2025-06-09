import React from "react";
import '../styles/header.css';

export const Header = () => {
    return (
        <header>
            <h1>Bienvenidos a UNIR CINEMAS</h1>
            <div className="header-text">
                <h2>YELMO UNIR-CINEMA MAX</h2>
            </div>
            <div className="bloqueVacio"></div>
        </header>
    );
}