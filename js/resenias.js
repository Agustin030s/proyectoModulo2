import { Reseña } from "./clases/classJuego.js";
import { getLocalStorage, insertLocalStorage, getSessionStorage } from "./dataStorageManager.js";

let d = document;
let titleJuego = d.getElementById("tituloJuego");
let containerReseña = d.getElementById("reseñas");
let añadirReseñaBtn = d.getElementById("añadirReseñaBtn");
let textoReseña = d.getElementById("textoReseña");
let btnLike = d.getElementById("btnLike");
let btnDisLike = d.getElementById("btnDislike");
let pLikes = d.getElementById("pLikes");
let pDislikes = d.getElementById("pDislikes");

let reseña = new Reseña();
let usuarioLogueado = getSessionStorage('sesion');

/*
Funcion para mostrar comentarios
*/
let mostrarComentarios = (comentarios) => {
  containerReseña.innerHTML = "";
  comentarios.map((e) => {
    let div = d.createElement("div");
    let p = d.createElement("p");
    p.textContent = e;
    div.classList.add("containerComentario");
    p.classList.add("pComentario");
    div.appendChild(p);
    containerReseña.appendChild(div);
  });
};

/*Se crea la logica para guardar las reseñas*/

let juegos = getLocalStorage("juegos");

let juego = juegos.find((e) => e.nombre === titleJuego.textContent);
let juegoIndex = juegos.findIndex((e) => e.nombre === titleJuego.textContent);

let reseniasData = {
  comentarios: juego.resenias.comentarios || [],
  likes: juego.resenias.likes || 0,
  dislikes: juego.resenias.dislikes || 0,
};

if (reseniasData.comentarios.length > 0) {
  let parrafoPrincipal = d.createElement("p");
  parrafoPrincipal.classList.add("parrafoPrincipal");
  parrafoPrincipal.innerHTML = `Se muestran ${
    reseniasData.comentarios.length
  } reseñas con un total de  <b id="promedio">${
    (reseniasData.likes + reseniasData.dislikes) / 2
  }</b> ${
    (reseniasData.likes + reseniasData.dislikes) / 2 > 50
      ? '<b id="positivos">"Muy Positivos"</b>'
      : '<b id="negativos">"Muy Negativos"</b>'
  }`;
  containerReseña.appendChild(parrafoPrincipal);

  mostrarComentarios(reseniasData.comentarios);
} else {
  containerReseña.innerHTML =
    "El juego aun no tiene reseñas... Quieres añadir?";
}

/*Logica para añadir las reseñas*/

añadirReseñaBtn.addEventListener("click", (e) => {

  if(usuarioLogueado && usuarioLogueado.rol === 'invitado'){
    let texto = `${usuarioLogueado.usuario}: ${textoReseña.value}`;
    reseña.agregarComentario(texto);
  
    reseniasData.comentarios.push(texto);
    juego.resenias = reseniasData;
  
    insertLocalStorage("juegos", juegos);
  
    mostrarComentarios(reseniasData.comentarios);
    d.getElementById("textoReseña").value = '';
  }else{
    Swal.fire({
      title: "Ups!",
      text: "Debes iniciar sesión para poder dejar una reseña.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iniciar Sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = window.location.origin + '/pages/login.html'
      }
    });
  }
});

pLikes.innerHTML = reseniasData.likes;
pDislikes.innerHTML = reseniasData.dislikes;

btnLike.addEventListener("click", (e) => {
  reseniasData.likes += 1;
  reseña.agregarVotoPositivo();
  juego.resenias = reseniasData;
  insertLocalStorage("juegos", juegos);

  pLikes.innerHTML = reseniasData.likes;
  pDislikes.innerHTML = reseniasData.dislikes;
});

btnDisLike.addEventListener("click", (e) => {
  reseniasData.dislikes += 1;
  reseña.agregarVotoPositivo();
  juego.resenias = reseniasData;
  insertLocalStorage("juegos", juegos);

  pLikes.innerHTML = reseniasData.likes;
  pDislikes.innerHTML = reseniasData.dislikes;
});
