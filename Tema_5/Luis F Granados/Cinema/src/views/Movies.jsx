import React,{ useState }  from 'react';
import '../styles/Movies.css'
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import MovieList from "../components/MovieList.jsx";
import Movie from "../components/Movie.jsx";
import { movies } from '../Data/Data.jsx';

export const Movies = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div>
            <Header />
            <div className="main-content">
                <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>
                <Movie movie={selectedMovie} />
            </div>
            <Footer />
        </div>
    );
}