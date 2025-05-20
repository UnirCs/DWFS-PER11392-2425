import React from "react";

export const Movie = ({ titulo, imagen, sinopsis,duracion , genero,puntuacion}) => {
    return (

        <div className="card-movie">
            <table>
            <tbody>

           <tr>
            <td>
                <img src={imagen} className="imagen" alt="The Conjuring" />
            </td>
            <td>         
                <h2>{titulo}</h2>
                <p>sinopsis: {sinopsis}</p>
                <p>duracion: {duracion} </p>
                <p>genero: {genero} </p>
                <p>puntuación: {puntuacion} </p>
             </td>
            </tr>
            </tbody>
            </table>
        </div>
    );
}