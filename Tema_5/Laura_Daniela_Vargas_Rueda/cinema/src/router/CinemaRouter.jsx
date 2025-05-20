import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainView from "../views/MainView";
import DetailView from "../views/MovieView";

export const CinemaRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail/:id" element={<DetailView />} />
        <Route path="/" element={<MainView />} />
      </Routes>
    </BrowserRouter>
  );
};
