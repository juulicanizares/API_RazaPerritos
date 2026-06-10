const urlBase = "https://dog.ceo/api";


document.getElementById("btn-listar").addEventListener("click", async function() {
  const respuesta = await fetch(urlBase + "/breeds/list/all");
  const datos = await respuesta.json();
  const listaDeRazas = Object.keys(datos.message);
  const listaNombres = listaDeRazas
    .map(function(nombreRaza) { return "<li>" + nombreRaza + "</li>"; })
    .join("");

  document.getElementById("lista-razas").innerHTML = listaNombres;
});

document.getElementById("btn-imagen").addEventListener("click", async function() {
  const nombreRaza   = document.getElementById("input-raza").value.toLowerCase();
  const elementoFoto = document.getElementById("foto-raza");
  const elementoError = document.getElementById("error-imagen");

  elementoFoto.style.display = "none";
  elementoError.textContent  = "";

  if (nombreRaza === "") {
    elementoError.textContent = "Escribe el nombre de una raza.";
    return;
  }

  const respuesta = await fetch(urlBase + "/breed/" + nombreRaza + "/images/random");
  const datos = await respuesta.json();

  if (datos.status === "error") {
    elementoError.textContent = "Raza no encontrada. Intenta con otra.";
    return;
  }

  elementoFoto.src = datos.message;
  elementoFoto.style.display = "block";
});

document.getElementById("btn-subrazas").addEventListener("click", async function() {
  const nombreRaza    = document.getElementById("input-subraza").value.toLowerCase();
  const listaSubrazas = document.getElementById("lista-subrazas");
  const elementoError = document.getElementById("error-subraza");

  listaSubrazas.innerHTML = "";
  elementoError.textContent = "";

  if (nombreRaza === "") {
    elementoError.textContent = "Escribe el nombre de una raza.";
    return;
  }

  const respuesta = await fetch(urlBase + "/breeds/list/all");
  const datos = await respuesta.json();
  const arregloSubrazas = datos.message[nombreRaza];

  if (!arregloSubrazas) {
    elementoError.textContent = "Raza no encontrada. Intenta con otra.";
    return;
  }

  if (arregloSubrazas.length === 0) {
    elementoError.textContent = "Esta raza no tiene subrazas.";
    return;
  }

  listaSubrazas.innerHTML = arregloSubrazas
    .map(function(nombreSubraza) { return "<li>" + nombreSubraza + "</li>"; })
    .join("");
});
