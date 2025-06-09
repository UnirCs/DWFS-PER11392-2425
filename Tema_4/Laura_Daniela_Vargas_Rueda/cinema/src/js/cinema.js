// Variables para la creación y asignación de asientos
const rows = 7;
const columns = 7;
let seatList = [];

document.addEventListener("DOMContentLoaded", () => {
  createSeats();
  // Uso el evento input para que tome el cambio de inmediato
  document.getElementById("num_seats").addEventListener("input", suggestSeats);
});

// Función que crea los asientos y los asigna a la matriz de butacas
const createSeats = () => {
  let seatsContainer = document.getElementById("seats-container");
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.classList.add("row", "justify-content-center", "align-items-start");
    for (let j = 0; j < columns; j++) {
      createRowTitle(row, i, j);
      const seat = document.createElement("div");
      seat.classList.add("col-auto", "border", "border-warning", "p-3", "m-1", "bg-black");
      seat.setAttribute("id", `seat-${i}-${j}`);
      seat.setAttribute("row", i);
      seat.setAttribute("column", j);
      seatList.push({ id: `seat-${i}-${j}`, row: i, column: j, state: true });
      row.appendChild(seat);
    }
    seatsContainer.appendChild(row);
  }
  blockSeats();
};

// Función que bloquea los asientos ocupados
const blockSeats = () => {
  // Datos de prueba para bloquer diferentes asientos
  // ["seat-6-6", "seat-6-3", "seat-5-1", "seat-5-4", "seat-5-6"];
  let blockSeatsList = ["seat-6-6"];
  seatList.forEach((seat) => {
    let seatElement = document.getElementById(seat.id);
    if (blockSeatsList.includes(seat.id)) {
      seatElement.classList.remove("bg-black");
      seatElement.classList.add("bg-secondary");
      seatElement.classList.add("border-secondary");
      seat.state = false;
    }
  });
};

// Función que crea el título de la fila
const createRowTitle = (row, i, j) => {
  if (j === 0) {
    let rowTitle = document.createElement("div");
    rowTitle.classList.add("col-auto", "text-warning", "fw-bold");
    rowTitle.innerText = `Fila ${i + 1}`;
    row.appendChild(rowTitle);
  }
};

// Función que sugiere asientos disponibles según la cantidad de asientos seleccionados
const suggestSeats = () => {
  let seatSelectedList = [];
  const numSeats = parseInt(document.getElementById("num_seats").value);
  let rowAvailable = false;
  let i = rows - 1;
  while (i >= 0 && !rowAvailable) {
    let rowSeatsAvailable = seatList.filter((s) => s.row === i && s.state === true);
    let numSeatsAvailable = rowSeatsAvailable.length;
    if (numSeats <= numSeatsAvailable) {
      let selectedSeats = rowSeatsAvailable.slice(0, numSeats);
      seatSelectedList = selectedSeats;
      rowAvailable = true;
    }
    i--;
  }
  // Modificamos los estilos de los asientos seleccionados
  seatList?.forEach((seat) => {
    let isSelected = seatSelectedList.includes(seat);
    let seatElement = document.getElementById(seat.id);
    if (seat.state) {
      if (isSelected) {
        seatElement.classList.remove("bg-black");
        seatElement.classList.add("bg-warning");
      } else {
        seatElement.classList.remove("bg-warning");
        seatElement.classList.add("bg-black");
      }
    }
  });
};
