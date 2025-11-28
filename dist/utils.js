"use strict";
/**
 * @fileoverview Módulo de utilidades para la aplicación de gestión de tareas.
 * Incluye funciones puras para estadísticas, validaciones, formateo y funciones impuras para interfaz.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtrarTareasActivas = filtrarTareasActivas;
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
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// ============================================
// FUNCIONES PURAS - Estadísticas
// ============================================
/**
 * Filtra y retorna solo las tareas que no han sido marcadas como eliminadas.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas a filtrar
 * @returns {Tarea[]} Array con las tareas activas (no eliminadas)
 */
function filtrarTareasActivas(tareas) {
    return tareas.filter(tarea => !tarea.getEliminada());
}
/**
 * Cuenta el total de tareas activas (no eliminadas).
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @returns {number} Cantidad total de tareas activas
 */
function contarTotalTareas(tareas) {
    return filtrarTareasActivas(tareas).length;
}
/**
 * Cuenta cuántas tareas activas tienen un estado específico.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Estado} estado - El estado a contar
 * @returns {number} Cantidad de tareas con el estado especificado
 */
function contarTareasPorEstado(tareas, estado) {
    return filtrarTareasActivas(tareas).filter(tarea => tarea.getEstado() === estado).length;
}
/**
 * Cuenta cuántas tareas activas tienen una dificultad específica.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Dificultad} dificultad - El nivel de dificultad a contar
 * @returns {number} Cantidad de tareas con la dificultad especificada
 */
function contarTareasPorDificultad(tareas, dificultad) {
    return filtrarTareasActivas(tareas).filter(tarea => tarea.getDificultad() === dificultad).length;
}
/**
 * Calcula el porcentaje de tareas activas que tienen un estado específico.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Estado} estado - El estado a calcular
 * @returns {number} Porcentaje redondeado de tareas con el estado especificado
 */
function calcularPorcentajePorEstado(tareas, estado) {
    const total = contarTotalTareas(tareas);
    if (total === 0)
        return 0;
    const cantidad = contarTareasPorEstado(tareas, estado);
    return Math.round((cantidad / total) * 100);
}
/**
 * Calcula el porcentaje de tareas activas que tienen una dificultad específica.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @param {Dificultad} dificultad - El nivel de dificultad a calcular
 * @returns {number} Porcentaje redondeado de tareas con la dificultad especificada
 */
function calcularPorcentajePorDificultad(tareas, dificultad) {
    const total = contarTotalTareas(tareas);
    if (total === 0)
        return 0;
    const cantidad = contarTareasPorDificultad(tareas, dificultad);
    return Math.round((cantidad / total) * 100);
}
/**
 * Formatea todas las estadísticas de las tareas en un string visualmente atractivo.
 * Incluye conteos y porcentajes por estado y dificultad.
 * @pure
 * @param {Tarea[]} tareas - Array de tareas
 * @returns {string} String formateado con todas las estadísticas
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
 * Formatea una fecha a formato "dd/mm/aaaa".
 * @pure
 * @param {Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada como "dd/mm/aaaa"
 */
function formatoFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
/**
 * Formatea la fecha de edición a formato "dd/mm/aaaa".
 * @pure
 * @param {Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada como "dd/mm/aaaa"
 */
function formatoFechaEdicion(fecha) {
    return formatoFecha(fecha);
}
/**
 * Convierte un string de fecha al formato "dd/mm/aaaa" a un objeto Date.
 * @pure
 * @param {string} fechaStr - String con la fecha a parsear
 * @returns {Date} Objeto Date con la fecha parseada, o Date(9999, 0, 1) si es inválida
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
 * Procesa y valida una fecha ingresada por el usuario.
 * @pure
 * @param {string} fechaInput - String con la fecha a procesar
 * @returns {Date} Objeto Date con la fecha procesada, o Date(9999, 0, 1) si es inválida
 */
function procesarFechaVencimiento(fechaInput) {
    const tempFecha = new Date(fechaInput);
    if (isNaN(tempFecha.getTime())) {
        return new Date(9999, 0, 1);
    }
    return tempFecha;
}
/**
 * Valida que la entrada sea un número entre 1 y 3.
 * @pure
 * @param {string} entrada - String a validar
 * @returns {string} La entrada si es válida, string vacío si no lo es
 */
function control(entrada) {
    const numero = parseInt(entrada);
    if (!isNaN(numero) && numero >= 1 && numero <= 3) {
        return entrada;
    }
    return "";
}
/**
 * Convierte un nivel de dificultad a una representación visual con emojis.
 * @pure
 * @param {Dificultad} dificultad - El nivel de dificultad
 * @returns {string} Representación visual con emojis (😎🟡🟡, 😐😐🟡, o 😭😭😭)
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
 * Convierte un estado a su representación textual.
 * @pure
 * @param {Estado} estado - El estado a convertir
 * @returns {string} Texto descriptivo del estado ("Pendiente", "En Curso", "Terminada")
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
 * Genera el contenido del mensaje según el tipo especificado.
 * @pure
 * @param {TipoMensaje} tipo - Tipo de mensaje a generar
 * @param {Tarea[]} [datos] - Array de tareas (opcional, requerido para ciertos tipos)
 * @returns {string} El mensaje formateado correspondiente al tipo
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
// FUNCIONES IMPURAS - Interfaz de usuario
// ============================================
/**
 * Muestra las estadísticas de las tareas de forma visual en la consola.
 * @impure Escribe en consola y solicita entrada del usuario
 * @param {Tarea[]} tareas - Array de tareas a analizar
 * @returns {void}
 */
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
 * Imprime un mensaje en pantalla según el tipo especificado.
 * @impure Escribe en consola
 * @param {TipoMensaje} tipo - Tipo de mensaje a imprimir
 * @param {Tarea[]} [datos] - Array de tareas (opcional, requerido para ciertos tipos)
 * @param {boolean} [limpiarPantalla=false] - Si true, limpia la consola antes de imprimir
 * @returns {void}
 */
function imprimir(tipo, datos, limpiarPantalla = false) {
    if (limpiarPantalla) {
        console.clear();
    }
    const mensaje = obtenerMensaje(tipo, datos);
    console.log(mensaje);
}
//# sourceMappingURL=utils.js.map