function getJoke() {
    let url = "https://api.chucknorris.io/jokes/random";
    let chiste;
    fetch(url)
        .then(response => response.json())
        .then(result => document.getElementById("chiste_text").innerHTML = result.value)
        .catch(error => {
            console.log("Error fetching joke: " + error);
        })
        .finally(() => {
            // Nothing to do here, but we can log the result if needed
        });
}
