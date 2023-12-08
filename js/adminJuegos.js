import { Juego, RequisitosDelSistema } from './clases/classJuego.js';
import { limpiarFormularios, mostrarAlerta } from './auxiliarFunctions.js';
import { getLocalStorage, insertLocalStorage } from './dataStorageManager.js';

const formJuegos = document.getElementById('formJuegos');
const modalJuegos = new bootstrap.Modal(document.getElementById('modalJuegos'));
const tablaDeJuego = document.getElementById('datosJuego');
const juegos = getLocalStorage('juegos') || [];

formJuegos.addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevoJuego = validarYObtenerDatos();

    if (nuevoJuego) {

        juegos.push(nuevoJuego);
        insertLocalStorage('juegos', juegos);
        
        limpiarFormularios(formJuegos);
        modalJuegos.hide();
        crearFila(nuevoJuego,juegos.length)

        console.log('Juego agregado exitosamente');
        mostrarAlerta('Juego agregado exitosamente', 'success');
    }
});

// Funcion para crear la tabla con los datos de cada juego
const crearFila = (juego,fila) => {
    tablaDeJuego.innerHTML +=`
    <tr>
        <th scope="row">${fila}</th>
        <td class="simplificarTexto overflow-hidden text-truncate">${juego.nombre}</td>
        <td>${juego.precio}</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${juego.categoria}</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${juego.imagen}</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${juego.descripcion}</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${juego.desarrollador}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info" onclick="verDetalle('${juego.codigo}')">Detalles</button>
                <button type="button" class="btn btn-warning mx-2">Editar</button>
                <button type="button" class="btn btn-danger" onclick="eliminarJuego('${juego.codigo}')">Eliminar</button>
            </div>
        </td>
    </tr>` 
}

// Funcion para cargar los juegos 
const cargaInicialDeJuegos = () => {
    if (juegos.length !== 0){
        juegos.map((juego,posicion) => crearFila(juego,posicion + 1));
    } else {
        console.log('No hay juegos cargados')
    }
}

function validarYObtenerDatos() {
    const codigo = uuidv4();
    const nombre = document.getElementById('nombre').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!nombre || isNaN(precio) || !categoria || !imagen || !descripcion) {
        mostrarAlerta('Por favor, completa todos los campos', 'error');
        return null;
    }

    const sistOperativo = document.getElementById('sistOperativo').value.trim();
    const procesador = document.getElementById('procesador').value.trim();
    const ram = document.getElementById('ram').value;
    const tarjGraf = document.getElementById('tarjGraf').value.trim();
    const almacenamiento = document.getElementById('almacenamiento').value;

    if (!sistOperativo || !procesador || !ram || !tarjGraf || !almacenamiento) {
        mostrarAlerta('Por favor, completa todos los campos de requisitos del sistema', 'error');
        return null;
    }

    const requisitos = new RequisitosDelSistema(sistOperativo, procesador, ram, tarjGraf, almacenamiento);

    const sistOperativoMin = document.getElementById('sistOperativoMin').value.trim();
    const procesadorMin = document.getElementById('procesadorMin').value.trim();
    const ramMin = document.getElementById('ramMin').value;
    const tarjGrafMin = document.getElementById('tarjGrafMin').value.trim();
    const almacenamientoMin = document.getElementById('almacenamientoMin').value;

    if (!sistOperativoMin || !procesadorMin || !ramMin || !tarjGrafMin || !almacenamientoMin) {
        mostrarAlerta('Por favor, completa todos los campos de requisitos mínimos', 'error');
        return null;
    }

    const requisitosMinimos = new RequisitosDelSistema(sistOperativoMin, procesadorMin, ramMin, tarjGrafMin, almacenamientoMin);

    const desarrollador = document.getElementById('desarrollador').value.trim();

    if (!desarrollador) {
        mostrarAlerta('Por favor, ingresa el nombre del desarrollador', 'error');
        return null;
    }

    const nuevoJuego = new Juego(codigo, nombre, precio, categoria, imagen, descripcion, requisitos, requisitosMinimos, desarrollador);

    return nuevoJuego;
}

window.verDetalle = (codigoDeJuego) => {
    window.location.href = './detalleJuego.html?codigo=' + codigoDeJuego;
}


cargaInicialDeJuegos();

window.eliminarJuego = (codigo) => {
    const juegoAEliminar = juegos.find(juego => juego.codigo === codigo);

    if (juegoAEliminar) {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar el juego "${juegoAEliminar.nombre}"?`);

        if (confirmacion) {
            const indiceJuego = juegos.findIndex(juego => juego.codigo === codigo);

            if (indiceJuego !== -1) {
                juegos.splice(indiceJuego, 1);

                insertLocalStorage('juegos', juegos);

                limpiarTabla();
                cargaInicialDeJuegos();

                console.log('Juego eliminado exitosamente');
                mostrarAlerta('Juego eliminado exitosamente', 'success');
            } else {
                console.error('No se encontró el juego a eliminar');
                mostrarAlerta('No se encontró el juego a eliminar', 'error');
            }
        } else {
            console.log('Eliminación cancelada por el usuario');
        }
    } else {
        console.error('No se encontró el juego a eliminar');
        mostrarAlerta('No se encontró el juego a eliminar', 'error');
    }
}
const limpiarTabla = () => {
    tablaDeJuego.innerHTML = '';
}