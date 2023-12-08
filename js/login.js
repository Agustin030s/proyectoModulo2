import { getLocalStorage } from "./dataStorageManager.js";
import { desencriptarContrasenia, key } from "./auxiliarFunctions.js";
import { limpiarFormularios} from "./auxiliarFunctions.js";

document.getElementById("loginForm").addEventListener("submit", function (event) {
    console.log("Formulario enviado");
  
    event.preventDefault(); 
  
    const correo = document.getElementById("correo").value;
    const contrasenia = document.getElementById("contrasenia").value;
  
    console.log("Correo:", correo);
    console.log("Contraseña:", contrasenia);
  
    const usuarios = getLocalStorage("usuarios") || [];
  
    console.log("Usuarios en localStorage:", usuarios);
  
    const usuario = usuarios.find((user) => (user.correo === correo || user.usuario === correo));
  
    console.log("Usuario encontrado:", usuario);
  
    if (!usuario) {
      alert("Credenciales incorrectas. Verifica tu correo electrónico o nombre de usuario y contraseña.");
      console.log("Credenciales incorrectas. Verifica tu correo electrónico o nombre de usuario y contraseña.");
      return false; 
    }
  
    const contraseniaDesencriptada = desencriptarContrasenia(usuario.contrasenia, key);
  
    if (contrasenia === contraseniaDesencriptada) {
      alert("Inicio de sesión exitoso");

      if (usuario.rol === "administrador") {
        alert("Bienvenido Administrador");
      }

      window.location.href = "../index.html";
    } else {
      alert("Contraseña incorrecta. Intenta de nuevo.");
      console.log("Contraseña incorrecta. Intenta de nuevo.");
      limpiarFormularios(document.getElementById("loginForm")); 
      return false; 
    }
});