import { MovieProps } from '../../interfaces/MovieProps';
import { Movie } from '../movie';
import styles from './MovieList.module.css';

export const MovieList = () => {
    const movies: MovieProps[] = [
        { 
            titulo: 'El Padrino', 
            imagen: 'Padrino', 
            sinopsis: 'Don Vito...', 
            duracion: '175 min', 
            genero: 'Drama', 
            puntuacion: 9.2 
        },
        { 
            titulo: 'La Casa', 
            imagen: 'Casa', 
            sinopsis: 'Grupo...', 
            duracion: '83 min', 
            genero: 'Acción', 
            puntuacion: 8.3 
        },
        { 
            titulo: 'El Secreto', 
            imagen: 'Secreto', 
            sinopsis: 'Un oficial...', 
            duracion: '129 min', 
            genero: 'Crimen', 
            puntuacion: 8.2 
        }
    ];
    

    return (
        <div>
            <h2>Películas Disponibles</h2>
            <div className={styles.movieContainer}>
                {movies.map((movie, index) => (
                    <Movie
                        key={index}
                        titulo={movie.titulo}
                        imagen={'https://api.dicebear.com/9.x/avataaars/svg?seed=' + movie.imagen}
                        sinopsis={movie.sinopsis}
                        duracion={movie.duracion}
                        genero={movie.genero}
                        puntuacion={movie.puntuacion}
                    />
                ))}
            </div>
        </div>
    );
}