import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/styles.css'

import {Header} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";
import {Movie} from "./components/Movie.jsx";

function App() {
    const peliculas = [
        { titulo: "El padrino", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/The_Godfather_logo.svg/250px-The_Godfather_logo.svg.png",
            sinopsis: "Don Vito Corleone es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York en los años 40. El hombre tiene cuatro hijos: Connie, Sonny, Fredo y Michael, que no quiere saber nada de los negocios sucios de su padre. Cuando otro capo, Sollozzo, intenta asesinar a Corleone, empieza una cruenta lucha entre los distintos clanes.",
            duracion: "185", genero: "Drama", puntuacion: "4.8"},
        { titulo: "El padrino II", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/The-godfather-part-ii.png/250px-The-godfather-part-ii.png",
            sinopsis: "Tras la muerte de Don Vito Corleone, su hijo Michael es elegido para liderar los negocios familiares. El nuevo cabeza de familia debe lidiar con un panorama cambiante de amistades y enemistades, al tener que negociar con la mafia judía y perder el apoyo de Frankie. Al mismo tiempo, Michael escapa por los pelos de un atentado. Simultáneamente, se recuerda el ascenso y los orígenes de Don Vito en Sicilia y como inmigrante en Nueva York.",
            duracion: "212", genero: "Drama", puntuacion: "4.5"},
        { titulo: "Star Wars", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/330px-Star_Wars_Logo.svg.png", sinopsis: "La nave en la que viaja la princesa Leia es capturada por las tropas imperiales al mando del temible Darth Vader. Antes de ser atrapada, Leia consigue introducir un mensaje en su robot R2-D2, quien acompañado de su inseparable C-3PO logran escapar. Tras aterrizar en el planeta Tattooine son capturados y vendidos al joven Luke Skywalker, quien descubrirá el mensaje oculto que va destinado a Obi Wan Kenobi, maestro Jedi a quien Luke debe encontrar para salvar a la princesa.",
            duracion: "121", genero: "Drama", puntuacion: "4.5"},
    ];

    return(<>
           <div>
               <Header />
               <h2 className="center-text">Películas disponibles</h2>

               <div className="movie-container">
                   {peliculas.map((pelicula, index) => (
                       <Movie
                           key={index}
                           titulo={pelicula.titulo}
                           imagen={pelicula.imagen}
                           sinopsis={pelicula.sinopsis}
                           duracion={pelicula.duracion}
                           genero={pelicula.genero}
                           puntuacion={pelicula.puntuacion}
                       />
                   ))}
               </div>


               <Footer />
           </div>
           </>);
}

export default App
