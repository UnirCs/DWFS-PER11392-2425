import React from "react";

const Footer = () => {
  const actualYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer__container">
        <p>© {actualYear} UNIR-CINEMA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
