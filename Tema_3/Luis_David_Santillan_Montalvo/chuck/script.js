/**
 * This function fetches a random Chuck Norris joke from the API
 * @returns {Promise<*>}
 */
async function fetchChuckJokes() {
    let url = "https://api.chucknorris.io/jokes/random";
    let fetchResponse = await fetch(url);
    let json = await fetchResponse.json();
    document.getElementById("chuck-joke").innerHTML = json.value;
}

document.getElementById("get-chuck-joke").onclick = function () {
    fetchChuckJokes();
};
