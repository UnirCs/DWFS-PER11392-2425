import React from "react";
import '../styles/movie.css';

export const Movie = ({ titulo, imagen, sipnosis, duracion, genero, puntuacion, id }) => {
    return (
        <section className="movie-item" id={id}>
            <img src={imagen} alt={titulo} className="movie-image" />
            <div className="movie-details">
                <h3>{titulo}</h3>
                <p className="movie-text">
                    <span className="movie-text-highlight">Sipnosis: </span>
                    <span className="movie-text-description">{sipnosis}</span>
                </p>
                <p className="movie-text">
                    <span className="movie-text-highlight">Duración: </span>
                    <span className="movie-text-description">{duracion}</span>
                </p>
                <p className="movie-text">
                    <span className="movie-text-highlight">Género: </span>
                    <span className="movie-text-description">{genero}</span>
                </p>
                <p className="movie-text">
                    <span className="movie-text-highlight">Calificación: </span>
                    <span className="movie-text-description">{puntuacion}</span>
                </p>
                <button className="movie-button" type="submit" name={id}>Reservar</button>
            </div>
        </section >
    );
}