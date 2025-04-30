import { MovieProps } from '../../interfaces/MovieProps';
import styles from './Movie.module.css';

export const Movie = ({ titulo, imagen, sinopsis, duracion, genero, puntuacion }: MovieProps) => {
    return (
        <div className={`bg-dark ${styles.card}`}>
            <div className={styles.cardContent}>
                <div className={styles.cardTextContent}>
                    <h3 className={styles.cardTitle}>{titulo}</h3>
                    <p className={styles.cardText}>Resumen: {sinopsis}</p>
                    <p className={styles.cardText}>Duración: {duracion}</p>
                    <p className={styles.cardText}>Género: {genero}</p>
                    <p className={styles.cardText}>Valoración: {puntuacion}</p>
                    <button>Ver detalles</button>
                </div>
                <div className={styles.cardImageWrapper}>
                    <img src={imagen} alt={titulo} className={styles.cardImage} />
                </div>
            </div>
        </div>
    );
};
