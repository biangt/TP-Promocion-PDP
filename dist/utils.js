"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contarTotalTareas = contarTotalTareas;
exports.contarTareasPorEstado = contarTareasPorEstado;
exports.contarTareasPorDificultad = contarTareasPorDificultad;
exports.calcularPorcentajePorEstado = calcularPorcentajePorEstado;
exports.calcularPorcentajePorDificultad = calcularPorcentajePorDificultad;
exports.formatearEstadisticas = formatearEstadisticas;
exports.formatoFecha = formatoFecha;
exports.formatoFechaEdicion = formatoFechaEdicion;
exports.parseFechaVencimiento = parseFechaVencimiento;
exports.procesarFechaVencimiento = procesarFechaVencimiento;
exports.control = control;
exports.mostrarDificultad = mostrarDificultad;
exports.mostrarEstado = mostrarEstado;
exports.obtenerMensaje = obtenerMensaje;
exports.mostrarEstadisticas = mostrarEstadisticas;
exports.imprimir = imprimir;
exports.imprimirCadena = imprimirCadena;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
//ESTADISTICAS
// ============================================
// FUNCIONES PURAS - Estadísticas (Simplificadas)
// ============================================
/**
 * Filtra tareas NO eliminadas (función pura).
 */
function filtrarTareasActivas(tareas) {
    return tareas.filter(tarea => !tarea.getEliminada());
}
/**
 * Cuenta el total de tareas activas (función pura).
 */
function contarTotalTareas(tareas) {
    return filtrarTareasActivas(tareas).length;
}
/**
 * Cuenta tareas por estado, excluyendo eliminadas (función pura).
 */
function contarTareasPorEstado(tareas, estado) {
    return filtrarTareasActivas(tareas).filter(tarea => tarea.getEstado() === estado).length;
}
/**
 * Cuenta tareas por dificultad, excluyendo eliminadas (función pura).
 */
function contarTareasPorDificultad(tareas, dificultad) {
    return filtrarTareasActivas(tareas).filter(tarea => tarea.getDificultad() === dificultad).length;
}
/**
 * Calcula el porcentaje de tareas por estado (función pura).
 */
function calcularPorcentajePorEstado(tareas, estado) {
    const total = contarTotalTareas(tareas);
    if (total === 0)
        return 0;
    const cantidad = contarTareasPorEstado(tareas, estado);
    return Math.round((cantidad / total) * 100);
}
/**
 * Calcula el porcentaje de tareas por dificultad (función pura).
 */
function calcularPorcentajePorDificultad(tareas, dificultad) {
    const total = contarTotalTareas(tareas);
    if (total === 0)
        return 0;
    const cantidad = contarTareasPorDificultad(tareas, dificultad);
    return Math.round((cantidad / total) * 100);
}
/**
 * Formatea las estadísticas como texto (función pura).
 * Aplicamos los cálculos directamente.
 */
function formatearEstadisticas(tareas) {
    const total = contarTotalTareas(tareas);
    // Por estado
    const pendientes = contarTareasPorEstado(tareas, types_js_1.Estado.PENDIENTE);
    const enCurso = contarTareasPorEstado(tareas, types_js_1.Estado.EN_CURSO);
    const terminadas = contarTareasPorEstado(tareas, types_js_1.Estado.TERMINADA);
    const porcentajePendientes = calcularPorcentajePorEstado(tareas, types_js_1.Estado.PENDIENTE);
    const porcentajeEnCurso = calcularPorcentajePorEstado(tareas, types_js_1.Estado.EN_CURSO);
    const porcentajeTerminadas = calcularPorcentajePorEstado(tareas, types_js_1.Estado.TERMINADA);
    // Por dificultad
    const facil = contarTareasPorDificultad(tareas, types_js_1.Dificultad.FACIL);
    const media = contarTareasPorDificultad(tareas, types_js_1.Dificultad.MEDIA);
    const dificil = contarTareasPorDificultad(tareas, types_js_1.Dificultad.DIFICIL);
    const porcentajeFacil = calcularPorcentajePorDificultad(tareas, types_js_1.Dificultad.FACIL);
    const porcentajeMedia = calcularPorcentajePorDificultad(tareas, types_js_1.Dificultad.MEDIA);
    const porcentajeDificil = calcularPorcentajePorDificultad(tareas, types_js_1.Dificultad.DIFICIL);
    return `
╔════════════════════════════════════════════╗
║         ESTADÍSTICAS DE TAREAS             ║
╚════════════════════════════════════════════╝

TOTAL DE TAREAS: ${total}

━━━ POR ESTADO ━━━
  Pendientes:  ${pendientes} (${porcentajePendientes}%)
  En Curso:    ${enCurso} (${porcentajeEnCurso}%)
  Terminadas:  ${terminadas} (${porcentajeTerminadas}%)

━━━ POR DIFICULTAD ━━━
  😎 Fácil:       ${facil} (${porcentajeFacil}%)
  😐 Media:       ${media} (${porcentajeMedia}%)
  😭 Difícil:     ${dificil} (${porcentajeDificil}%)
`;
}
/**
 * Formatea una fecha a formato legible (función pura).
 */
function formatoFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
/**
 * Formatea fecha de edición (función pura).
 */
function formatoFechaEdicion(fecha) {
    return formatoFecha(fecha);
}
/**
 * Helper: Convierte string de fecha de vuelta a Date (función pura).
 */
function parseFechaVencimiento(fechaStr) {
    if (fechaStr === "Sin datos") {
        return new Date(9999, 0, 1);
    }
    const partes = fechaStr.split('/');
    if (partes.length === 3) {
        return new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    }
    return new Date(9999, 0, 1);
}
/**
 * Procesa una fecha ingresada (función pura).
 */
function procesarFechaVencimiento(fechaInput) {
    const tempFecha = new Date(fechaInput);
    if (isNaN(tempFecha.getTime())) {
        return new Date(9999, 0, 1);
    }
    return tempFecha;
}
/**
 * Controla que la entrada esté entre 1 y 3 (función pura).
 */
function control(entrada) {
    const numero = parseInt(entrada);
    if (!isNaN(numero) && numero >= 1 && numero <= 3) {
        return entrada;
    }
    return "";
}
/**
 * Muestra la dificultad con emoji (función pura).
 */
function mostrarDificultad(dificultad) {
    switch (dificultad) {
        case types_js_1.Dificultad.FACIL:
            return "😎🟡🟡";
        case types_js_1.Dificultad.MEDIA:
            return "😐😐🟡";
        case types_js_1.Dificultad.DIFICIL:
            return "😭😭😭";
        default:
            return "Desconocida";
    }
}
/**
 * Muestra el estado con texto descriptivo (función pura).
 */
function mostrarEstado(estado) {
    switch (estado) {
        case types_js_1.Estado.PENDIENTE:
            return "Pendiente";
        case types_js_1.Estado.EN_CURSO:
            return "En Curso";
        case types_js_1.Estado.TERMINADA:
            return "Terminada";
        default:
            return "Desconocido";
    }
}
/**
 * Genera el contenido del mensaje según el tipo (función pura).
 */
