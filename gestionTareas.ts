/**
 * @fileoverview Módulo para la creación, edición y gestión de tareas individuales.
 * Contiene funciones puras para transformaciones y funciones impuras para interacción con usuario.
 */

import promptSync from 'prompt-sync';
import { Dificultad, Estado } from './types.js';
import { parseFechaVencimiento, procesarFechaVencimiento, control, mostrarDificultad, mostrarEstado } from './utils.js';
import { Tarea } from './tarea.js';

const prompt = promptSync({ sigint: true });

// ============================================
// FUNCIONES PURAS - Creación y transformación
// ============================================

/**
 * Actualiza el nombre de una tarea creando una NUEVA instancia (inmutable).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @param {string} nuevoNombre - Nuevo nombre para la tarea
 * @returns {Tarea} Nueva instancia con el nombre actualizado
 */
/*export function actualizarNombre(tarea: Tarea, nuevoNombre: string): Tarea {
    return new Tarea(
        nuevoNombre,
        tarea.getDescripcion(),
        tarea.getDificultad(),
        tarea.getEstado(),
        parseFechaVencimiento(tarea.getFechaVencimiento()),
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        tarea.getFechaCreacionDate(),
        tarea.getEliminada()
    );
}*/

/**
 * Actualiza la descripción creando una NUEVA instancia (inmutable).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @param {string} nuevaDescripcion - Nueva descripción para la tarea
 * @returns {Tarea} Nueva instancia con la descripción actualizada
 */
export function actualizarDescripcion(tarea: Tarea, nuevaDescripcion: string): Tarea {
    const descripcion = nuevaDescripcion.length > 0 ? nuevaDescripcion : "Sin descripcion";
    return new Tarea(
        tarea.getNombre(),
        descripcion,
        tarea.getDificultad(),
        tarea.getEstado(),
        parseFechaVencimiento(tarea.getFechaVencimiento()),
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        tarea.getFechaCreacionDate(),
        tarea.getEliminada()
    );
}

/**
 * Actualiza la dificultad creando una NUEVA instancia (inmutable).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @param {Dificultad} nuevaDificultad - Nuevo nivel de dificultad
 * @returns {Tarea} Nueva instancia con la dificultad actualizada
 */
export function actualizarDificultad(tarea: Tarea, nuevaDificultad: Dificultad): Tarea {
    return new Tarea(
        tarea.getNombre(),
        tarea.getDescripcion(),
        nuevaDificultad,
        tarea.getEstado(),
        parseFechaVencimiento(tarea.getFechaVencimiento()),
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        tarea.getFechaCreacionDate(),
        tarea.getEliminada()
    );
}

/**
 * Actualiza el estado creando una NUEVA instancia (inmutable).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @param {Estado} nuevoEstado - Nuevo estado para la tarea
 * @returns {Tarea} Nueva instancia con el estado actualizado
 */
export function actualizarEstado(tarea: Tarea, nuevoEstado: Estado): Tarea {
    return new Tarea(
        tarea.getNombre(),
        tarea.getDescripcion(),
        tarea.getDificultad(),
        nuevoEstado,
        parseFechaVencimiento(tarea.getFechaVencimiento()),
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        tarea.getFechaCreacionDate(),
        tarea.getEliminada()
    );
}

/**
 * Actualiza la fecha de vencimiento creando una NUEVA instancia (inmutable).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @param {Date} nuevaFecha - Nueva fecha de vencimiento
 * @returns {Tarea} Nueva instancia con la fecha actualizada
 */
export function actualizarFechaVencimiento(tarea: Tarea, nuevaFecha: Date): Tarea {
    return new Tarea(
        tarea.getNombre(),
        tarea.getDescripcion(),
        tarea.getDificultad(),
        tarea.getEstado(),
        nuevaFecha,
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        tarea.getFechaCreacionDate(),
        tarea.getEliminada()
    );
}

/**
 * Actualiza la fecha de edición creando una NUEVA instancia (inmutable).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @returns {Tarea} Nueva instancia con la fecha de edición actualizada a la fecha actual
 */
export function actualizarFechaEdicion(tarea: Tarea): Tarea {
    return new Tarea(
        tarea.getNombre(),
        tarea.getDescripcion(),
        tarea.getDificultad(),
        tarea.getEstado(),
        parseFechaVencimiento(tarea.getFechaVencimiento()),
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        new Date(), // Nueva fecha de edición
        tarea.getEliminada()
    );
}

/**
 * Marca una tarea como eliminada creando una NUEVA instancia (eliminación lógica).
 * @pure
 * @param {Tarea} tarea - Tarea original
 * @returns {Tarea} Nueva instancia marcada como eliminada
 */
