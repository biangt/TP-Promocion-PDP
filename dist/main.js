"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const gestionTareas_js_1 = require("./gestionTareas.js");
const gestionListas_js_1 = require("./gestionListas.js");
const persistencia_js_1 = require("./persistencia.js");
const utils_js_1 = require("./utils.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// ============================================
// FUNCIONES PURAS
// ============================================
/**
 * Procesa la opción seleccionada y retorna el nuevo estado de tareas.
 * @param {number} opcion - La opción del menú.
 * @param {Tarea[]} tareas - El array de tareas actual.
 * @returns {Tarea[]} El nuevo array de tareas.
 */
function procesarOpcion(opcion, tareas) {
    switch (opcion) {
        case 1:
            return tareas; // Ver no modifica (se maneja en ejecutarAccionSegunOpcion)
        case 2:
            return tareas; // Buscar no modifica
        case 3: {
            const nuevaTarea = (0, gestionTareas_js_1.crearTareaConDatos)();
            return (0, gestionListas_js_1.agregarTareaALista)(tareas, nuevaTarea);
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
 * Muestra el menú principal.
 */
function mostrarMenuPrincipal() {
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.MENU_PRINCIPAL);
}
/**
 * Ejecuta acciones según la opción (side effects).
 * @param {number} opcion - La opción del menú.
 * @param {Tarea[]} tareas - El array de tareas.
 * @returns {Tarea[]} El array de tareas (potencialmente modificado).
 */
function ejecutarAccionSegunOpcion(opcion, tareas) {
    switch (opcion) {
        case 1:
            return (0, gestionListas_js_1.manejarVerTareas)(tareas);
        case 2:
            (0, gestionListas_js_1.manejarBuscarTareas)(tareas);
            return tareas;
        case 3:
            // La lógica ya está en procesarOpcion
            return tareas;
        case 4:
            // Estadísticas
            (0, utils_js_1.mostrarEstadisticas)(tareas);
            return tareas;
        default:
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.OPCION_INVALIDA);
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
            prompt("");
            return tareas;
    }
}
// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
/**
 * Función principal del programa.
 */
function main() {
    // CARGAR tareas desde el archivo al iniciar
    let tareas = (0, persistencia_js_1.leerTareasDesdeArchivo)("tareas");
    console.log(`Tareas cargadas desde el archivo\n`);
    prompt("Presione enter para continuar...");
    let opcion = -1;
    while (opcion !== 0) {
        console.clear();
        mostrarMenuPrincipal();
        opcion = parseInt(prompt("Ingrese la opción: "));
        if (opcion === 0) {
            // GUARDAR tareas antes de salir
            (0, persistencia_js_1.guardarTareasEnArchivo)(tareas, "tareas");
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.DESPEDIDA);
        }
        else {
            // Guardar estado anterior para detectar cambios
            const tareasAnteriores = tareas;
            // Primero ejecutar acciones (pueden modificar tareas si hay edición)
            tareas = ejecutarAccionSegunOpcion(opcion, tareas);
            // Luego procesar la opción (agregar nueva tarea)
            tareas = procesarOpcion(opcion, tareas);
            // GUARDAR automáticamente si hubo cambios
            if (tareas !== tareasAnteriores) {
                (0, persistencia_js_1.guardarTareasEnArchivo)(tareas, "tareas");
            }
        }
    }
}
main();
//# sourceMappingURL=main.js.map