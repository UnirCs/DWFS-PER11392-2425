import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Score from "./Score";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const viewDetail = () => {
    navigate("/detail/" + movie.id, { state: { movie } });
  };

  return (
    <Card className="card__movie">
      <CardMedia component="img" alt={movie.title} width="200" image={import.meta.env.VITE_IMAGE_URL + "w200" + movie.poster_path} />
      <CardContent className="card__movie__content">
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Score score={movie.vote_average} />
        <Button variant="outlined" size="small" color="warning" onClick={viewDetail}>
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default Movie;
