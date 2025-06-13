import React from 'react';
import "./../styles/movies.css"

const Movie = (props) => {
  return (
    <div className='card'>
        <h3>{props.Title}</h3>
        <div className='card-image-text'>
            <img src={props.ImgLink} alt={props.Title}></img>
            <div className='card-text-button'>
                <div className='card-text'>
                    <p> Sinopsis: {props.Sinopsis}</p>
                    <p> Duration: {props.Duration}</p>
                    <p> Genre: {props.Genre}</p>
                    <p> Grade: {props.Grade}</p>
                </div>
                <button className='movie-button'>Reserva tu entrada!</button>
            </div>
        </div>
    </div>
  )
}

export default Movie