export function eliminarTareaLogica(tarea: Tarea): Tarea {
    return new Tarea(
        tarea.getNombre(),
        tarea.getDescripcion(),
        tarea.getDificultad(),
        tarea.getEstado(),
        parseFechaVencimiento(tarea.getFechaVencimiento()),
        tarea.getId(),
        tarea.getFechaCreacionDate(),
        new Date(), // Actualiza fecha de edición
        true // Marca como eliminada
    );
}

/**
 * Valida que un título sea válido (mínimo 4 caracteres).
 * @pure
 * @param {string} titulo - Título a validar
 * @returns {boolean} true si el título es válido, false en caso contrario
 */
export function esTituloValido(titulo: string): boolean {
    return titulo.length >= 4;
}

/**
 * Busca una tarea en el array por su identificador único.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {string} id - ID de la tarea a buscar
 * @returns {Tarea|undefined} La tarea encontrada o undefined si no existe
 */
/*export function buscarTareaPorId(tareas: Tarea[], id: string): Tarea | undefined {
    return tareas.find(function(tarea) {
        return tarea.getId() === id;
    });
}*/

/**
 * Reemplaza una tarea en el array creando un NUEVO array (inmutable).
 * @pure
 * @param {Tarea[]} tareas - Array original de tareas
 * @param {string} id - ID de la tarea a reemplazar
 * @param {Tarea} tareaActualizada - Nueva instancia de tarea con actualizaciones
 * @returns {Tarea[]} Nuevo array con la tarea reemplazada
 */
export function reemplazarTareaPorId(tareas: Tarea[], id: string, tareaActualizada: Tarea): Tarea[] {
    return tareas.map(function(tarea) {
        return tarea.getId() === id ? tareaActualizada : tarea;
    });
}

/**
 * Genera un string con el detalle completo de una tarea.
 * @pure
 * @param {Tarea} tarea - Tarea a detallar
 * @returns {string} String formateado con todos los detalles de la tarea
 */
