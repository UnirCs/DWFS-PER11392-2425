function prueba() {
  fetch("https://api.chucknorris.io/jokes/random")
      .then(res => {
        if(res.status !== 200 && res.ok !== true) {
          console.log('NO SE PUEDE OBTENER EL CHISTE')
        }
        return  res.json()
      })
      .then(data => {
        let jokes = document.getElementById('chuckchiste');
        jokes.innerText = data.value;
      })
      .catch(err => {
        console.log('Error from api:', err)
        let jokes = document.getElementById('chuckchiste');
        jokes.innerText = 'NO PUDE OBTENER EL CHISTE'
      });
}

