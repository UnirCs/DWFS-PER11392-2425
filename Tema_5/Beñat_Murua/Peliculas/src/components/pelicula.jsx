import * as React from 'react';
import  '../styles/pelicula.css';

export const Pelicula = ({titulo, sinopsis, enlace_imagen}) => {
    return (
        <div className="pelicula">
        <h2>{titulo}</h2>
        <p>{sinopsis}</p>
        <img src={enlace_imagen} alt={titulo} className="imagen" />
        </div>
    );
    }