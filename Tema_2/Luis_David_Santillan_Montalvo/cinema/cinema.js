const SetupSeats = require('./SetupSeats.js');

// Instantiate the SetupSeats class with 10 rows and 10 seats per row
let setupSeats = new SetupSeats(10, false);
let seats = setupSeats.createSeats();

/**
 * Suggests seats for reservation
 * @param reserveAmount - Number of seats to reserve
 * @returns {Set<any>}
 */
function suggest(reserveAmount) {
    let bookedSeats = new Set(); // Set to store booked seats
    let availableRow = []; // Array to store available rows
    let lastRow = []; // Variable to store the last row with available seats

    // Check if the reserve amount is greater than the number of seats
    if (setupSeats.size < reserveAmount) return bookedSeats;

    // Check if there are rows with consecutive seats according to the reserve amount and add them to the availableRow array
    for (let i = 0; i < seats.length; i++) {
        let availableSeats = seats[i].filter(seat => seat.status === false);
        let consecutiveSeats = checkConsecutiveSeats(availableSeats, reserveAmount);
        if (consecutiveSeats.length > 0) {
            availableRow.push(consecutiveSeats);
        }
    }

    // Get the last row with available seats
    if (availableRow.length > 0) {
        lastRow = availableRow[availableRow.length - 1];
    }

    // Add the ids of the last row to the bookedSeats set
    lastRow.forEach(seat => {
        bookedSeats.add(seat.id);
    });
    return bookedSeats;
}

/**
 * Check if there are enough consecutive seats in a row
 * @param row
 * @param amount
 * @returns {[]}
 */
function checkConsecutiveSeats(row, amount) {
    if (row.length < amount) return [];
    row.sort((a, b) => a.id - b.id);
    for (let i = 0; i <= row.length - amount; i++) {
        let isRowAssignable = true;
        for (let j = 1; j < amount; j++) {
            if (row[i + j].id - row[i + j - 1].id !== 1) {
                isRowAssignable = false;
            }
        }
        if (isRowAssignable) {
            return row.slice(i, i + amount);
        }
    }
    return [];
}

console.log(seats);
console.log(suggest(6));