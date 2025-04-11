// Definir el tamaño de la matriz de butacas
const rows = 5; // Número de filas
const columns = 12; // Número de columnas
const seatMap = Array(rows).fill().map(() => Array(columns).fill(false)); //Array de sillas
let N = rows * columns; // Número de butacas totales
let butacas;

document.addEventListener('DOMContentLoaded', function() {

    //Generamos los asientos
    generateSeats();

    //Contamos el total de asientos
    butacas = setup();
    console.log("Butacas inicializadas");
    console.log(butacas);
});


//Generamos los asientos dinamicamente en el DOM
function generateSeats(){
    const container = document.getElementById("cinema_form_seats");
    container.innerHTML = '';

    // Generar cada fila
    for (let row = 0; row < rows; row++) {
        // Crear elemento de fila
        const rowLabel = document.createElement('label');
        rowLabel.className = 'cinema_checkbox';
        rowLabel.textContent = `Fila ${row + 1}`;
        container.appendChild(rowLabel);
        
        // Generar asientos para esta fila
        for (let seat = 0; seat < columns; seat++) {
            const isOccupied = seatMap[row][seat];
            
            const containerLabel = document.createElement('label');
            containerLabel.className = 'checkbox-container';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (isOccupied) {
                checkbox.disabled = true;
                checkbox.checked = true;
            }
            
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark' + (isOccupied ? ' occupied' : '');
            
            containerLabel.appendChild(checkbox);
            containerLabel.appendChild(checkmark);
            container.appendChild(containerLabel);
        }
        
        // Agregar salto de línea
        container.appendChild(document.createElement('br'));
    }
    
}

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < rows; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < columns; j++) {
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

//Seleccion de butacas (Actividad 2)
function seleccionarButacas(numeroButacas, butacasArray) {
    let selectedButacas = [];
    let nButacas = numeroButacas

    //Devuelve set vacio si el numero de asientos solicitados excede el tamaño maximo de la fila
    if (numeroButacas > N) {
        return selectedButacas;
    }

    //Comienza a buscar asientos juntos desde la fila mas lejana a la pantalla
    for (let i = butacasArray.length - 1; i > 0; i--) {
        for (let j = butacasArray.length - 1; j > 0; j--) {
            if (!butacasArray[i][j].estado && //Revisar si la butaca actual esta libre9
                !butacasArray[i - 1][j - 1].estado && //Se revisa que el siguiente asiento tambien este vacio para asegurar que queden juntos
                nButacas > 0 //No debe pasarse del numero de butacas seleccionado
            ) {
                butacasArray[i][j].estado = true;
                nButacas--;
            }
        }
    }

    //Si en ninguna fila hay asientos disponibles, se devuelve un set vacio
    if (nButacas !== 0) {
        return selectedButacas;
    }

    //Devuelve las butacas seleccionada por la operacion
    selectedButacas = butacasArray;
    return selectedButacas;
}

//Mostar butacas seleccionadas (aquellas con TRUE en el estado)
function mostrarButacasSeleccionadas(butacasArray) {
    let butacasSeleccionadas = [];
    for (let i = 0; i < butacasArray.length; i++) {
        for (let j = 0; j < butacasArray.length; j++) {
            if (butacasArray[i][j].estado) {
                butacasSeleccionadas.push(butacasArray[i][j].id);
            }
        }
    }
    console.log(butacasSeleccionadas);
}

//Actividad tema 3
function suggest(numButacas) {
    /*
    Por el momento, se inicializara las butacas siempre
    que se llame el metodo porque se observo en las imagenes de
    la actividad que siempre debia dar el mismo resultado sin
    importar el input
     */
    butacas = setup();

    if (isNaN(numButacas)) {
        console.log(`Error. Porfavor, digite un numero.`);
        return;
    }
    butacas = seleccionarButacas(numButacas, butacas);
    mostrarButacasSeleccionadas(butacas);
}