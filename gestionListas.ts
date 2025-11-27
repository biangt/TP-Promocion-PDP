/**
 * @fileoverview Módulo para la gestión de listas de tareas.
 * Contiene funciones puras para filtrado y búsqueda, y funciones impuras para interfaz.
 */

import promptSync from 'prompt-sync';
import { Tarea } from './tarea.js';
import { Estado, TipoMensaje } from './types.js';
import { detalleYEdicionTarea, reemplazarTareaPorId } from './gestionTareas.js';
import { imprimir, filtrarTareasActivas } from './utils.js';

const prompt = promptSync({ sigint: true });

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
export function agregarTareaALista(tareas: Tarea[], nuevaTarea: Tarea): Tarea[] {
    return [...tareas, nuevaTarea];
}

/**
 * Filtra las tareas por un estado específico.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Estado} estadoBuscado - El estado a filtrar
 * @returns {Tarea[]} Array con tareas que coinciden con el estado
 */
export function filtrarTareasPorEstado(tareas: Tarea[], estadoBuscado: Estado): Tarea[] {
    return tareas.filter(function(tarea) {
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
export function buscarTareasPorNombre(tareas: Tarea[], textoBusqueda: string): Tarea[] {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function(tarea) {
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
export function obtenerTareasFiltradas(
    tareas: Tarea[], 
    estadoBuscado: Estado
): Tarea[] | null {
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
export function obtenerTareasEncontradas(
    tareas: Tarea[], 
    textoBusqueda: string
): Tarea[] | null {
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
export function verTareaFiltro(tareas: Tarea[], estadoBuscado: Estado): Tarea[] {
    // Primero filtrar solo las activas (no eliminadas)
    const tareasActivas = filtrarTareasActivas(tareas);
    const tareasFiltradas = obtenerTareasFiltradas(tareasActivas, estadoBuscado);
    
    if (tareasFiltradas === null) {
        imprimir(TipoMensaje.NO_HAY_TAREAS_ESTADO);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    
    // Mostrar solo las tareas filtradas (activas y del estado buscado)
    imprimir(TipoMensaje.LISTA_TAREAS, tareasFiltradas);
    
    // Permitir ver detalle SOLO de las tareas filtradas
    const tareaEditadaONull = detalleYEdicionTarea(tareasFiltradas);
    
    // Si se editó una tarea, reemplazarla en el array original
    if (tareaEditadaONull !== null) {
        return reemplazarTareaPorId(tareas, tareaEditadaONull.getId(), tareaEditadaONull);
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
export function buscarConIndexOf(tareas: Tarea[], textoBusqueda: string): void {
    // Primero filtrar solo las activas
    const tareasActivas = filtrarTareasActivas(tareas);
    const tareasEncontradas = obtenerTareasEncontradas(tareasActivas, textoBusqueda);
    
    if (tareasEncontradas === null) {
        imprimir(TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    } else {
        imprimir(TipoMensaje.LISTA_TAREAS, tareasEncontradas);
    }
}

/**
 * Maneja el menú de ver tareas con todas sus opciones de filtrado.
 * @impure Interactúa con el usuario
 * @param {Tarea[]} tareas - Array de tareas
 * @returns {Tarea[]} Array actualizado de tareas
 */
export function manejarVerTareas(tareas: Tarea[]): Tarea[] {
    // Filtrar solo tareas activas
    const tareasActivas = filtrarTareasActivas(tareas);
    
    if (tareasActivas.length === 0) {
        imprimir(TipoMensaje.NO_HAY_TAREAS, undefined, true);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    
    imprimir(TipoMensaje.MENU_VER_TAREAS, undefined, true);
    
    const entrada = prompt("Indique la opción: ");
    const opMenuInterno = parseInt(entrada);
    
    switch (opMenuInterno) {
        case 1: {
            // Ver TODAS las tareas activas
            imprimir(TipoMensaje.LISTA_TAREAS, tareasActivas);
            const tareaEditadaONull = detalleYEdicionTarea(tareasActivas);
            return tareaEditadaONull !== null 
                ? reemplazarTareaPorId(tareas, tareaEditadaONull.getId(), tareaEditadaONull)
                : tareas;
        }
        case 2:
            // Ver PENDIENTES (solo activas)
            return verTareaFiltro(tareas, Estado.PENDIENTE);
        case 3:
            // Ver EN CURSO (solo activas)
            return verTareaFiltro(tareas, Estado.EN_CURSO);
        case 4:
            // Ver TERMINADAS (solo activas)
            return verTareaFiltro(tareas, Estado.TERMINADA);
        case 0:
            return tareas;
        default:
            imprimir(TipoMensaje.OPCION_INVALIDA);
            imprimir(TipoMensaje.PRESIONE_ENTER);
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
export function manejarBuscarTareas(tareas: Tarea[]): void {
    console.clear();
    
    // Filtrar solo tareas activas
    const tareasActivas = filtrarTareasActivas(tareas);
    
    if (tareasActivas.length === 0) {
        imprimir(TipoMensaje.NO_HAY_TAREAS);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return;
    }
    
    let entrada = prompt("Ingrese el título de la tarea a buscar: ");
    
    while (entrada.length < 1) {
        imprimir(TipoMensaje.TITULO_INVALIDO);
        entrada = prompt("Ingrese el titulo de la tarea (al menos 1 caracter): ");
    }
    
    buscarConIndexOf(tareas, entrada);
    imprimir(TipoMensaje.PRESIONE_ENTER);
    prompt("");
}