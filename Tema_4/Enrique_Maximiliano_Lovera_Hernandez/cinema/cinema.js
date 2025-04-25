function setupSeats(totalRows, totalColumns) {
  let idCounter = 1;
  return Array.from({ length: totalRows }, () =>
    Array.from({ length: totalColumns }, () => ({
      id: idCounter++,
      estado: false,
    }))
  );
}

function assignSeatIds(seats) {
  Array.from(seats).forEach((seat, index) =>
    seat.setAttribute("id", index + 1)
  );
}

function suggestSeats(seatsToReserve) {
  const rowSize = butacas.length;
  const columnSize = butacas[0].length;
  const maxStartColumn = columnSize - seatsToReserve;

  if (seatsToReserve > columnSize || seatsToReserve <= 0) {
    return new Set(); // No se pueden reservar más asientos que los disponibles en una fila
  }

  for (let row = rowSize - 1; row >= 0; row--) {
    for (let col = 0; col <= maxStartColumn; col++) {
      if (areSeatsAvailable(row, col, seatsToReserve)) {
        return new Set(
          butacas[row].slice(col, col + seatsToReserve).map((seat) => seat.id)
        );
      }
    }
  }
  return new Set();
}

function areSeatsAvailable(row, startCol, seatsToReserve) {
  return !butacas[row]
    .slice(startCol, startCol + seatsToReserve)
    .some((seat) => seat.estado);
}

function reserveSeats(desiredSeats) {
  const reservedSeats = suggestSeats(desiredSeats);
  if (reservedSeats.size === 0) {
    alert("No hay asientos disponibles para cubrir la solicitud.");
    return;
  }

  reservedSeats.forEach((seatId) => {
    const seat = document.getElementById(seatId);
    if (seat) {
      toggleSeatState(seat, true);
    }
  });
}

function toggleSeatState(seat, isSelected) {
  if (isSelected) {
    addCssClass(seat, "selected");
  } else {
    removeCssClass(seat, "selected");
  }
  updateSeatState(parseInt(seat.id), isSelected);
}

function updateSeatState(id, value) {
  const row = Math.floor((id - 1) / butacas[0].length);
  const col = (id - 1) % butacas[0].length;
  butacas[row][col].estado = value;
}

function handleSeatChange(event) {
  const desiredSeats = parseInt(event.target.value);
  const seats = document.querySelector("#seatsGrid").children;

  Array.from(seats).forEach((seat) => toggleSeatState(seat, false));

  if (desiredSeats) {
    reserveSeats(desiredSeats);
  }
}

function addCssClass(element, className) {
  element.classList.add(className);
}

function removeCssClass(element, className) {
  element.classList.remove(className);
}

document.addEventListener("DOMContentLoaded", () => {
  const seats = document.querySelector("#seatsGrid").children; // Esto devuelve un HTMLCollection
  const totalRows = document.querySelector("#seatsRows").children.length;
  const totalColumns = seats.length / totalRows;

  assignSeatIds(seats);
  butacas = setupSeats(totalRows, totalColumns);
});
