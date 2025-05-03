import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className='bg-dark'>
            <h1 className={styles.title}>Bienvenidos a UNIR Cinema</h1>
        </header>
    );
}