function obtenerMensaje(tipo, datos) {
    switch (tipo) {
        case types_js_1.TipoMensaje.MENU_PRINCIPAL:
            return `
    ██████╗░██╗███████╗███╗░░██╗██╗░░░██╗███████╗███╗░░██╗██╗██████╗░░█████╗░  ░█████╗░██╗░░░░░
    ██╔══██╗██║██╔════╝████╗░██║██║░░░██║██╔════╝████╗░██║██║██╔══██╗██╔══██╗  ██╔══██╗██║░░░░░
    ██████╦╝██║█████╗░░██╔██╗██║╚██╗░██╔╝█████╗░░██╔██╗██║██║██║░░██║██║░░██║  ███████║██║░░░░░
    ██╔══██╗██║██╔══╝░░██║╚████║░╚████╔╝░██╔══╝░░██║╚████║██║██║░░██║██║░░██║  ██╔══██║██║░░░░░
    ██████╦╝██║███████╗██║░╚███║░░╚██╔╝░░███████╗██║░╚███║██║██████╔╝╚█████╔╝  ██║░░██║███████╗
    ╚═════╝░╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝╚═╝╚═════╝░░╚════╝░  ╚═╝░░╚═╝╚══════╝
    
    ███╗░░░███╗███████╗███╗░░██╗██╗░░░██╗  ██████╗░███████╗  ████████╗░█████╗░██████╗░███████╗░█████╗░░██████╗██╗
    ████╗░████║██╔════╝████╗░██║██║░░░██║  ██╔══██╗██╔════╝  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝██║
    ██╔████╔██║█████╗░░██╔██╗██║██║░░░██║  ██║░░██║█████╗░░  ░░░██║░░░███████║██████╔╝█████╗░░███████║╚█████╗░██║
    ██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║  ██║░░██║██╔══╝░░  ░░░██║░░░██╔══██║██╔══██╗██╔══╝░░██╔══██║░╚═══██╗╚═╝
    ██║░╚═╝░██║███████╗██║░╚███║╚██████╔╝  ██████╔╝███████╗  ░░░██║░░░██║░░██║██║░░██║███████╗██║░░██║██████╔╝██╗
    ╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░╚═════╝░  ╚═════╝░╚══════╝  ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░╚═╝
   
            ╔═══════════════════════════════════╗
            ║     [1] Ver mis tareas            ║
            ║     [2] Buscar mis tareas         ║
            ║     [3] Agregar una tarea         ║
            ║     [4] Ver estadísticas          ║
            ║     [0] Salir                     ║
            ╚═══════════════════════════════════╝`;
        case types_js_1.TipoMensaje.MENU_VER_TAREAS:
            return `¿Que tareas deseas ver?

                        ╔═══════════════════════════════════╗
                        ║      [1] Todas                    ║
                        ║      [2] Pendientes               ║
                        ║      [3] En curso                 ║
                        ║      [4] Terminadas               ║
                        ║      [0] Salir                    ║
                        ╚═══════════════════════════════════╝`;
        case types_js_1.TipoMensaje.NO_HAY_TAREAS:
            return "No hay tareas cargadas";
        case types_js_1.TipoMensaje.TITULO_INVALIDO:
            return "Titulo invalido o vacio, intentelo de nuevo";
        case types_js_1.TipoMensaje.OPCION_INVALIDA:
            return "-OPCIÓN NO VALIDA-";
        case types_js_1.TipoMensaje.DESPEDIDA:
            return "Hasta la próxima!";
        case types_js_1.TipoMensaje.PRESIONE_ENTER:
            return "Presione enter para continuar";
        case types_js_1.TipoMensaje.LISTA_TAREAS:
            if (datos && Array.isArray(datos) && datos.length > 0) {
                return datos.map((tarea, index) => `Tarea N° [${index + 1}]: ${tarea.getNombre()}`).join('\n');
            }
            return "";
        case types_js_1.TipoMensaje.NO_HAY_TAREAS_ESTADO:
            return "No hay tareas con ese estado";
        case types_js_1.TipoMensaje.NO_SE_ENCONTRARON_TAREAS:
            return "No se encontraron tareas con ese nombre";
        default:
            return "";
    }
}
// ============================================
// FUNCIÓN IMPURA - Imprime en pantalla
// ============================================
function mostrarEstadisticas(tareas) {
    console.clear();
    if (contarTotalTareas(tareas) === 0) {
        imprimir(types_js_1.TipoMensaje.NO_HAY_TAREAS);
        imprimir(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
    }
    else {
        // Solo llama a formatearEstadisticas
        const textoEstadisticas = formatearEstadisticas(tareas);
        console.log(textoEstadisticas);
        imprimir(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
    }
}
/**
 * Imprime un mensaje en pantalla según el tipo.
 */
function imprimir(tipo, datos, limpiarPantalla = false) {
    if (limpiarPantalla) {
        console.clear();
    }
    const mensaje = obtenerMensaje(tipo, datos);
    console.log(mensaje);
}
/*recibe cadena de carecter e imprime en consola */
function imprimirCadena(cadena) {
    console.log(cadena);
}
//# sourceMappingURL=utils.js.map