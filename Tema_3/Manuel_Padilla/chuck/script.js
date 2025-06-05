
async function getChiste() {
    let url = "https://api.chucknorris.io/jokes/random";
    let fetchResponse = await fetch(url);
    let json = await fetchResponse.json();
    let joke = json.value;

    document.getElementById("chiste").innerHTML = joke;

    return joke;
}

(async () => {

    console.log("Funcion fetchSincrono");
    let sincrono = await getChiste();
    console.log(sincrono);

})();