export function generarDetalleTexto(tarea: Tarea): string {
    const estadoConTexto = mostrarEstado(tarea.getEstado());
    const dificultadConEmoji = mostrarDificultad(tarea.getDificultad());
    
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

/**
 * Solicita el título de una nueva tarea al usuario.
 * Valida que tenga al menos 4 caracteres.
 * @impure Solicita entrada del usuario
 * @returns {string} Título validado ingresado por el usuario
 */
function solicitarTitulo(): string {
    let entrada = prompt("Ingrese el título de la tarea (Al menos 4 caracteres):");
    
    while (!esTituloValido(entrada)) {
        console.log("Titulo invalido o vacio, intentelo de nuevo");
        entrada = prompt("Ingrese el titulo de la tarea (al menos 4 caracteres):");
    }
    
    return entrada;
}

/**
 * Solicita la descripción de una tarea al usuario.
 * @impure Solicita entrada del usuario
 * @returns {string} Descripción ingresada o "Sin descripción" si está vacía
 */
function solicitarDescripcion(): string {
    const entrada = prompt("Ingrese la descripcion de la tarea:");
    return entrada.length > 0 ? entrada : "Sin descripción";
}

/**
 * Solicita el nivel de dificultad de una tarea al usuario.
 * @impure Solicita entrada del usuario
 * @returns {Dificultad} Nivel de dificultad seleccionado, Dificultad.FACIL por defecto
 */
function solicitarDificultad(): Dificultad {
    let entrada = prompt("Ingrese la dificultad de la nueva tarea [1] Fácil [2] Media [3] Dificil: ");
    entrada = control(entrada);
    
    if (entrada.length > 0) {
        return parseInt(entrada) as Dificultad;
    }
    return Dificultad.FACIL;
}

/**
 * Solicita el estado inicial de una tarea al usuario.
 * @impure Solicita entrada del usuario
 * @returns {Estado} Estado seleccionado, Estado.PENDIENTE por defecto
 */
function solicitarEstado(): Estado {
    let entrada = prompt("Ingrese el estado de la nueva tarea [1] Pendiente [2] En curso [3] Terminada: ");
    entrada = control(entrada);
    
    if (entrada.length > 0) {
        return parseInt(entrada) as Estado;
    }
    return Estado.PENDIENTE;
}

/**
 * Solicita la fecha de vencimiento de una tarea al usuario.
 * @impure Solicita entrada del usuario
 * @returns {Date} Fecha de vencimiento procesada
 */
function solicitarFechaVencimiento(): Date {
    const fechaInput = prompt("¿Cuando vence? (formato: aaaa/mm/dd): ");
    const fechaProcesada = procesarFechaVencimiento(fechaInput);
    
    if (fechaProcesada.getFullYear() === 9999) {
        console.log("Fecha invalida, se guardará como 'Sin Datos'");
    }
    
    return fechaProcesada;
}

/**
 * Crea una tarea completamente nueva solicitando todos los datos al usuario.
 * @impure Solicita múltiples entradas del usuario
 * @returns {Tarea} Nueva tarea con datos proporcionados por el usuario
 */
export function crearTareaConDatos(): Tarea {
    const titulo = solicitarTitulo();
    const descripcion = solicitarDescripcion();
    const dificultad = solicitarDificultad();
    const estado = solicitarEstado();
    const fechaVencimiento = solicitarFechaVencimiento();
    
    return new Tarea(titulo, descripcion, dificultad, estado, fechaVencimiento);
}

/**
 * Solicita al usuario la edición de una tarea existente.
 * Permite modificar descripción, dificultad, estado y fecha de vencimiento.
 * @impure Solicita múltiples entradas del usuario
 * @param {Tarea} tareaOriginal - Tarea a editar
 * @returns {Tarea} Nueva instancia con los cambios realizados
 */
function solicitarEdicionTarea(tareaOriginal: Tarea): Tarea {
    let tareaEditada = tareaOriginal;
    
    console.log('Ingrese un espacio para vaciar el campo (o ir al valor por default), enter para conservar el valor o una nueva entrada para modificarlo: ');
    
    // Descripción
    const entradaDescripcion = prompt("Ingrese la nueva descripcion de la tarea: ");
    if (entradaDescripcion === " ") {
        tareaEditada = actualizarDescripcion(tareaEditada, "");
    } else if (entradaDescripcion !== "") {
        tareaEditada = actualizarDescripcion(tareaEditada, entradaDescripcion);
    }
    
    // Dificultad
    let entradaDificultad = prompt("Ingrese la nueva dificultad de la tarea [1] Fácil [2] Media [3] Dificil: ");
    if (entradaDificultad === " ") {
        tareaEditada = actualizarDificultad(tareaEditada, Dificultad.FACIL);
    } else if (entradaDificultad !== "") {
        entradaDificultad = control(entradaDificultad);
        if (entradaDificultad.length > 0) {
            tareaEditada = actualizarDificultad(tareaEditada, parseInt(entradaDificultad) as Dificultad);
        }
    }
    
    // Estado
    let entradaEstado = prompt("Ingrese el nuevo estado de la tarea [1] Pendiente [2] En curso [3] Terminada: ");
    if (entradaEstado === " ") {
        tareaEditada = actualizarEstado(tareaEditada, Estado.PENDIENTE);
    } else if (entradaEstado !== "") {
        entradaEstado = control(entradaEstado);
        if (entradaEstado.length > 0) {
            tareaEditada = actualizarEstado(tareaEditada, parseInt(entradaEstado) as Estado);
        }
    }
    
    // Fecha de vencimiento
    const entradaFecha = prompt("Ingrese nueva fecha de vencimiento: (formato: aaaa/mm/dd): ");
    if (entradaFecha === " ") {
        tareaEditada = actualizarFechaVencimiento(tareaEditada, new Date(9999, 0, 1));
    } else if (entradaFecha !== "") {
        const fechaProcesada = procesarFechaVencimiento(entradaFecha);
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
 * Solicita confirmación del usuario para eliminar una tarea.
 * @impure Solicita entrada del usuario
 * @param {Tarea} tarea - Tarea que se va a eliminar
 * @returns {boolean} true si el usuario confirma la eliminación, false en caso contrario
 */
function solicitarConfirmacionEliminacion(tarea: Tarea): boolean {
    console.log(`\n  ¿Está seguro que desea eliminar la tarea "${tarea.getNombre()}"?`);
    const respuesta = prompt("Esta acción marcará la tarea como eliminada [S/N]: ").toLowerCase();
    return respuesta === 's' || respuesta === 'si' || respuesta === 'sí';
}

/**
 * Muestra el detalle de una tarea y permite al usuario editarla o eliminarla.
 * @impure Interactúa con el usuario y modifica el estado
 * @param {Tarea[]} tareasDisponibles - Array de tareas disponibles para seleccionar
 * @returns {Tarea|null} Tarea editada/eliminada o null si no se realizó ningún cambio
 */
export function detalleYEdicionTarea(tareasDisponibles: Tarea[]): Tarea | null {
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
        } else if (entrada === "x" || entrada === "X") {
            // ELIMINAR
            if (solicitarConfirmacionEliminacion(tareaSeleccionada)) {
                const tareaEliminada = eliminarTareaLogica(tareaSeleccionada);
                console.log("\nTarea eliminada exitosamente");
                console.log("La tarea fue marcada como eliminada");
                console.log("Presione enter para continuar");
                prompt("");
                return tareaEliminada;
            } else {
                console.log("Eliminación cancelada");
                console.log("Presione enter para continuar");
                prompt("");
                return null;
            }
        } else {
            console.log("Volviendo al menu...");
            return null;
        }
    } else {
        console.log("Volviendo al menu...");
        return null;
    }
}