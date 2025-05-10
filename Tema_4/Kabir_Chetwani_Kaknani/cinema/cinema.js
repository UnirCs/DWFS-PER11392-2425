// Definir el tamaño de la matriz de butacas
const filas = 10;       // Número de filas
const columnas = 10;    // Número de columnas

// Inicializar la matriz
let butacas = setup();

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < filas; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });                
        }
        butacas.push(fila);
    }
    
    return butacas;
}


function suggest(personas) {
    if (isNaN(personas) || personas < 1) return;

    let asientos = new Set();
    let filas = document.querySelectorAll('.fila');

    // Quitar seleccionados previamente
    document.querySelectorAll('.butaca.seleccionado').forEach(b => b.classList.remove('seleccionado'));

    for (let fila = filas.length - 1; fila >= 0 && asientos.size === 0; fila--) {
        let butacas = filas[fila].querySelectorAll('.butaca');

        for (let c = 0; c <= butacas.length - personas && asientos.size === 0; c++) {
            let grupo = Array.from(butacas).slice(c, c + personas);
            let disponibles = grupo.every(b => !b.classList.contains('ocupado') && !b.classList.contains('seleccionado'));

            if (disponibles) {
                grupo.forEach(butaca => {
                    butaca.classList.add('seleccionado');
                    asientos.add(butaca);
                });
            }
        }
    }

    console.log("Asientos sugeridos (" + asientos.size + "): " +
        [...asientos].map(butaca => {
            const fila = butaca.closest('.fila')?.querySelector('p')?.textContent.trim();
            const index = [...butaca.parentNode.children].indexOf(butaca);
            return `${fila} - Butaca ${index + 1}`;
        }).join(', ')
    );

    return asientos;
}
