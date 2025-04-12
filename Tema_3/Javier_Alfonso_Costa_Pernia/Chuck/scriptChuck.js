//const myResponse = document.querySelector("mensaje");
//const myRequest = new Request("products.json");

let parrafo = document.getElementById("mensaje");

fetch(url)
    .then((response) => response.json())
    .then((data) => { parrafo.innerHTML += data; })
    .catch(console.error);

async function chuckJoke() {
    let url = "https://api.chucknorris.io/jokes/random";
    let fetchResponse = await fetch(url);
    let json = await fetchResponse.json();
    console.log("Response: " + json);
    return json;
}

/*(async () => {

    console.log("Ejecutando funcion fetchSincrono");
    let factSincrono = await fetchSincrono();
    console.log(factSincrono);
    console.log("fetchSincrono ha terminado");

})();*/



