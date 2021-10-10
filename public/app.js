const URL = 'https://script.google.com/macros/s/AKfycbxguKhGb5zGUoBRnU-ro-Zd7PIxskucRPq3gFhyic9ZuAtUKmLe/exec';

const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener("click", (e) => {
  //e.preventDefault();

  let data = {
    "Nombre": nombre.value,
    "Identificacion": identificacion.value,
    "Fecha": String(new Date())
  };

  fetch(URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify( data )
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