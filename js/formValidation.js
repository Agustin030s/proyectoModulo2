const validarTexto = (input, min, max) => {
  const texto = input.value;
  if (texto.length === 0) {
    input.classList.add("is-invalid");
    return false;
  } else if (texto.length >= min && texto.length <= max) {
    input.classList.add("is-valid");
    return true;
  }
};

const validarCategoria = (select) => {
  const categoria = select.value;
  if (
    categoria === "Accion" ||
    categoria === "Fantasia" ||
    categoria === "Aventura" ||
    categoria === "Terror" ||
    categoria === "Animado" ||
    categoria === "Deporte"
  ) {
    select.classList.add("is-valid");
    return true;
  } else {
    select.classList.add("is-invalid");
    return false;
  }
};

const validarRam = (select) => {
  const ram = select.value;
  if (ram === "4Gb" || ram === "8Gb" || ram === "16Gb" || ram === "32Gb") {
    select.classList.add("is-valid");
    return true;
  } else {
    select.classList.add("is-invalid");
    return false;
  }
};

const validarAlmacenamiento = (select) => {
  const almacenamiento = select.value;
  if (
    almacenamiento === "40Gb" ||
    almacenamiento === "80Gb" ||
    almacenamiento === "128Gb" ||
    almacenamiento === "240Gb" ||
    almacenamiento === "512Gb"
  ) {
    select.classList.add('is-valid');
    return true;
  }else{
    select.classList.add('is-invalid');
    return false;
  }
};

const validarImagen = (inputImg) =>{
    const patron = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    const imagenUrl = inputImg.value;
    if(patron.test(imagenUrl)){
        inputImg.classList.add('is-valid');
        return true;
    }else{
        inputImg.classList.add('is-invalid');
        return false;
    }
};

const validarContrasenia = (input) =>{
    const patron = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const contrasenia = input.value;
    if(patron.test(contrasenia)){
        input.classList.add('is-valid');
        return true;
    }else{
        input.classList.add('is-invalid');
        return false;
    }
};

const validarEmail = (input) =>{
    const email = input.value;
    const patron = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(patron.test(email)){
        input.classList.add('is-valid');
        return true;
    }else{
        input.classList.add('is-invalid');
        return false;
    }
};

const validarCheckBox = (checkBox) =>{
    if(checkBox.checked){
        checkBox.classList.add('is-valid');
        return true;
    }else{
        checkBox.classList.add('is-invalid');
        return true;
    }
};
