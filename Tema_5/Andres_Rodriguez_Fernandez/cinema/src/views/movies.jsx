import React from 'react';
import {Header} from "../components/Header";
import {MovieList} from "../components/MovieList";
import {Footer} from "../components/Footer";
import '../styles/styles.css';

export const Cinema = () => {

    return (
        <div>
            <Header/>
            <MovieList/>
            <Footer/>
        </div>
    )
}