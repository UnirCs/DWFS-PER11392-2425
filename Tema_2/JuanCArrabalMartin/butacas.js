document.addEventListener("DOMContentLoaded", () => {
    const salaCine = document.getElementById("salaCine");

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let butaca = document.createElement("div");
            butaca.classList.add("butaca");
            butaca.dataset.estado = "disponible"; // Estado inicial
            salaCine.appendChild(butaca);

            butaca.addEventListener("click", () => {
                if (butaca.dataset.estado === "disponible") {
                    butaca.style.backgroundColor = "red";
                    butaca.dataset.estado = "seleccionada";
                } else if (butaca.dataset.estado === "seleccionada") {
                    butaca.style.backgroundColor = "green";
                    butaca.dataset.estado = "reservada";
                    butaca.setAttribute("title", "Reservada");
                }
            });
        }
    }
});

