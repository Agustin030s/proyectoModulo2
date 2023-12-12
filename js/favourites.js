import { getLocalStorage, insertLocalStorage } from "./dataStorageManager.js";
import { cargaInicialDeFavoritos } from "./auxiliarFunctions.js";

const listaFavoritos = getLocalStorage("favoritos");

const offCanvas = new bootstrap.Offcanvas(
  document.getElementById("offcanvasFavoritos")
);

const abrirCanvas = () => {
  offCanvas.show();
};

window.eliminarFavorito = (codigo) => {
  const posicionJuego = listaFavoritos.findIndex(
    (game) => game.codigo === codigo
  );
  listaFavoritos.splice(posicionJuego, 1);
  insertLocalStorage("favoritos", listaFavoritos);
  const canvas = document.querySelector(".offcanvas-body");
  canvas.removeChild(canvas.children[posicionJuego + 1]);
};

btnFavoritos.addEventListener("click", abrirCanvas);

cargaInicialDeFavoritos(listaFavoritos);
