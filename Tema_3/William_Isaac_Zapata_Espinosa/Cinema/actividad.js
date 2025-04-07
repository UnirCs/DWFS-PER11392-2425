// Definir el tamaño de la matriz de butacas
const N = 10 // Número de filas y columnas

// Matriz para almacenar las butacas
let butacas = []

// Conjunto para almacenar los asientos seleccionados actualmente
const selectedSeats = new Set()

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1
    butacas = []

    for (let i = 0; i < N; i++) {
        // Nueva fila
        const fila = []
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false, // Estado inicial libre
            })
        }
        butacas.push(fila)
    }

    console.log("Las butacas han sido inicializadas correctamente")

    // Convertir todos los asientos a disponibles (verde) al inicio
    document.querySelectorAll(".seat").forEach((seat) => {
        // Quitar el atributo disabled de todos los asientos
        seat.removeAttribute("disabled")

        // Quitar todas las clases de color y agregar btn-success
        seat.classList.remove("btn-danger", "btn-primary", "btn-purple")
        seat.classList.add("btn-success")
    })

    return butacas
}

/**
 * Sugiere asientos contiguos para reservar.
 * @param {number} numAsientos - Número de asientos a reservar.
 * @returns {Set} - Set con los IDs de los asientos sugeridos o set vacío si no es posible.
 */
function suggest(numAsientos) {
    // Limpiar selecciones anteriores
    clearSelections()

    // Obtener el número de asientos desde el input
    numAsientos = Number.parseInt(document.getElementById("numSeats").value)
    console.log(`Buscando ${numAsientos} asientos contiguos...`)

    // Verificar si el número de asientos es válido
    if (numAsientos <= 0 || isNaN(numAsientos)) {
        console.log("Número de asientos inválido")
        return new Set()
    }

    // Buscar asientos disponibles en la interfaz
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]

    // Recorrer filas desde la más lejana (última) hasta la más cercana (primera)
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i]

        // Obtener todos los asientos disponibles en esta fila
        const seatButtons = document.querySelectorAll(".seat")

        // Filtrar por fila actual y que sean verdes (disponibles)
        const rowSeats = Array.from(seatButtons).filter((seat) => {
            return seat.textContent.trim().startsWith(row) && seat.classList.contains("btn-success")
        })

        // Ordenar por número de asiento
        rowSeats.sort((a, b) => {
            const aNum = Number.parseInt(a.textContent.trim().substring(1))
            const bNum = Number.parseInt(b.textContent.trim().substring(1))
            return aNum - bNum
        })

        // Buscar secuencia de asientos contiguos
        for (let j = 0; j <= rowSeats.length - numAsientos; j++) {
            let contiguous = true
            const contiguousSeats = []

            for (let k = 0; k < numAsientos; k++) {
                const currentSeat = rowSeats[j + k]
                const nextSeat = rowSeats[j + k + 1]

                contiguousSeats.push(currentSeat)

                // Verificar si los asientos son contiguos (solo para k < numAsientos - 1)
                if (k < numAsientos - 1 && nextSeat) {
                    const currentNum = Number.parseInt(currentSeat.textContent.trim().substring(1))
                    const nextNum = Number.parseInt(nextSeat.textContent.trim().substring(1))

                    if (nextNum - currentNum !== 1) {
                        contiguous = false
                        break
                    }
                }
            }

            if (contiguous && contiguousSeats.length === numAsientos) {
                // Marcar estos asientos como seleccionados
                contiguousSeats.forEach((seat) => {
                    seat.classList.remove("btn-success")
                    seat.classList.add("btn-primary")
                    selectedSeats.add(seat.textContent.trim())
                })

                console.log("Asientos sugeridos:", Array.from(selectedSeats))
                return selectedSeats
            }
        }
    }

    console.log("No se encontraron suficientes asientos contiguos")
    return new Set()
}

// Función para limpiar selecciones anteriores
function clearSelections() {
    // Restaurar todos los asientos seleccionados a su estado original
    document.querySelectorAll(".btn-primary").forEach((seat) => {
        seat.classList.remove("btn-primary")
        seat.classList.add("btn-success")
    })

    // Limpiar el conjunto de asientos seleccionados
    selectedSeats.clear()
}

// Función para confirmar la reserva de asientos
function confirmReservation() {
    if (selectedSeats.size === 0) {
        alert("No hay asientos seleccionados para reservar")
        return
    }

    // Cambiar los asientos seleccionados a ocupados (rojo)
    selectedSeats.forEach((seatId) => {
        const seatButton = Array.from(document.querySelectorAll(".seat")).find((seat) => seat.textContent.trim() === seatId)

        if (seatButton) {
            seatButton.classList.remove("btn-primary", "btn-success")
            seatButton.classList.add("btn-danger")
            seatButton.disabled = true
        }
    })

    console.log(`Se han reservado ${selectedSeats.size} asientos: ${Array.from(selectedSeats).join(", ")}`)
    selectedSeats.clear()
}

// Función para manejar clics en asientos individuales
function handleSeatClick(event) {
    const seat = event.target
    const seatId = seat.textContent.trim()

    // Si el asiento ya está ocupado, no hacer nada
    if (seat.classList.contains("btn-danger") || seat.disabled) {
        return
    }

    // Si el asiento ya está seleccionado, deseleccionarlo
    if (seat.classList.contains("btn-primary")) {
        seat.classList.remove("btn-primary")
        seat.classList.add("btn-success")
        selectedSeats.delete(seatId)
    } else {
        // Seleccionar el asiento
        seat.classList.remove("btn-success")
        seat.classList.add("btn-primary")
        selectedSeats.add(seatId)
    }

    console.log("Asientos seleccionados:", Array.from(selectedSeats))
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar la matriz de butacas
    setup()

    // Agregar event listeners a todos los asientos
    document.querySelectorAll(".seat").forEach((seat) => {
        seat.addEventListener("click", handleSeatClick)
    })

    // Crear y agregar el botón de confirmar reserva
    const reservationCard = document.querySelector(".card:first-of-type .card-body")
    const confirmButton = document.createElement("button")
    confirmButton.className = "btn btn-danger mt-3"
    confirmButton.textContent = "Confirmar Reserva"
    confirmButton.addEventListener("click", confirmReservation)
    reservationCard.appendChild(confirmButton)

    // Sugerir asientos iniciales
    const numSeats = document.getElementById("numSeats")
    suggest(Number.parseInt(numSeats.value))

    // Actualizar la leyenda para quitar VIP y Regular
    const legendItems = document.querySelectorAll(".card-body .d-flex.align-items-center")
    legendItems.forEach((item) => {
        const text = item.querySelector("span").textContent
        if (text.includes("VIP") || text.includes("Regular")) {
            item.remove()
        }
    })
})

// Agregar estilos para el screen
const style = document.createElement("style")
style.textContent = `
    .screen {
        height: 10px;
        background-color: #ccc;
        width: 80%;
        border-radius: 50% 50% 0 0;
        margin-bottom: 30px;
        position: relative;
        padding-top: 30px;
    }
    .screen p {
        position: absolute;
        top: -25px;
        width: 100%;
    }
    .seat {
        width: 35px;
        height: 35px;
        margin: 3px;
        padding: 0;
        font-size: 0.8rem;
    }
`
document.head.appendChild(style)

