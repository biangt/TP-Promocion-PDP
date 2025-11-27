"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTareasActivas = obtenerTareasActivas;
exports.agregarTareaALista = agregarTareaALista;
exports.filtrarTareasPorEstado = filtrarTareasPorEstado;
exports.buscarTareasPorNombre = buscarTareasPorNombre;
exports.obtenerTareasFiltradas = obtenerTareasFiltradas;
exports.obtenerTareasEncontradas = obtenerTareasEncontradas;
exports.verTareaFiltro = verTareaFiltro;
exports.buscarConIndexOf = buscarConIndexOf;
exports.manejarVerTareas = manejarVerTareas;
exports.manejarBuscarTareas = manejarBuscarTareas;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const gestionTareas_js_1 = require("./gestionTareas.js");
const utils_js_1 = require("./utils.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// ============================================
// FUNCIONES PURAS - Transformaciones de datos
// ============================================
/**
 * Filtra las tareas NO eliminadas (función pura).
 */
function obtenerTareasActivas(tareas) {
    return tareas.filter(tarea => !tarea.getEliminada());
}
/**
 * Agrega una tarea al arreglo de tareas de forma INMUTABLE.
 */
function agregarTareaALista(tareas, nuevaTarea) {
    return [...tareas, nuevaTarea];
}
/**
 * Filtra tareas por estado (función pura).
 */
function filtrarTareasPorEstado(tareas, estadoBuscado) {
    return tareas.filter(function (tarea) {
        return tarea.getEstado() === estadoBuscado;
    });
}
/**
 * Busca tareas que contengan un texto en su nombre (función pura).
 */
function buscarTareasPorNombre(tareas, textoBusqueda) {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function (tarea) {
        return tarea.getNombre().toLowerCase().indexOf(textoBusquedaLower) !== -1;
    });
}
/**
 * Obtiene las tareas filtradas por estado (función pura).
 */
function obtenerTareasFiltradas(tareas, estadoBuscado) {
    const tareasFiltradas = filtrarTareasPorEstado(tareas, estadoBuscado);
    return tareasFiltradas.length === 0 ? null : tareasFiltradas;
}
/**
 * Busca tareas por nombre (función pura).
 */
function obtenerTareasEncontradas(tareas, textoBusqueda) {
    const tareasEncontradas = buscarTareasPorNombre(tareas, textoBusqueda);
    return tareasEncontradas.length === 0 ? null : tareasEncontradas;
}
// ============================================
// FUNCIONES IMPURAS - Visualización e interacción
// ============================================
/**
 * Muestra las tareas filtradas por estado.
 * Retorna el array completo actualizado si se editó alguna tarea.
 */
function verTareaFiltro(tareas, estadoBuscado) {
    // Primero filtrar solo las activas (no eliminadas)
    const tareasActivas = obtenerTareasActivas(tareas);
    const tareasFiltradas = obtenerTareasFiltradas(tareasActivas, estadoBuscado);
    if (tareasFiltradas === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS_ESTADO);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    // Mostrar solo las tareas filtradas (activas y del estado buscado)
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareasFiltradas);
    // Permitir ver detalle SOLO de las tareas filtradas
    const tareaEditadaONull = (0, gestionTareas_js_1.detalleYEdicionTarea)(tareasFiltradas);
    // Si se editó una tarea, reemplazarla en el array original
    if (tareaEditadaONull !== null) {
        return (0, gestionTareas_js_1.reemplazarTareaPorId)(tareas, tareaEditadaONull.getId(), tareaEditadaONull);
    }
    return tareas;
}
/**
 * Busca y muestra tareas por nombre (solo activas).
 */
function buscarConIndexOf(tareas, textoBusqueda) {
    // Primero filtrar solo las activas
    const tareasActivas = obtenerTareasActivas(tareas);
    const tareasEncontradas = obtenerTareasEncontradas(tareasActivas, textoBusqueda);
    if (tareasEncontradas === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    }
    else {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareasEncontradas);
    }
}
/**
 * Maneja el menú de ver tareas con sus opciones.
 */
function manejarVerTareas(tareas) {
    // Filtrar solo tareas activas
    const tareasActivas = obtenerTareasActivas(tareas);
    if (tareasActivas.length === 0) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS, undefined, true);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.MENU_VER_TAREAS, undefined, true);
    const entrada = prompt("Indique la opción: ");
    const opMenuInterno = parseInt(entrada);
    switch (opMenuInterno) {
        case 1: {
            // Ver TODAS las tareas activas
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareasActivas);
            const tareaEditadaONull = (0, gestionTareas_js_1.detalleYEdicionTarea)(tareasActivas);
            return tareaEditadaONull !== null
                ? (0, gestionTareas_js_1.reemplazarTareaPorId)(tareas, tareaEditadaONull.getId(), tareaEditadaONull)
                : tareas;
        }
        case 2:
            // Ver PENDIENTES (solo activas)
            return verTareaFiltro(tareas, types_js_1.Estado.PENDIENTE);
        case 3:
            // Ver EN CURSO (solo activas)
            return verTareaFiltro(tareas, types_js_1.Estado.EN_CURSO);
        case 4:
            // Ver TERMINADAS (solo activas)
            return verTareaFiltro(tareas, types_js_1.Estado.TERMINADA);
        case 0:
            return tareas;
        default:
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.OPCION_INVALIDA);
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
            prompt("");
            return tareas;
    }
}
/**
 * Maneja el proceso de búsqueda de tareas.
 */
function manejarBuscarTareas(tareas) {
    console.clear();
    // Filtrar solo tareas activas
    const tareasActivas = obtenerTareasActivas(tareas);
    if (tareasActivas.length === 0) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return;
    }
    let entrada = prompt("Ingrese el título de la tarea a buscar: ");
    while (entrada.length < 1) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.TITULO_INVALIDO);
        entrada = prompt("Ingrese el titulo de la tarea (al menos 1 caracter): ");
    }
    buscarConIndexOf(tareas, entrada);
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
    prompt("");
}
//# sourceMappingURL=gestionListas.js.map