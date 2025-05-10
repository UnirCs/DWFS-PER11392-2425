import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CinemaRouter } from "./router/CinemaRouter";
import { CinemaContext } from "./components/CinemaContext";
import { useEffect, useState } from "react";

function App() {
  let title = "UNIR-CINEMA";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const url = import.meta.env.VITE_API_URL + "/popular?api_key=" + import.meta.env.VITE_API_KEY + "&language=es-ES";
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setMovies(result.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API error", error);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <CssBaseline>
      <Header title={title} />
      <CinemaContext.Provider
        value={{
          movies,
          loading,
        }}
      >
        <CinemaRouter />
      </CinemaContext.Provider>
      <Footer />
    </CssBaseline>
  );
}

export default App;
