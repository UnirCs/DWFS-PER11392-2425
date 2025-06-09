import React from 'react';
import Movie from './Movie';

import movie1 from '../assets/movie1.jpg';
import movie2 from '../assets/movie2.jpg';
import movie3 from '../assets/movie3.jpg';
import movie4 from '../assets/movie4.jpg';
import movie5 from '../assets/movie5.jpg';

const movies = [
    {
        titulo: 'Inception',
        sinopsis: 'Un ladrón que roba secretos corporativos a través de sueños.',
        genero: 'Ciencia Ficción',
        duracion: '2h 28min',
        puntuacion: '8.8',
        imagen: movie1
    },
    {
        titulo: 'Interstellar',
        sinopsis: 'Un grupo de astronautas viaja a través de un agujero de gusano.',
        genero: 'Aventura, Drama',
        duracion: '2h 49min',
        puntuacion: '8.6',
        imagen: movie2
    },
    {
        titulo: 'The Matrix',
        sinopsis: 'Un hacker descubre la verdad sobre su realidad.',
        genero: 'Acción, Sci-Fi',
        duracion: '2h 16min',
        puntuacion: '8.7',
        imagen: movie3
    },
    {
        titulo: 'The Godfather',
        sinopsis: 'La historia de una familia mafiosa en América.',
        genero: 'Crimen, Drama',
        duracion: '2h 55min',
        puntuacion: '9.2',
        imagen: movie4
    },
    {
        titulo: 'Pulp Fiction',
        sinopsis: 'Historias entrelazadas de crimen en Los Ángeles.',
        genero: 'Crimen, Drama',
        duracion: '2h 34min',
        puntuacion: '8.9',
        imagen: movie5
    }
];

const MovieList = () => {
    return (
        <div className="movie-list">
            {movies.map((movie, index) => (
                <Movie key={index} {...movie} />
            ))}
        </div>
    );
};

export default MovieList;
