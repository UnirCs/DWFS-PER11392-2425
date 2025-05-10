import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';

function App() {
    return (
        <div>
            <Header />
            <p>Lista de pel&#205;culas</p>
            <MovieList />
            <button onclick="window.location.href='index.html';">Elige Asiento</button>  
            <Footer />
            {/* otros componentes */}
        </div>
    );
}

export default App;

