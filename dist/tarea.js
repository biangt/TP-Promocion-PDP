"use strict";
/**
 * @fileoverview Módulo que define la clase Tarea y su interfaz.
 * Implementa una tarea con propiedades como nombre, descripción, estado, dificultad y fechas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const types_js_1 = require("./types.js");
const utils_js_1 = require("./utils.js");
/**
 * Clase que representa una tarea en el sistema.
 * Implementa la interfaz ITarea y usa propiedades privadas (#) para encapsulación.
 * @class Tarea
 * @implements {ITarea}
 */
class Tarea {
    /** @private {string} El nombre de la tarea */
    #nombre;
    /** @private {string} La descripción de la tarea */
    #descripcion;
    /** @private {Dificultad} El nivel de dificultad de la tarea */
    #dificultad;
    /** @private {Estado} El estado actual de la tarea */
    #estado;
    /** @private {Date} Fecha de creación de la tarea */
    #fechaCreacion;
    /** @private {Date} Fecha de la última edición */
    #fechaEdicion;
    /** @private {Date} Fecha de vencimiento de la tarea */
    #fechaVencimiento;
    /** @private {string} Identificador único de la tarea */
    #id;
    /** @private {boolean} Indica si la tarea ha sido eliminada lógicamente */
    #eliminada;
    /**
     * Crea una nueva instancia de Tarea.
     * @param {string} nombre - El nombre de la tarea (requerido)
     * @param {string} [descripcion="Sin descripción"] - La descripción de la tarea
     * @param {Dificultad} [dificultad=Dificultad.FACIL] - El nivel de dificultad
     * @param {Estado} [estado=Estado.PENDIENTE] - El estado inicial de la tarea
     * @param {Date} fechaVencimiento - La fecha de vencimiento de la tarea
     * @param {string} [id] - ID único (generado automáticamente si no se proporciona)
     * @param {Date} [fechaCreacion] - Fecha de creación (actual por defecto)
     * @param {Date} [fechaEdicion] - Fecha de edición (actual por defecto)
     * @param {boolean} [eliminada=false] - Indica si la tarea está marcada como eliminada
     */
    constructor(nombre, descripcion = "Sin descripción", dificultad = types_js_1.Dificultad.FACIL, estado = types_js_1.Estado.PENDIENTE, fechaVencimiento, id, fechaCreacion, fechaEdicion, eliminada = false) {
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#dificultad = dificultad;
        this.#estado = estado;
        this.#fechaCreacion = fechaCreacion ?? new Date();
        this.#fechaEdicion = fechaEdicion ?? new Date();
        this.#fechaVencimiento = fechaVencimiento;
        this.#id = id ?? crypto.randomUUID();
        this.#eliminada = eliminada;
    }
    // ============================================
    // GETTERS
    // ============================================
    /**
     * Obtiene el identificador único de la tarea.
     * @returns {string} El ID de la tarea
     */
    getId() {
        return this.#id;
    }
    /**
     * Obtiene el nombre de la tarea.
     * @returns {string} El nombre
     */
    getNombre() {
        return this.#nombre;
    }
    /**
     * Obtiene la descripción de la tarea.
     * @returns {string} La descripción
     */
    getDescripcion() {
        return this.#descripcion;
    }
    /**
     * Obtiene el nivel de dificultad de la tarea.
     * @returns {Dificultad} El nivel de dificultad
     */
    getDificultad() {
        return this.#dificultad;
    }
    /**
     * Obtiene el estado actual de la tarea.
     * @returns {Estado} El estado
     */
    getEstado() {
        return this.#estado;
    }
    /**
     * Obtiene la fecha de creación formateada como string.
     * @returns {string} Fecha de creación en formato "dd/mm/aaaa"
     */
    getFechaCreacion() {
        return (0, utils_js_1.formatoFecha)(this.#fechaCreacion);
    }
    /**
     * Obtiene la fecha de última edición formateada como string.
     * @returns {string} Fecha de edición en formato "dd/mm/aaaa"
     */
    getFechaEdicion() {
        return (0, utils_js_1.formatoFechaEdicion)(this.#fechaEdicion);
    }
    /**
     * Obtiene la fecha de vencimiento formateada como string.
     * @returns {string} Fecha de vencimiento en formato "dd/mm/aaaa" o "Sin datos"
     */
    getFechaVencimiento() {
        if (this.#fechaVencimiento.getFullYear() === 9999) {
            return "Sin datos";
        }
        return (0, utils_js_1.formatoFecha)(this.#fechaVencimiento);
    }
    /**
     * Obtiene el estado de eliminación de la tarea.
     * @returns {boolean} true si la tarea está marcada como eliminada, false en caso contrario
     */
    getEliminada() {
        return this.#eliminada;
    }
    /**
     * Obtiene la fecha de creación como objeto Date.
     * Útil para comparaciones y operaciones con fechas.
     * @returns {Date} La fecha de creación como Date
     */
    getFechaCreacionDate() {
        return new Date(this.#fechaCreacion);
    }
    /**
     * Obtiene la fecha de vencimiento como objeto Date.
     * Útil para comparaciones y operaciones con fechas.
     * @returns {Date} La fecha de vencimiento como Date
     */
    getFechaVencimientoDate() {
        return new Date(this.#fechaVencimiento);
    }
    // ============================================
    // MÉTODOS PARA PERSISTENCIA (JSON)
    // ============================================
    /**
     * Convierte la tarea a un objeto simple para serializar a JSON.
     * @returns {object} Objeto con todas las propiedades de la tarea serializables
     */
    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            dificultad: this.#dificultad,
            estado: this.#estado,
            fechaCreacion: this.#fechaCreacion.toISOString(),
            fechaEdicion: this.#fechaEdicion.toISOString(),
            fechaVencimiento: this.#fechaVencimiento.toISOString(),
            eliminada: this.#eliminada
        };
    }
    /**
     * Crea una instancia de Tarea desde un objeto JSON.
     * @static
     * @param {object} json - Objeto con los datos de la tarea en formato JSON
     * @returns {Tarea} Una nueva instancia de Tarea con los datos del JSON
     */
    static fromJSON(json) {
        return new Tarea(json.nombre, json.descripcion, json.dificultad, json.estado, new Date(json.fechaVencimiento), json.id, new Date(json.fechaCreacion), new Date(json.fechaEdicion), json.eliminada);
    }
}
exports.Tarea = Tarea;
//# sourceMappingURL=tarea.js.map