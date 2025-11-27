"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTareaVacia = crearTareaVacia;
exports.actualizarNombre = actualizarNombre;
exports.actualizarDescripcion = actualizarDescripcion;
exports.actualizarDificultad = actualizarDificultad;
exports.actualizarEstado = actualizarEstado;
exports.actualizarFechaVencimiento = actualizarFechaVencimiento;
exports.actualizarFechaEdicion = actualizarFechaEdicion;
exports.eliminarTareaLogica = eliminarTareaLogica;
exports.esTituloValido = esTituloValido;
exports.buscarTareaPorId = buscarTareaPorId;
exports.reemplazarTareaPorId = reemplazarTareaPorId;
exports.generarDetalleTexto = generarDetalleTexto;
exports.crearTareaConDatos = crearTareaConDatos;
exports.detalleYEdicionTarea = detalleYEdicionTarea;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const utils_js_1 = require("./utils.js");
const tarea_js_1 = require("./tarea.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// ============================================
// FUNCIONES PURAS - Creación y transformación
// ============================================
/**
 * Crea una nueva instancia de Tarea vacía (función pura).
 */
function crearTareaVacia() {
    return new tarea_js_1.Tarea("", "Sin descripcion", types_js_1.Dificultad.FACIL, types_js_1.Estado.PENDIENTE, new Date(9999, 0, 1));
}
/**
 * Actualiza el nombre creando una NUEVA instancia (función pura).
 */
function actualizarNombre(tarea, nuevoNombre) {
    return new tarea_js_1.Tarea(nuevoNombre, tarea.getDescripcion(), tarea.getDificultad(), tarea.getEstado(), (0, utils_js_1.parseFechaVencimiento)(tarea.getFechaVencimiento()), tarea.getId(), tarea.getFechaCreacionDate(), tarea.getFechaCreacionDate(), tarea.getEliminada());
}
/**
 * Actualiza la descripción creando una NUEVA instancia (función pura).
 */
function actualizarDescripcion(tarea, nuevaDescripcion) {
    const descripcion = nuevaDescripcion.length > 0 ? nuevaDescripcion : "Sin descripcion";
    return new tarea_js_1.Tarea(tarea.getNombre(), descripcion, tarea.getDificultad(), tarea.getEstado(), (0, utils_js_1.parseFechaVencimiento)(tarea.getFechaVencimiento()), tarea.getId(), tarea.getFechaCreacionDate(), tarea.getFechaCreacionDate(), tarea.getEliminada());
}
/**
 * Actualiza la dificultad creando una NUEVA instancia (función pura).
 */
function actualizarDificultad(tarea, nuevaDificultad) {
    return new tarea_js_1.Tarea(tarea.getNombre(), tarea.getDescripcion(), nuevaDificultad, tarea.getEstado(), (0, utils_js_1.parseFechaVencimiento)(tarea.getFechaVencimiento()), tarea.getId(), tarea.getFechaCreacionDate(), tarea.getFechaCreacionDate(), tarea.getEliminada());
}
/**
 * Actualiza el estado creando una NUEVA instancia (función pura).
 */
function actualizarEstado(tarea, nuevoEstado) {
    return new tarea_js_1.Tarea(tarea.getNombre(), tarea.getDescripcion(), tarea.getDificultad(), nuevoEstado, (0, utils_js_1.parseFechaVencimiento)(tarea.getFechaVencimiento()), tarea.getId(), tarea.getFechaCreacionDate(), tarea.getFechaCreacionDate(), tarea.getEliminada());
}
/**
 * Actualiza la fecha de vencimiento creando una NUEVA instancia (función pura).
 */
function actualizarFechaVencimiento(tarea, nuevaFecha) {
    return new tarea_js_1.Tarea(tarea.getNombre(), tarea.getDescripcion(), tarea.getDificultad(), tarea.getEstado(), nuevaFecha, tarea.getId(), tarea.getFechaCreacionDate(), tarea.getFechaCreacionDate(), tarea.getEliminada());
}
/**
 * Actualiza la fecha de edición creando una NUEVA instancia (función pura).
 */
function actualizarFechaEdicion(tarea) {
    return new tarea_js_1.Tarea(tarea.getNombre(), tarea.getDescripcion(), tarea.getDificultad(), tarea.getEstado(), (0, utils_js_1.parseFechaVencimiento)(tarea.getFechaVencimiento()), tarea.getId(), tarea.getFechaCreacionDate(), new Date(), // Nueva fecha de edición
    tarea.getEliminada());
}
/**
 * Elimina lógicamente una tarea creando una NUEVA instancia (función pura).
 */
function eliminarTareaLogica(tarea) {
    return new tarea_js_1.Tarea(tarea.getNombre(), tarea.getDescripcion(), tarea.getDificultad(), tarea.getEstado(), (0, utils_js_1.parseFechaVencimiento)(tarea.getFechaVencimiento()), tarea.getId(), tarea.getFechaCreacionDate(), new Date(), // Actualiza fecha de edición
    true // Marca como eliminada
    );
}
/**
 * Valida un título (función pura).
 */
function esTituloValido(titulo) {
    return titulo.length >= 4;
}
/**
 * Busca una tarea por ID (función pura).
 */
function buscarTareaPorId(tareas, id) {
    return tareas.find(function (tarea) {
        return tarea.getId() === id;
    });
}
/**
 * Reemplaza una tarea por ID (función pura).
 */
function reemplazarTareaPorId(tareas, id, tareaActualizada) {
    return tareas.map(function (tarea) {
        return tarea.getId() === id ? tareaActualizada : tarea;
    });
}
/**
 * Genera texto de detalle (función pura).
 */
function generarDetalleTexto(tarea) {
    const estadoConTexto = (0, utils_js_1.mostrarEstado)(tarea.getEstado());
    const dificultadConEmoji = (0, utils_js_1.mostrarDificultad)(tarea.getDificultad());
    return `Título: ${tarea.getNombre()}
Descripción: ${tarea.getDescripcion()}
Estado: ${estadoConTexto}
Dificultad: ${dificultadConEmoji}
Fecha de creación: ${tarea.getFechaCreacion()}
Fecha de vencimiento: ${tarea.getFechaVencimiento()}`;
}
// ============================================
// FUNCIONES IMPURAS - Interacción con usuario
// ============================================
function solicitarTitulo() {
    let entrada = prompt("Ingrese el título de la tarea (Al menos 4 caracteres):");
    while (!esTituloValido(entrada)) {
        console.log("Titulo invalido o vacio, intentelo de nuevo");
        entrada = prompt("Ingrese el titulo de la tarea (al menos 4 caracteres):");
    }
    return entrada;
}
function solicitarDescripcion() {
    const entrada = prompt("Ingrese la descripcion de la tarea:");
    return entrada.length > 0 ? entrada : "Sin descripción";
}
function solicitarDificultad() {
    let entrada = prompt("Ingrese la dificultad de la nueva tarea [1] Fácil [2] Media [3] Dificil: ");
    entrada = (0, utils_js_1.control)(entrada);
    if (entrada.length > 0) {
        return parseInt(entrada);
    }
    return types_js_1.Dificultad.FACIL;
}
function solicitarEstado() {
    let entrada = prompt("Ingrese el estado de la nueva tarea [1] Pendiente [2] En curso [3] Terminada: ");
    entrada = (0, utils_js_1.control)(entrada);
    if (entrada.length > 0) {
        return parseInt(entrada);
    }
    return types_js_1.Estado.PENDIENTE;
}
function solicitarFechaVencimiento() {
    const fechaInput = prompt("¿Cuando vence? (formato: aaaa/mm/dd): ");
    const fechaProcesada = (0, utils_js_1.procesarFechaVencimiento)(fechaInput);
    if (fechaProcesada.getFullYear() === 9999) {
        console.log("Fecha invalida, se guardará como 'Sin Datos'");
    }
    return fechaProcesada;
}
/**
 * Crea una tarea con datos del usuario.
 */
function crearTareaConDatos() {
    const titulo = solicitarTitulo();
    const descripcion = solicitarDescripcion();
    const dificultad = solicitarDificultad();
    const estado = solicitarEstado();
    const fechaVencimiento = solicitarFechaVencimiento();
    return new tarea_js_1.Tarea(titulo, descripcion, dificultad, estado, fechaVencimiento);
}
/**
 * Solicita edición de una tarea (retorna NUEVA instancia).
 */
function solicitarEdicionTarea(tareaOriginal) {
    let tareaEditada = tareaOriginal;
    console.log('Ingrese un espacio para vaciar el campo (o ir al valor por default), enter para conservar el valor o una nueva entrada para modificarlo: ');
    // Descripción
    const entradaDescripcion = prompt("Ingrese la nueva descripcion de la tarea: ");
    if (entradaDescripcion === " ") {
        tareaEditada = actualizarDescripcion(tareaEditada, "");
    }
    else if (entradaDescripcion !== "") {
        tareaEditada = actualizarDescripcion(tareaEditada, entradaDescripcion);
    }
    // Dificultad
    let entradaDificultad = prompt("Ingrese la nueva dificultad de la tarea [1] Fácil [2] Media [3] Dificil: ");
    if (entradaDificultad === " ") {
        tareaEditada = actualizarDificultad(tareaEditada, types_js_1.Dificultad.FACIL);
    }
    else if (entradaDificultad !== "") {
        entradaDificultad = (0, utils_js_1.control)(entradaDificultad);
        if (entradaDificultad.length > 0) {
            tareaEditada = actualizarDificultad(tareaEditada, parseInt(entradaDificultad));
        }
    }
    // Estado
    let entradaEstado = prompt("Ingrese el nuevo estado de la tarea [1] Pendiente [2] En curso [3] Terminada: ");
    if (entradaEstado === " ") {
        tareaEditada = actualizarEstado(tareaEditada, types_js_1.Estado.PENDIENTE);
    }
    else if (entradaEstado !== "") {
        entradaEstado = (0, utils_js_1.control)(entradaEstado);
        if (entradaEstado.length > 0) {
            tareaEditada = actualizarEstado(tareaEditada, parseInt(entradaEstado));
        }
    }
    // Fecha de vencimiento
    const entradaFecha = prompt("Ingrese nueva fecha de vencimiento: (formato: aaaa/mm/dd): ");
    if (entradaFecha === " ") {
        tareaEditada = actualizarFechaVencimiento(tareaEditada, new Date(9999, 0, 1));
    }
    else if (entradaFecha !== "") {
        const fechaProcesada = (0, utils_js_1.procesarFechaVencimiento)(entradaFecha);
        if (fechaProcesada.getFullYear() === 9999) {
            console.log("Fecha invalida, se guardará como 'Sin Datos'");
        }
        tareaEditada = actualizarFechaVencimiento(tareaEditada, fechaProcesada);
    }
    // Actualizar fecha de edición
    tareaEditada = actualizarFechaEdicion(tareaEditada);
    return tareaEditada;
}
/**
 * Solicita confirmación para eliminar (función impura).
 */
function solicitarConfirmacionEliminacion(tarea) {
    console.log(`\n  ¿Está seguro que desea eliminar la tarea "${tarea.getNombre()}"?`);
    const respuesta = prompt("Esta acción marcará la tarea como eliminada [S/N]: ").toLowerCase();
    return respuesta === 's' || respuesta === 'si' || respuesta === 'sí';
}
/**
 * Muestra detalle y permite edición o eliminación.
 * Retorna la tarea editada/eliminada o null.
 */
function detalleYEdicionTarea(tareasDisponibles) {
    let entrada = prompt("Ingrese el número de tarea para ver en detalle o '0' para volver al menu: ");
    let opMenuesAdentro = parseInt(entrada);
    while (isNaN(opMenuesAdentro) || opMenuesAdentro < 0 || opMenuesAdentro > tareasDisponibles.length) {
        entrada = prompt("Opción invalida, intentelo de nuevo: ");
        opMenuesAdentro = parseInt(entrada);
    }
    if (opMenuesAdentro !== 0) {
        const tareaSeleccionada = tareasDisponibles[opMenuesAdentro - 1];
        const detalleTexto = generarDetalleTexto(tareaSeleccionada);
        console.log(detalleTexto);
        entrada = prompt("\nPresione enter para continuar, [E] para editar o [X] para eliminar: ");
        while (entrada !== "e" && entrada !== "E" && entrada !== "x" && entrada !== "X" && entrada !== "") {
            console.log("Opción invalida, intentelo de nuevo");
            entrada = prompt("Ingrese la opción: ");
        }
        if (entrada === "e" || entrada === "E") {
            // EDITAR
            const tareaEditada = solicitarEdicionTarea(tareaSeleccionada);
            console.log("Tarea editada con exito!");
            console.log("Presione enter para continuar");
            prompt("");
            return tareaEditada;
        }
        else if (entrada === "x" || entrada === "X") {
            // ELIMINAR
            if (solicitarConfirmacionEliminacion(tareaSeleccionada)) {
                const tareaEliminada = eliminarTareaLogica(tareaSeleccionada);
                console.log("\nTarea eliminada exitosamente");
                console.log("La tarea fue marcada como eliminada");
                console.log("Presione enter para continuar");
                prompt("");
                return tareaEliminada;
            }
            else {
                console.log("Eliminación cancelada");
                console.log("Presione enter para continuar");
                prompt("");
                return null;
            }
        }
        else {
            console.log("Volviendo al menu...");
            return null;
        }
    }
    else {
        console.log("Volviendo al menu...");
        return null;
    }
}
//# sourceMappingURL=gestionTareas.js.map