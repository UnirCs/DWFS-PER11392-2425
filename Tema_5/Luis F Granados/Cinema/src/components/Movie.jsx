import React from "react";
import '../styles/Movie.css'

const Movie = ( { movie } ) => {

    if (!movie) {
        return <div className="movie-details">Selecciona una película para ver los detalles.</div>;
    }

    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <img src={movie.image} alt={movie.title} className="card-image" />
            <p className="align-text"><strong>Sinopsis:</strong> {movie.synopsis}</p>
            <p className="align-text"><strong>Duración:</strong> {movie.duration}</p>
            <p className="align-text"><strong>Género:</strong> {movie.gender}</p>
            <p className="align-text"><strong>Puntuación:</strong> {movie.punctuation}</p>
            <button className="seat-selection-button">Seleccionar Asientos</button>
        </div>
    );
};
export default Movie;