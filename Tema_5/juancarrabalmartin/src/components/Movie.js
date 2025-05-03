import React from 'react';
import '../styles/MovieList.css';

const Movie = ({ titulo, sinopsis, genero, duracion, puntuacion, imagen }) => {
    return (
        <div className="movie-card">
            <img src={imagen} alt={titulo} className="movie-image" />
            <h2>{titulo}</h2>
            <p><strong>Sinopsis:</strong> {sinopsis}</p>
            <p><strong>Género:</strong> {genero}</p>
            <p><strong>Duración:</strong> {duracion}</p>
            <p><strong>Puntuación:</strong> {puntuacion}</p>
        </div>
    );
};

export default Movie;

