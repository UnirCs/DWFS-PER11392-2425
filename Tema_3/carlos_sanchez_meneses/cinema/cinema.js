// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas


function showSits(butacas){
    const contenedor = document.getElementById("contenedor");
    for (let i = 0; i < N; i++){
        const auxRow = document.createElement("div");
        auxRow.classList.add(`row-index-${i}`);
        contenedor.append(auxRow);
        for(let j = 0; j < N; j++){
            const sit = document.createElement("div");
            sit.classList.add(`sit-index-${j}`);
            auxRow.append(auxRow);
        }
    }

}
// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}
const buttonElement=`<div class="">
            <button
              type="button"
              class="btn"
              role="button"
              data-bs-toggle="button"
            >
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="44"
                height="44"
                fill="currentColor"
              >
                <!-- Asiento -->
                <rect
                  x="12"
                  y="20"
                  width="40"
                  height="20"
                  rx="4"
                  ry="4"
                  fill="#6c757d"
                ></rect>
                <!-- Respaldo -->
                <rect
                  x="16"
                  y="6"
                  width="32"
                  height="16"
                  rx="4"
                  ry="4"
                  fill="#6c757d"
                ></rect>
                <!-- Patas -->
                <rect x="14" y="42" width="8" height="12" fill="#6c757d"></rect>
                <rect x="42" y="42" width="8" height="12" fill="#6c757d"></rect>
                <!-- Base -->
                <rect
                  x="10"
                  y="54"
                  width="44"
                  height="6"
                  rx="3"
                  ry="3"
                  fill="#6c757d"
                ></rect>
              </svg>
            </button>
          </div>`
// Inicializar la matriz
let butacas = setup();

const contenedor = document.getElementById("contenedor");
function showSits(butacas){

    butacas.forEach((item,i) => {
        const auxRow = document.createElement("div");
        auxRow.id = `row-index-${i}`
        auxRow.className='d-flex d-flex flex-row mb-3'
        contenedor.append(auxRow);
        item.forEach(item => {
            const sit = document.createElement("div");
            sit.id = `sit-index-${item.id}`;
            const texto = document.createElement("p");
            texto.style="font-size: 10px; text-align: center;"
            texto.innerText = item.id
            sit.innerHTML = buttonElement;
            sit.appendChild(texto)
            auxRow.append(sit);
        })

        // for(let j = 0; j < N; j++){
        //     const sit = document.createElement("div");
        //     sit.classList.add(`sit-index-${j}`);
        //     auxRow.append(auxRow);
        // }
    })

}

// Imprimir la matriz
showSits(butacas);

const suggest = (numButacas) => {
    let listSuggest=[]
    for (let j = butacas.length-1; j >= 0; j--) {
        let auxJuntos= 0
        let limit = butacas[j].length
        for (let k = 0; k < limit; k++) butacas[j][k] ? auxJuntos += 1: auxJuntos = 0;
        if(auxJuntos >= numButacas){
            for (let k = 0; k < numButacas; k++) {
                listSuggest.push(butacas[j][k].id);
            }
            break
        }
    }
    return listSuggest;
}

document.getElementById("input_reserva").oninput = (e) => {
  console.log("sugerencia",suggest(Number(e.target.value)));
  console.log(e.target.value);
}
