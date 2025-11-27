"use strict";
/**
 * @fileoverview Define tipos y enumeraciones utilizados en toda la aplicación.
 * Estos enumeradores representan los estados de tareas, niveles de dificultad y tipos de mensajes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoMensaje = exports.Dificultad = exports.Estado = void 0;
/**
 * Estados posibles de una tarea en el sistema.
 * @enum {number}
 * @property {number} PENDIENTE - La tarea aún no ha comenzado (valor 1)
 * @property {number} EN_CURSO - La tarea está siendo realizada (valor 2)
 * @property {number} TERMINADA - La tarea ha sido completada (valor 3)
 */
var Estado;
(function (Estado) {
    Estado[Estado["PENDIENTE"] = 1] = "PENDIENTE";
    Estado[Estado["EN_CURSO"] = 2] = "EN_CURSO";
    Estado[Estado["TERMINADA"] = 3] = "TERMINADA";
})(Estado || (exports.Estado = Estado = {}));
/**
 * Niveles de dificultad que puede tener una tarea.
 * @enum {number}
 * @property {number} FACIL - Tarea de baja complejidad (valor 1)
 * @property {number} MEDIA - Tarea de complejidad media (valor 2)
 * @property {number} DIFICIL - Tarea de alta complejidad (valor 3)
 */
var Dificultad;
(function (Dificultad) {
    Dificultad[Dificultad["FACIL"] = 1] = "FACIL";
    Dificultad[Dificultad["MEDIA"] = 2] = "MEDIA";
    Dificultad[Dificultad["DIFICIL"] = 3] = "DIFICIL";
})(Dificultad || (exports.Dificultad = Dificultad = {}));
/**
 * Tipos de mensajes que pueden mostrarse en la interfaz de usuario.
 * Cada tipo corresponde a un mensaje predefinido en la aplicación.
 * @enum
 */
var TipoMensaje;
(function (TipoMensaje) {
    /** Muestra el menú principal de la aplicación */
    TipoMensaje[TipoMensaje["MENU_PRINCIPAL"] = 0] = "MENU_PRINCIPAL";
    /** Muestra el submenú para ver tareas filtradas */
    TipoMensaje[TipoMensaje["MENU_VER_TAREAS"] = 1] = "MENU_VER_TAREAS";
    /** Mensaje cuando no hay tareas cargadas */
    TipoMensaje[TipoMensaje["NO_HAY_TAREAS"] = 2] = "NO_HAY_TAREAS";
    /** Mensaje cuando el título ingresado no es válido */
    TipoMensaje[TipoMensaje["TITULO_INVALIDO"] = 3] = "TITULO_INVALIDO";
    /** Mensaje cuando la opción seleccionada no es válida */
    TipoMensaje[TipoMensaje["OPCION_INVALIDA"] = 4] = "OPCION_INVALIDA";
    /** Mensaje de despedida al salir de la aplicación */
    TipoMensaje[TipoMensaje["DESPEDIDA"] = 5] = "DESPEDIDA";
    /** Instrucción para presionar enter y continuar */
    TipoMensaje[TipoMensaje["PRESIONE_ENTER"] = 6] = "PRESIONE_ENTER";
    /** Lista de tareas */
    TipoMensaje[TipoMensaje["LISTA_TAREAS"] = 7] = "LISTA_TAREAS";
    /** Mensaje cuando no hay tareas con el estado especificado */
    TipoMensaje[TipoMensaje["NO_HAY_TAREAS_ESTADO"] = 8] = "NO_HAY_TAREAS_ESTADO";
    /** Mensaje cuando no se encontraron tareas en la búsqueda */
    TipoMensaje[TipoMensaje["NO_SE_ENCONTRARON_TAREAS"] = 9] = "NO_SE_ENCONTRARON_TAREAS";
    /** Lista de tareas filtradas */
    TipoMensaje[TipoMensaje["LISTA_TAREAS_FILTRADAS"] = 10] = "LISTA_TAREAS_FILTRADAS";
})(TipoMensaje || (exports.TipoMensaje = TipoMensaje = {}));
//# sourceMappingURL=types.js.map