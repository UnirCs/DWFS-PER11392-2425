const INITIAL_LETTER = 65; //Letra A
const DUPLICATE_LETTER = 67; // Letra para ocultar y simular un pasillo
const ROW_AMOUNT = 14;
const COLUM_AMOUNT = 20;
const INITIAL_COLUM_TO_HIDE_L = 5;
const INITIAL_COLUM_TO_HIDE_R = 16;
const AMOUNT_SEATS_HIDE = 2;
const MAX_AMOUNT_AVAILABLE_SEATS = 9;
let seats = [];

document.addEventListener('DOMContentLoaded', () => {
    fillSeats();
    addHorizontalHall();
    addVerticalHalls(INITIAL_COLUM_TO_HIDE_L, AMOUNT_SEATS_HIDE);
    addVerticalHalls(INITIAL_COLUM_TO_HIDE_R, AMOUNT_SEATS_HIDE);
    hideSeatsRow(78, 3, 16, 'seat-hidden');
});

const fillSeats = () => {
    let seatId = '';
    for(let i = 0; i < ROW_AMOUNT; i++) {
        let row = [];
        for(let j = 0; j < COLUM_AMOUNT; j++) {
            let seat = document.createElement('button')
            seatId = String.fromCharCode(INITIAL_LETTER + i) + (j + 1);
            seat.textContent = seatId;
            seatId = 'seat' + seatId;
            row.push({
                id: seatId,
                isBusy: false
            });
            seat.type = 'button';
            seat.className = 'seat seat-effect';
            seat.id = seatId;
            document.getElementById("seats").appendChild(seat);
        }
        seats.push(row);
    }
};

const addHorizontalHall = () => {
    let originalSeat = document.getElementById('seat' + String.fromCharCode(DUPLICATE_LETTER) + COLUM_AMOUNT);
    for (let j = 0; j < COLUM_AMOUNT; j++) {
        let seatCopy = originalSeat.cloneNode(false);
        seatCopy.classList.add('seat-hidden');
        seatCopy.textContent = 'HWY'
        seatCopy.id = 'HWY' + j;
        originalSeat.insertAdjacentElement('afterend', seatCopy);
    }
}

const addVerticalHalls = (initialColumn, seatsAmount) => {
    let seatID = '';
    for (let i = 0; i < ROW_AMOUNT; i++) {
        for (let j = 0; j < seatsAmount; j++) {
            seatID = 'seat' + String.fromCharCode(INITIAL_LETTER + i) + (initialColumn + j)
            document.getElementById(seatID).classList.add('seat-hidden');
            seats[i].find(t => t.id === seatID).isBusy = true;
        }
    }
};

const hideSeatsRow = (row, initialColumn, seatsAmount, state) => {
    let seatID = '';
    for (let i = 0; i < seatsAmount; i++) {
        seatID = 'seat' + String.fromCharCode(row) + (initialColumn + i)
        document.getElementById(seatID).classList.add(state);
        seats[row - INITIAL_LETTER].find(t => t.id === seatID).isBusy = true;
    }
};