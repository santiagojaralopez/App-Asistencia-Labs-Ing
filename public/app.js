const URL = 'https://script.google.com/macros/s/AKfycbxguKhGb5zGUoBRnU-ro-Zd7PIxskucRPq3gFhyic9ZuAtUKmLe/exec';

const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener("click", (e) => {
  //e.preventDefault();

  let data = {
    "Nombre": nombre.value,
    "Identificacion": identificacion.value,
    "Fecha": new Date()
  };

  fetch(URL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify( data ) // body data type must match "Content-Type" header
    }
  )
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});