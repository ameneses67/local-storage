// variables
const formulario = document.querySelector("form");
const misTweets = document.querySelector("#mis-tweets");
const textArea = document.querySelector("textarea");
let tweets = [];

// eventos
function eventListeners() {
  // cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // cuando el documento está listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || []; // si no hay nada en localStorage se asigna arreglo vacío para que no haya error con el tweets.forEach y tweets.length usados abajo

    htmlTweets();
  });
}

eventListeners();

// agregar tweets
function agregarTweet(e) {
  e.preventDefault();

  // textarea dond ese escribe el tweet
  const tweet = document.querySelector("textarea").value;

  // validación que se escriba el tweet
  if (tweet === "") {
    mostrarError("Por favor escribe el tweet");
    return; // evita que se ejecuten más líneas de código
  }

  const tweetObj = {
    id: Date.now(),
    tweet, // tweet es lo mismo que tweet: tweet
  };

  // añadir al arreglo de tweets
  tweets.push(tweetObj); // o tweets = {...tweets, tweetObj};

  // crear html de los tweets
  htmlTweets();

  // reiniciar el formulario
  formulario.reset();
}

// mostrar tweets
function htmlTweets() {
  limpiarTweets();
  // si no hay tweets que no se ejecute
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //crear botón para eliminar
      const btnElminar = document.createElement("a");
      btnElminar.classList.add("borrar");
      btnElminar.textContent = "X";

      // función para eliminar del dom
      btnElminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // crear html
      const li = document.createElement("li");

      // añadir contenido
      li.textContent = tweet.tweet;

      // insertar botón al li
      li.appendChild(btnElminar);

      // insertarlo en la sección de html correspondiente
      misTweets.appendChild(li);
    });
  }

  // actualiza el localStorage
  sincronizarStorage();
}

// mostrar mensaje validación
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  // insertar contenido
  if (!document.querySelector(".error")) {
    textArea.after(mensajeError);
  }

  // quitar mensaje después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// limpiar misTweets para que no se repita el array
function limpiarTweets() {
  while (misTweets.firstChild) {
    misTweets.removeChild(misTweets.firstChild);
  }
}

// agregar los tweets al localStorage
function sincronizarStorage(params) {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// eliminar un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id); // en el arreglo dejamos los que no se quieren borrar

  htmlTweets();
}
