import { useEffect, useState } from "react";

export const useMovieValidation = (id, movies) => {
  const [validated, setValidated] = useState({
    isValid: false,
    loading: true,
  });

  useEffect(() => {
    if (id && movies?.length > 0) {
      const movie = movies.find((element) => element.id == id);
      if (movie) {
        setValidated({
          isValid: true,
          loading: false,
        });
      } else {
        setValidated({
          isValid: false,
          loading: false,
        });
      }
    }
  }, [movies, id]);

  return { validated };
};
