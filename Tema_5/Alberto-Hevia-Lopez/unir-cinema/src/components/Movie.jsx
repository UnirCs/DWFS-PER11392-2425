import React from "react";

export const Movie = ({ titulo, imagen, sinopsis, duracion, genero, puntuacion }) => {
    return (
        <div className="card">
            <h3>{titulo}</h3>
            <img src={imagen} alt = {titulo}/>
            <p>Sinopsis:</p>
            <p>{sinopsis}</p>
            <p>Duración: {duracion} min </p>
            <p>Género: {genero} </p>
            <p>Puntuación: {puntuacion} / 5 </p>
            <button> Seleccionar asientos</button>
        </div>
    );
}