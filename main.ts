/**
 * @fileoverview Punto de entrada principal de la aplicación.
 * Gestiona el bucle principal del programa y la coordinación entre módulos.
 */

import promptSync from 'prompt-sync';
import { Tarea } from './tarea.js';
import { Estado, Dificultad, TipoMensaje } from './types.js';
import { crearTareaConDatos } from './gestionTareas.js';
import { manejarVerTareas, manejarBuscarTareas, agregarTareaALista } from './gestionListas.js';
import { leerTareasDesdeArchivo, guardarTareasEnArchivo } from './persistencia.js';
import { imprimir, mostrarEstadisticas } from './utils.js';

const prompt = promptSync({ sigint: true });

// ============================================
// FUNCIONES PURAS
// ============================================

/**
 * Procesa la opción seleccionada y retorna el nuevo estado de tareas.
 * Solo modifica el estado para la opción de agregar tarea.
 * @pure
 * @param {number} opcion - La opción del menú (1-4 o 0)
 * @param {Tarea[]} tareas - El array de tareas actual
 * @returns {Tarea[]} El array de tareas (sin modificaciones excepto para opción 3)
 */
function procesarOpcion(opcion: number, tareas: Tarea[]): Tarea[] {
    switch (opcion) {
        case 1:
            return tareas; // Ver no modifica (se maneja en ejecutarAccionSegunOpcion)
        case 2:
            return tareas; // Buscar no modifica
        case 3: {
            const nuevaTarea = crearTareaConDatos();
            return agregarTareaALista(tareas, nuevaTarea);
        }
        case 4:
            return tareas; // Estadísticas no modifica
        default:
            return tareas;
    }
}

// ============================================
// FUNCIONES IMPURAS
// ============================================

/**
 * Muestra el menú principal en la consola.
 * @impure Escribe en consola
 * @returns {void}
 */
function mostrarMenuPrincipal(): void {
    imprimir(TipoMensaje.MENU_PRINCIPAL);
}

/**
 * Ejecuta acciones según la opción seleccionada.
 * Maneja la interacción del usuario según la opción del menú.
 * @impure Interactúa con el usuario e I/O
 * @param {number} opcion - La opción del menú
 * @param {Tarea[]} tareas - El array de tareas
 * @returns {Tarea[]} El array de tareas (potencialmente modificado)
 */
function ejecutarAccionSegunOpcion(opcion: number, tareas: Tarea[]): Tarea[] {
    switch (opcion) {
        case 1:
            return manejarVerTareas(tareas);
        case 2:
            manejarBuscarTareas(tareas);
            return tareas;
        case 3:
            // La lógica ya está en procesarOpcion
            return tareas;
        case 4:
            // Estadísticas
            mostrarEstadisticas(tareas);
            return tareas;
        default:
            imprimir(TipoMensaje.OPCION_INVALIDA);
            imprimir(TipoMensaje.PRESIONE_ENTER);
            prompt("");
            return tareas;
    }
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

/**
 * Función principal del programa.
 * Ejecuta el bucle principal de la aplicación.
 * Carga tareas del archivo, presenta el menú y procesa opciones del usuario.
 * @impure Interactúa con usuario, archivos y consola
 * @returns {void}
 */
function main(): void {
    // CARGAR tareas desde el archivo al iniciar
    let tareas: Tarea[] = leerTareasDesdeArchivo("tareas");
    console.log(`Tareas cargadas desde el archivo\n`);
    imprimir (TipoMensaje.PRESIONE_ENTER);
    prompt("");
    
    let opcion = -1; 

    while (opcion !== 0) {
        console.clear();
        mostrarMenuPrincipal();
        opcion = parseInt(prompt("Ingrese la opción: "));

        if (opcion === 0) {
            // GUARDAR tareas antes de salir
            guardarTareasEnArchivo(tareas, "tareas");
            imprimir(TipoMensaje.DESPEDIDA);
        } else {
            // Guardar estado anterior para detectar cambios
            const tareasAnteriores = tareas;
            
            // Primero ejecutar acciones (pueden modificar tareas si hay edición)
            tareas = ejecutarAccionSegunOpcion(opcion, tareas);
            // Luego procesar la opción (agregar nueva tarea)
            tareas = procesarOpcion(opcion, tareas);
            
            // GUARDAR automáticamente si hubo cambios
            if (tareas !== tareasAnteriores) {
                guardarTareasEnArchivo(tareas, "tareas");
            }
        }
    }
}

main();
