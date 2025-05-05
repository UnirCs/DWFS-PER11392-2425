import { Movie } from "../Movie";

const MOVIE_LIST = [
  {
    id: 1,
    title: "Inception",
    sinopsis:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    duration: "2h 28m",
    genre: "Sci-Fi",
    score: 8.8,
    image: "https://picsum.photos/200/300",
    url: "https://www.example.com/inception",
  },
  {
    id: 2,
    title: "The Dark Knight",
    sinopsis:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: "2h 32m",
    genre: "Action",
    score: 9.0,
    image: "https://picsum.photos/200/300",
    url: "https://www.example.com/dark-knight",
  },
  {
    id: 3,
    title: "Interstellar",
    sinopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49m",
    genre: "Adventure",
    score: 8.6,
    image: "https://picsum.photos/200/300",
    url: "https://www.example.com/interstellar",
  },
];

export const MovieList = () => {
  return (
    <div className="grid gap-4">
      {MOVIE_LIST.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          image={movie.image}
          sinopsis={movie.sinopsis}
          duration={movie.duration}
          genre={movie.genre}
          title={movie.title}
          score={movie.score}
          url={movie.url}
        ></Movie>
      ))}
    </div>
  );
};
