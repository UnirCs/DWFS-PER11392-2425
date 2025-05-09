import React from 'react';
import Movie from '../components/Movie';
import MovieList from '../components/MovieList';
import "./../styles/Overview.css"
const Overview = () => {

  let movieList = MovieList();
    
  return (
    <div>
        <h2 className='body-title'>Cartelera</h2>
        <div className='movies-container'>
            {
                movieList.map((movie, index) => (
                    <Movie
                        key={index}
                        Title={movie.Title}
                        ImgLink={movie.ImgLink}
                        Sinopsis={movie.Sinopsis}
                        Duration={movie.Duration}
                        Genre={movie.Genre}
                        Grade={movie.Grade}
                    />
                ))
            }
        </div>
      
    </div>
  )
}

export default Overview
