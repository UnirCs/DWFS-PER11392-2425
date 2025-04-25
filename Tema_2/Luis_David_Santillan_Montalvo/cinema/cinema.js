const SetupSeats = require('./SetupSeats.js');

// Instantiate the SetupSeats class with 10 rows and 10 seats per row
let setupSeats = new SetupSeats(10);
let seats = setupSeats.createSeats();

/**
 * Suggests seats for reservation
 * @param reserveAmount - Number of seats to reserve
 * @returns {Set<Number>} - Set of booked id seats
 */
function suggest(reserveAmount) {
    const bookedSeats = new Set(); // Set to store booked seats
    if (reserveAmount <= setupSeats.size) {
        for (let i = setupSeats.size - 1; i >= 0 && bookedSeats.size < reserveAmount; i--) {
            bookedSeats.clear(); // Clear booked seats for each row
            for (let j = 0; j < setupSeats.size && bookedSeats.size < reserveAmount && setupSeats.size - j >= reserveAmount - bookedSeats.size; j++) {
                // Check if the seat is free
                if (!seats[i][j].status) {
                    bookedSeats.add(seats[i][j].id);
                } else {
                    bookedSeats.clear(); // Clear booked seats if a seat is not free
                }
            }
        }
    }
    return bookedSeats;
}

console.log(seats);
console.log(suggest(2));
