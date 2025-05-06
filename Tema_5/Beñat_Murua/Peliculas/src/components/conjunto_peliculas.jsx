import * as React from 'react';
import {Pelicula} from './pelicula'
import Grid from '@mui/material/Grid';






export const ConjuntoPeliculas = ({ peliculas }) => {
    return (
        <>
            <Grid container spacing={2}>
            <Pelicula
                titulo="Los Siete Samuráis"
                sinopsis="Un pueblo de campesinos contrata a siete samuráis para protegerse de una banda de bandidos que los está saqueando."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Seven_Samurai_poster.jpg/500px-Seven_Samurai_poster.jpg"
                />

                <Pelicula
                titulo="Trono de Sangre"
                sinopsis="Adaptación de 'Macbeth' de Shakespeare, en la que un samurái ambicioso traiciona a su señor para tomar el trono."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Throne_of_Blood.jpg/800px-Throne_of_Blood.jpg"
                />

                <Pelicula
                titulo="Yojimbo"
                sinopsis="Un ronin llega a un pueblo dividido entre dos bandas criminales y se ofrece como guardaespaldas para enfrentarlas entre sí."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Yojimbo_poster.jpg/800px-Yojimbo_poster.jpg"
                />

                <Pelicula
                titulo="Sanjuro"
                sinopsis="Secuela de 'Yojimbo', donde el mismo ronin ayuda a un grupo de jóvenes samuráis a enfrentar la corrupción dentro de su propio clan."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Kinema-Junpo-1962-January-early-1.jpg/800px-Kinema-Junpo-1962-January-early-1.jpg"
                />

                <Pelicula
                titulo="La Fortaleza Escondida"
                sinopsis="Dos campesinos son involuntarios portadores de un tesoro que debe ser entregado al ejército samurái, mientras son perseguidos por los enemigos."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/The_Hidden_Fortress.jpg/800px-The_Hidden_Fortress.jpg"
                />

                <Pelicula
                titulo="Rashōmon"
                sinopsis="Un crimen es presenciado por varias personas, cada una de las cuales ofrece una versión diferente de los hechos."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Rashomon_poster.jpg/800px-Rashomon_poster.jpg"
                />

                <Pelicula
                titulo="Dersu Uzala"
                sinopsis="Un explorador ruso y un cazador nómada siberiano desarrollan una profunda amistad mientras exploran los bosques de Siberia."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dersuuzala.jpg/330px-Dersuuzala.jpg"
                />
                <Pelicula
                titulo="Sanshiro Sugata"
                sinopsis="Un joven se inicia en el judo y debe enfrentarse a su propio orgullo y a las enseñanzas de su maestro para convertirse en un verdadero luchador."
                enlace_imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Sugata_Sanshiro_poster.jpg/330px-Sugata_Sanshiro_poster.jpg"
                />
        </Grid>
      </>
    )
}