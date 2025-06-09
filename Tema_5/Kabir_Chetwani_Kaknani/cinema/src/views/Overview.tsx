import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { MovieList } from "../components/movie_list";

export const OverView = () => {
    return (
        <>
            <Header />
            <MovieList />
            <Footer />
        </>
    );
}