const N = 10;
let butacas = setup();
console.log('Butacas inicializadas');

function setup() {
    let idContador = 1;
    let butacas = [];
    for (let i = 0; i < N; i++) {
        let fila = [];
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


function suggest(butacas, asientos) {
    let resultado = new Set();
    if (asientos > butacas[0].length) {
        return resultado;
    }
    for (let i = butacas.length - 1; i >= 0 && resultado.size === 0; i--) {
        const fila = butacas[i];
        for (let j = 0; j <= fila.length - asientos && resultado.size === 0; j++) {
            const grupoAsientos = fila.slice(j, j + asientos);
            if (grupoAsientos.every(asiento => !asiento.estado)) {
                resultado = new Set(grupoAsientos.map(asiento => asiento.id));
            }
        }
    }

    console.log("Asientos sugeridos:", resultado);
    return resultado;
}

function handleOnInput() {
    suggest(butacas, 8);
};