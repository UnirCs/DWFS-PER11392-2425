import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieValidation } from "../hooks/useMovieValidation";
import { CinemaContext } from "../components/CinemaContext";
import Score from "../components/Score";
import { Button, Chip } from "@mui/material";

const MovieInfo = ({ movie, goHome }) => {
  return !movie ? (
    "Película no encontrada"
  ) : (
    <div className="container__main__movie">
      <img className="movie__poster" src={import.meta.env.VITE_IMAGE_URL + "w500" + movie.backdrop_path} alt={movie.title} />
      <div className="row movie__info">
        <div className="img-box">
          <img src={import.meta.env.VITE_IMAGE_URL + "w200" + movie.poster_path} alt={movie.title} />
        </div>
        <div className="detail-box">
          <div className="detail-box-title">
            <h2>{movie.title}</h2>
            <Score score={movie.vote_average} />
          </div>
          <span>Fecha de estreno: {movie.release_date}</span>
          <p>{movie.overview}</p>
          <div className="detail-box-btn">
            <div>
              {movie.genres?.map((genre) => (
                <Chip color="secondary" key={genre.id} label={genre.name} />
              ))}
            </div>
            <Button variant="outlined" size="small" color="warning" onClick={goHome}>
              Regresar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailView = () => {
  const { id } = useParams();
  const { movies } = useContext(CinemaContext);
  const { validated } = useMovieValidation(id, movies);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!validated.loading && validated.isValid) {
      fetchData();
    }
  }, [validated]);

  const fetchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = import.meta.env.VITE_API_URL + "/" + id + "?api_key=" + import.meta.env.VITE_API_KEY + "&language=es-ES";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("API error", error);
      });
  };

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return <div className="container__main">{validated.loading ? "Cargando..." : <MovieInfo movie={movie} goHome={goHome} />}</div>;
};

export default DetailView;
