import { useContext } from "react";
import { CinemaContext } from "../components/CinemaContext";
import Movie from "../components/Movie";

const MainView = () => {
  const { movies, loading } = useContext(CinemaContext);

  return (
    <div className="container__main">
      <div className={loading ? "container__main__view loading__box" : "container__main__view"}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          movies.length > 0 &&
          movies.map((element) => {
            return <Movie key={element.id} movie={element} />;
          })
        )}
      </div>
    </div>
  );
};

export default MainView;
