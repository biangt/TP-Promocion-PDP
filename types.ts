/**
 * @fileoverview Define tipos y enumeraciones utilizados en toda la aplicación.
 * Estos enumeradores representan los estados de tareas, niveles de dificultad y tipos de mensajes.
 */

/**
 * Estados posibles de una tarea en el sistema.
 * @enum {number}
 * @property {number} PENDIENTE - La tarea aún no ha comenzado (valor 1)
 * @property {number} EN_CURSO - La tarea está siendo realizada (valor 2)
 * @property {number} TERMINADA - La tarea ha sido completada (valor 3)
 */
export enum Estado {
    PENDIENTE = 1,
    EN_CURSO = 2,
    TERMINADA = 3
}

/**
 * Niveles de dificultad que puede tener una tarea.
 * @enum {number}
 * @property {number} FACIL - Tarea de baja complejidad (valor 1)
 * @property {number} MEDIA - Tarea de complejidad media (valor 2)
 * @property {number} DIFICIL - Tarea de alta complejidad (valor 3)
 */
export enum Dificultad {
    FACIL = 1,
    MEDIA = 2,
    DIFICIL = 3
}

/**
 * Tipos de mensajes que pueden mostrarse en la interfaz de usuario.
 * Cada tipo corresponde a un mensaje predefinido en la aplicación.
 * @enum
 */
export enum TipoMensaje {
    /** Muestra el menú principal de la aplicación */
    MENU_PRINCIPAL,
    /** Muestra el submenú para ver tareas filtradas */
    MENU_VER_TAREAS,
    /** Mensaje cuando no hay tareas cargadas */
    NO_HAY_TAREAS,
    /** Mensaje cuando el título ingresado no es válido */
    TITULO_INVALIDO,
    /** Mensaje cuando la opción seleccionada no es válida */
    OPCION_INVALIDA,
    /** Mensaje de despedida al salir de la aplicación */
    DESPEDIDA,
    /** Instrucción para presionar enter y continuar */
    PRESIONE_ENTER,
    /** Lista de tareas */
    LISTA_TAREAS,
    /** Mensaje cuando no hay tareas con el estado especificado */
    NO_HAY_TAREAS_ESTADO,
    /** Mensaje cuando no se encontraron tareas en la búsqueda */
    NO_SE_ENCONTRARON_TAREAS,
    /** Lista de tareas filtradas */
    LISTA_TAREAS_FILTRADAS
}