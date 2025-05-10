import React from 'react';
import '../styles/MovieList.css';

const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <div className="movie-list">
            <h1 className="center-text">Cartelera</h1>
            <h3 className="center-text">Lista de Películas</h3>
            <p className="center-text">Selecciona una película para ver los detalles.</p>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index} onClick={() => onSelectMovie(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default MovieList;