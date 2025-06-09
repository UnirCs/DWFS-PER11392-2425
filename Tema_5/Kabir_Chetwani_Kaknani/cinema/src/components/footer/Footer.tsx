import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={`d-flex justify-content-between align-items-center p-4 bg-dark text-white w-100 ${styles.footer}`}>
      <p className="mb-0">© 2025 UNIR-CINEMA</p>

      <div>
        <p className="mb-1">📍 Dirección: Avenida Los Santos 36</p>
        <p className="mb-1">✉️ Email: <a href="mailto:reservas@unircinema.com" className="text-white text-decoration-none">reservas@unircinema.com</a></p>
        <p className="mb-1">📞 Teléfono: +34 642 987 435</p>
      </div>

      <div className="d-flex gap-4">
        <a href="https://facebook.com" target="_blank" className="text-white text-decoration-none">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" className="text-white text-decoration-none">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" className="text-white text-decoration-none">
          <i className="bi bi-twitter"></i>
        </a>
      </div>
    </footer>
  );
};
