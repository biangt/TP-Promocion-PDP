"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const types_js_1 = require("./types.js");
const utils_js_1 = require("./utils.js");
class Tarea {
    #nombre;
    #descripcion;
    #dificultad;
    #estado;
    #fechaCreacion;
    #fechaEdicion;
    #fechaVencimiento;
    #id;
    #eliminada;
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
    // GETTERS
    getId() {
        return this.#id;
    }
    getNombre() {
        return this.#nombre;
    }
    getDescripcion() {
        return this.#descripcion;
    }
    getDificultad() {
        return this.#dificultad;
    }
    getEstado() {
        return this.#estado;
    }
    getFechaCreacion() {
        return (0, utils_js_1.formatoFecha)(this.#fechaCreacion);
    }
    getFechaEdicion() {
        return (0, utils_js_1.formatoFechaEdicion)(this.#fechaEdicion);
    }
    getFechaVencimiento() {
        if (this.#fechaVencimiento.getFullYear() === 9999) {
            return "Sin datos";
        }
        return (0, utils_js_1.formatoFecha)(this.#fechaVencimiento);
    }
    getEliminada() {
        return this.#eliminada;
    }
    // Getters para obtener las fechas como Date (útil para comparaciones)
    getFechaCreacionDate() {
        return new Date(this.#fechaCreacion);
    }
    getFechaVencimientoDate() {
        return new Date(this.#fechaVencimiento);
    }
    // ============================================
    // MÉTODOS PARA PERSISTENCIA (JSON)
    // ============================================
    /**
     * Convierte la tarea a un objeto simple para serializar a JSON.
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
     */
    static fromJSON(json) {
        return new Tarea(json.nombre, json.descripcion, json.dificultad, json.estado, new Date(json.fechaVencimiento), json.id, new Date(json.fechaCreacion), new Date(json.fechaEdicion), json.eliminada);
    }
}
exports.Tarea = Tarea;
//# sourceMappingURL=tarea.js.map