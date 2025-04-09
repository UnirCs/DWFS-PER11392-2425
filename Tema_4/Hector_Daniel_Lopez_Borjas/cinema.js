window.addEventListener("load", () => {
    const N = 10;
    const letras = 'ABCDEFGHIJ';

    const seatsContainer = document.getElementById('seatsContainer');
    const asientos = document.getElementById('asientos');
    const reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    function renderAsientos() {
        let idContador = 1;
        for (let i = 0; i < N; i++) {
            const filaContainer = document.createElement('div');
            filaContainer.className = 'row mb-4 align-items-center';

            const filaLabel = document.createElement('div');
            filaLabel.className = 'col-auto d-flex align-items-center';
            filaLabel.innerHTML = `<strong>Fila ${i + 1}</strong>`;
            filaContainer.appendChild(filaLabel);

            const filaButtonsCol = document.createElement('div');
            filaButtonsCol.className = 'col';

            const filaButtonsRow = document.createElement('div');
            filaButtonsRow.className = 'row';

            for (let j = 1; j <= N; j++) {
                const columnaBtnCol = document.createElement('div');
                columnaBtnCol.className = 'col-6 col-md-6 col-lg col-xl';

                const columnaButton = document.createElement('button');
                columnaButton.className = 'btn btn-success w-100 mb-1';
                columnaButton.textContent = `${letras[i]}${j}`;
                columnaButton.id = idContador++;

                columnaBtnCol.appendChild(columnaButton);
                filaButtonsRow.appendChild(columnaBtnCol);
            }

            filaButtonsCol.appendChild(filaButtonsRow);
            filaContainer.appendChild(filaButtonsCol);
            seatsContainer.appendChild(filaContainer);
        }
    }

    // Crea la estructura interna de butacas
    function setupButacas() {
        let idContador = 1;
        const butacas = [];

        for (let i = 0; i < N; i++) {
            const fila = [];
            for (let j = 0; j < N; j++) {
                fila.push({
                    id: idContador++,
                    estado: false
                });
            }
            butacas.push(fila);
        }

        return butacas;
    }

    // Sugiere un grupo de asientos contiguos disponibles
    function sugerirAsientos(butacas, cantidad) {
        let resultado = new Set();

        if (cantidad > butacas[0].length) {
            return resultado;
        }

        for (let i = butacas.length - 1; i >= 0 && resultado.size === 0; i--) {
            const fila = butacas[i];

            for (let j = 0; j <= fila.length - cantidad && resultado.size === 0; j++) {
                const grupo = fila.slice(j, j + cantidad);
                const disponibles = grupo.every(asiento => !asiento.estado);

                if (disponibles) {
                    resultado = new Set(grupo.map(asiento => asiento.id));
                }
            }
        }

        return resultado;
    }

    asientos.addEventListener('change', (event) => {
        const cantidad = parseInt(event.target.value, 10);
        const resultado = sugerirAsientos(butacas, cantidad);
        document.querySelectorAll('.btn-warning').forEach(el => {
            el.classList.remove('btn-warning');
            el.classList.add('btn-success');
        });

        resultado.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.classList.remove('btn-success');
                elemento.classList.add('btn-warning');
            }
        });
    });

    renderAsientos();
    const butacas = setupButacas();
});