const obtenerChiste = async () => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        document.getElementById('chiste').textContent = data.value;
    } catch (error) {
        document.getElementById('chiste').textContent = 'Error al cargar el chiste. Inténtalo de nuevo.';
    }
};