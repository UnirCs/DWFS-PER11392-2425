import React from "react";
import { Movie } from "./Movie";
import '../styles/movielist.css';
export const MovieList = () => {

    const peliculas = [
        { titulo: "Robo en los Ángeles", imagen: "/movies/1.jpg", sipnosis: "Sipnósis de la pelicula", duracion: "130 minutos", genero: "Acción", puntuacion: "3/5", id: "1"},
        { titulo: "Visitando la familia", imagen: "/movies/2.jpg", sipnosis: "Sipnósis de la pelicula", duracion: "115 minutos", genero: "Comedia", puntuacion: "4/5", id: "2"},
        { titulo: "Asesinato en directo", imagen: "/movies/3.jpg", sipnosis: "Sipnósis de la pelicula", duracion: "150 minutos", genero: "Intriga", puntuacion: "4,1/5", id: "3"},
        { titulo: "Siempre vuelve", imagen: "/movies/4.jpg", sipnosis: "Sipnósis de la pelicula", duracion: "98 minutos", genero: "Acción", puntuacion: "4,3/5", id: "4"},
        { titulo: "Otras oportunidades", imagen: "/movies/5.jpg", sipnosis: "Sipnósis de la pelicula", duracion: "125 minutos", genero: "Romántica", puntuacion: "2/5", id: "5"},
        { titulo: "¿Que ha ocurrido?", imagen: "/movies/6.jpg", sipnosis: "Sipnósis de la pelicula", duracion: "110 minutos", genero: "Comedia", puntuacion: "3,5/5", id: "6"},
    ];

    return (
        <main className="movie-container">
            {peliculas.map((pelicula, index) => (
                <Movie
                    key={index}
                    titulo={pelicula.titulo}
                    imagen={pelicula.imagen}   
                    sipnosis={pelicula.sipnosis}
                    duracion={pelicula.duracion}
                    genero={pelicula.genero}
                    puntuacion={pelicula.puntuacion}    
                    id={pelicula.id}    
                />
            ))}
        </main>
    );
}