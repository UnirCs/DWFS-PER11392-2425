function getButacasDesdeHTML() {
    let filasHTML = document.querySelectorAll(".cinema__row");
    let butacas = [];
    let idContador = 1;

    filasHTML.forEach(filaHTML => {
        let asientosHTML = filaHTML.querySelectorAll("div[class^='cinema__seat']");
        let fila = [];

        asientosHTML.forEach(asiento => {
            let ocupado = asiento.classList.contains("cinema__seat--occupied");
            asiento.dataset.id = idContador;
            fila.push({
                id: idContador++,
                estado: ocupado
            });
        });

        butacas.push(fila);
    });

    return butacas;
}

function highlightSuggestedSeats(seatIds) {
    document.querySelectorAll(".cinema__seat--selected").forEach(seat => {
        seat.classList.remove("cinema__seat--selected");
    });

    seatIds.forEach(id => {
        let seat = document.querySelector(`[data-id="${id}"]`);
        if (seat) seat.classList.add("cinema__seat--selected");
    });
}

function suggest(numSeats) {
    const seats = new Set();

    if (numSeats <= 0) {
        return Array.from(seats);
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
    return Array.from(seats);
}

function handleInputChange() {
    let numSeatsInput = document.getElementById("numSeats");
    let num = parseInt(numSeatsInput.value);

    if (isNaN(num) || numSeatsInput.value === "") {
        highlightSuggestedSeats([]);
        return;
    }
    let suggestedSeats = suggest(num);
    highlightSuggestedSeats(suggestedSeats);
}

document.addEventListener("DOMContentLoaded", () => {
    butacas = getButacasDesdeHTML();
    document.getElementById("numSeats").addEventListener("input", handleInputChange);
});