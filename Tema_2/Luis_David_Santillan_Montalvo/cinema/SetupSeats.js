/**
 * Class to set up the seats for the cinema
 */
class setupSeats {
    constructor(size) {
        this.size = size;
    }

    /**
     * Creates the seats for the cinema
     * @returns {Array} Array of seats
     */
    createSeats() {
        let id = 1;
        let seats = [];

        for (let i = 0; i < this.size; i++) {
            // New row
            let row = [];
            for (let j = 0; j < this.size; j++) {
                // New seat
                row.push({
                    id: id++,
                    status: Math.random() >= 0.5// Status initial free
                });
            }
            seats.push(row);
        }
        return seats;
    }
}

module.exports = setupSeats;