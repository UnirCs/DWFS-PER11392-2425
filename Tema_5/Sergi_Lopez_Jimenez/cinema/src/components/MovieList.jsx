import React from 'react';
import Interstellar from "../assets/interstellar.jpg";
import Inception from "../assets/inception.jpg";
import DarkKnight from "../assets/dark_knight.jpg";
import Matrix from "../assets/matrix.jpg";
import LOTR from "../assets/lord_of_the_rings.jpg";
import PulpFiction from "../assets/pulp_fiction.jpg";
import Godfather from "../assets/godfather.jpg";
import Shawshank from "../assets/shawshank.jpg";
import Forrest from "../assets/forrest_gump.jpg";
import FightClub from "../assets/fight_club.jpg";

const MovieList = () => {
    return [
        {Title: "Interstellar", ImgLink: Interstellar, Sinopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", Duration: "2:49h", Genre: "Sci-Fi", Grade: "9.5/10"},
        
        {Title: "Inception", ImgLink: Inception, Sinopsis: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.", Duration: "2:28h", Genre: "Sci-Fi/Action", Grade: "9.0/10"},
        
        {Title: "The Matrix", ImgLink: Matrix, Sinopsis: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.", Duration: "2:16h", Genre: "Sci-Fi/Action", Grade: "8.7/10"},
        
        {Title: "The Shawshank Redemption", ImgLink: Shawshank, Sinopsis: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.", Duration: "2:22h", Genre: "Drama", Grade: "9.3/10"},
        
        {Title: "The Godfather", ImgLink: Godfather, Sinopsis: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.", Duration: "2:55h", Genre: "Crime/Drama", Grade: "9.2/10"},
        
        {Title: "Pulp Fiction", ImgLink: PulpFiction, Sinopsis: "The lives of two mob hitmen, a boxer, and others intertwine in tales of violence and redemption.", Duration: "2:34h", Genre: "Crime/Drama", Grade: "8.9/10"},
        
        {Title: "Forrest Gump", ImgLink: Forrest, Sinopsis: "The life journey of Forrest Gump, a man with a low IQ, who influences historical events.", Duration: "2:22h", Genre: "Drama/Romance", Grade: "8.8/10"},
        
        {Title: "Fight Club", ImgLink: FightClub, Sinopsis: "An insomniac office worker and a soap maker form an underground fight club that evolves into something much more.", Duration: "2:19h", Genre: "Drama/Thriller", Grade: "8.8/10"},
        
        {Title: "The Lord of the Rings: The Return of the King", ImgLink: LOTR, Sinopsis: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam.", Duration: "3:21h", Genre: "Fantasy/Adventure", Grade: "9.0/10"},
        
        {Title: "The Dark Knight", ImgLink: DarkKnight, Sinopsis: "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.", Duration: "2:32h", Genre: "Action/Crime", Grade: "9.0/10"},
            ]
}

export default MovieList
