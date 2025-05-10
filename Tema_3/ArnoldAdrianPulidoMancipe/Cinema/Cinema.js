const ROWS_COLUMNS = 10;
let seats = [];

// Función para inicializar la matriz de butacas
function setup() {
    let seatNumber = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let seats = [];

    for (let i = 0; i < ROWS_COLUMNS; i++) {
        // Nueva fila
        let row = [];
        for (let j = 0; j < ROWS_COLUMNS; j++) {
            // Nuevo asiento
            row.push({
                id: seatNumber++,
                isBusy: Math.random() > 0.5 // Estado inicial libre
            });
        }
        seats.push(row);
    }
    return seats;
}

const suggest = (seatsAmount) => {
    let suggestions = [];
    if(seatsAmount <= ROWS_COLUMNS && seatsAmount >= 1) {
        let temporalSuggestions = [];
        let found = false;
        for (let i = ROWS_COLUMNS - 1; i >= 0 && !found; i--) {
            if (seats[i].filter(seat => !seat.isBusy).length >= seatsAmount) {
                for (let j = ROWS_COLUMNS - 1; j >= 0 && !found; j--) {
                    temporalSuggestions = seats[i].slice(j - seatsAmount + 1, j + 1);
                    suggestions = temporalSuggestions
                        .filter(seat => !seat.isBusy).length === seatsAmount ? temporalSuggestions : suggestions;
                    found = suggestions.length > 0;
                }
            }
        }
    }
    return suggestions;
};

function showSuggest(amount) {
    seats = setup();
    console.log("\nSillas disponibles");
    for (let i = 0; i < seats.length; i++)
        console.log(seats[i].filter(seat => !seat.isBusy).map(seat => seat.id));
    console.log("\nLos asientos sugeridos para que tomes son:");
    console.log(suggest(amount).map(seat => seat.id));
    suggest(amount).map(seat => seat.id);
}
