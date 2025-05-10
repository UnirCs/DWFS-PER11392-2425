const SEATS_AMOUNT_ID = 'seatsAmount';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(SEATS_AMOUNT_ID).addEventListener('input', selectSeats);
});

document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Sillas reservadas");
});

const selectSeats = () => {
    seats.forEach(seat => {
        seat.forEach(t => document.getElementById(t.id).classList.remove('takenState'));
    });
    let seatsSelect = suggest(Number.parseInt(document.getElementById(SEATS_AMOUNT_ID).value));
    if (seatsSelect.length > 0) {
        document.getElementById('seatsAmountError').hidden = true;
        seatsSelect.forEach(seat => {
            document.getElementById(seat.id).classList.add('takenState');
        });
    }
    else
        document.getElementById('seatsAmountError').hidden = false;
};

const suggest = (seatsAmount) => {
    let suggestions = [];
    if(seatsAmount <= MAX_AMOUNT_AVAILABLE_SEATS && seatsAmount >= 1) {
        let temporalSuggestions = [];
        let found = false;
        for (let i = ROW_AMOUNT - 1; i >= 0 && !found; i--) {
            if (seats[i].filter(seat => !seat.isBusy).length >= seatsAmount) {
                for (let j = COLUM_AMOUNT - 1; j >= 0 && !found; j--) {
                    temporalSuggestions = seats[i].slice(j - seatsAmount + 1, j + 1);
                    suggestions = temporalSuggestions.filter(seat => !seat.isBusy).length === seatsAmount ? temporalSuggestions : suggestions;
                    found = suggestions.length > 0;
                }
            }
        }
    }
    return suggestions;
};