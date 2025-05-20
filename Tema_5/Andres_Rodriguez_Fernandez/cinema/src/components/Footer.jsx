import React from "react";
import '../styles/footer.css';
export const Footer = () => {
    return (
        <footer>
            <p className="footer-text">Cine YELMO UNIR-CINEMA MAX</p>
            <p className="footer-text">Dirección: Calle Avenida de la Paz, 137, Logroño</p>
            <p className="footer-text">Teléfono: 941209743</p>
            <p className="footer-text">Email: <a href="mailto:cinefullstack@unircinema.com">cinefullstack@unircinema.com</a></p>
        </footer>
    );
}