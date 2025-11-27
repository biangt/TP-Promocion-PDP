"use strict";
/**
 * @fileoverview Módulo para la gestión de listas de tareas.
 * Contiene funciones puras para filtrado y búsqueda, y funciones impuras para interfaz.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
 * Agrega una nueva tarea al array de forma inmutable.
 * @pure
 * @param {Tarea[]} tareas - Array original de tareas
 * @param {Tarea} nuevaTarea - Tarea a agregar
 * @returns {Tarea[]} Nuevo array con la tarea agregada
 */
function agregarTareaALista(tareas, nuevaTarea) {
    return [...tareas, nuevaTarea];
}
/**
 * Filtra las tareas por un estado específico.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Estado} estadoBuscado - El estado a filtrar
 * @returns {Tarea[]} Array con tareas que coinciden con el estado
 */
function filtrarTareasPorEstado(tareas, estadoBuscado) {
    return tareas.filter(function (tarea) {
        return tarea.getEstado() === estadoBuscado;
    });
}
/**
 * Busca tareas que contengan un texto en su nombre (búsqueda case-insensitive).
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {string} textoBusqueda - Texto a buscar en los nombres
 * @returns {Tarea[]} Array con tareas cuyo nombre contiene el texto buscado
 */
function buscarTareasPorNombre(tareas, textoBusqueda) {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function (tarea) {
        return tarea.getNombre().toLowerCase().indexOf(textoBusquedaLower) !== -1;
    });
}
/**
 * Obtiene las tareas filtradas por un estado específico.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Estado} estadoBuscado - El estado a filtrar
 * @returns {Tarea[]|null} Array filtrado o null si no hay resultados
 */
function obtenerTareasFiltradas(tareas, estadoBuscado) {
    const tareasFiltradas = filtrarTareasPorEstado(tareas, estadoBuscado);
    return tareasFiltradas.length === 0 ? null : tareasFiltradas;
}
/**
 * Busca tareas que coincidan con un texto de búsqueda.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {string} textoBusqueda - Texto a buscar
 * @returns {Tarea[]|null} Array de tareas encontradas o null si no hay resultados
 */
function obtenerTareasEncontradas(tareas, textoBusqueda) {
    const tareasEncontradas = buscarTareasPorNombre(tareas, textoBusqueda);
    return tareasEncontradas.length === 0 ? null : tareasEncontradas;
}
// ============================================
// FUNCIONES IMPURAS - Visualización e interacción
// ============================================
/**
 * Muestra las tareas filtradas por un estado específico.
 * Permite editar una tarea seleccionada.
 * @impure Interactúa con el usuario
 * @param {Tarea[]} tareas - Array completo de tareas
 * @param {Estado} estadoBuscado - Estado para filtrar
 * @returns {Tarea[]} Array actualizado de tareas (con cambios si se editó alguna)
 */
function verTareaFiltro(tareas, estadoBuscado) {
    // Primero filtrar solo las activas (no eliminadas)
    const tareasActivas = (0, utils_js_1.filtrarTareasActivas)(tareas);
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
 * Busca y muestra tareas que coincidan con el texto de búsqueda.
 * @impure Interactúa con el usuario
 * @param {Tarea[]} tareas - Array de tareas
 * @param {string} textoBusqueda - Texto a buscar
 * @returns {void}
 */
function buscarConIndexOf(tareas, textoBusqueda) {
    // Primero filtrar solo las activas
    const tareasActivas = (0, utils_js_1.filtrarTareasActivas)(tareas);
    const tareasEncontradas = obtenerTareasEncontradas(tareasActivas, textoBusqueda);
    if (tareasEncontradas === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    }
    else {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareasEncontradas);
    }
}
/**
 * Maneja el menú de ver tareas con todas sus opciones de filtrado.
 * @impure Interactúa con el usuario
 * @param {Tarea[]} tareas - Array de tareas
 * @returns {Tarea[]} Array actualizado de tareas
 */
function manejarVerTareas(tareas) {
    // Filtrar solo tareas activas
    const tareasActivas = (0, utils_js_1.filtrarTareasActivas)(tareas);
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
 * Maneja el proceso completo de búsqueda de tareas.
 * Solicita el término de búsqueda al usuario y muestra resultados.
 * @impure Interactúa con el usuario
 * @param {Tarea[]} tareas - Array de tareas
 * @returns {void}
 */
function manejarBuscarTareas(tareas) {
    console.clear();
    // Filtrar solo tareas activas
    const tareasActivas = (0, utils_js_1.filtrarTareasActivas)(tareas);
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