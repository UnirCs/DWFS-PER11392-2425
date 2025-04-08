function getButacasDesdeHTML() {
    const filasHTML = document.querySelectorAll(".cinema__row");
    const butacas = [];
    let idContador = 1;

    filasHTML.forEach(filaHTML => {
        const asientosHTML = filaHTML.querySelectorAll("div[class^='cinema__seat']");
        const fila = [];

        asientosHTML.forEach(asiento => {
            const ocupado = asiento.classList.contains("cinema__seat--occupied");
            fila.push({
                id: idContador++,
                estado: ocupado
            });
        });

        butacas.push(fila);
    });

    return butacas;
}

let butacas = getButacasDesdeHTML();
Console.log("Butacas inicializadas.");
Console.log("------------------");


function suggest(numSeats) {
    const seats = new Set();

    if (numSeats <= 0) {
        return seats;
    }

    let found = false;
    let row = butacas.length - 1;

    while (row >= 0 && !found) {
        let consecutiveSeats = 0;
        let startIndex = -1;
        let seat = 0;

        while (seat < butacas[row].length && !found) {
            if (!butacas[row][seat].estado) {
                if (consecutiveSeats === 0) {
                    startIndex = seat;
                }
                consecutiveSeats++;

                if (consecutiveSeats === numSeats) {
                    for (let i = startIndex; i < startIndex + numSeats; i++) {
                        seats.add(butacas[row][i].id);
                    }
                    found = true;
                }
            } else {
                consecutiveSeats = 0;
                startIndex = -1;
            }
            seat++;
        }
        row--;
    }

    console.log("Sugerencia de asientos:", seats);
}

function handleInputChange(value) {
    const num = parseInt(value);
    if (!isNaN(num)) {
        suggest(num);
    }
}
