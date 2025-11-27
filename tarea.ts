/**
 * @fileoverview Módulo que define la clase Tarea y su interfaz.
 * Implementa una tarea con propiedades como nombre, descripción, estado, dificultad y fechas.
 */

import { Dificultad, Estado } from "./types.js";
import { formatoFecha, formatoFechaEdicion } from "./utils.js";

/**
 * Interfaz que define el contrato para una tarea.
 * @interface ITarea
 */
export interface ITarea {
  /** @returns {string} El nombre de la tarea */
  getNombre(): string;
  /** @returns {string} La descripción de la tarea */
  getDescripcion(): string;
  /** @returns {Dificultad} El nivel de dificultad de la tarea */
  getDificultad(): Dificultad;
  /** @returns {Estado} El estado actual de la tarea */
  getEstado(): Estado;
  /** @returns {string} La fecha de creación formateada como string */
  getFechaCreacion(): string;
  /** @returns {string} La fecha de última edición formateada como string */
  getFechaEdicion(): string;
  /** @returns {string} La fecha de vencimiento formateada como string */
  getFechaVencimiento(): string;
  /** @returns {string} El identificador único de la tarea */
  getId(): string;
  /** @returns {boolean} Indica si la tarea ha sido marcada como eliminada */
  getEliminada(): boolean;
  /** @returns {Date} La fecha de creación como objeto Date */
  getFechaCreacionDate(): Date;
  /** @returns {Date} La fecha de vencimiento como objeto Date */
  getFechaVencimientoDate(): Date;
}

/**
 * Clase que representa una tarea en el sistema.
 * Implementa la interfaz ITarea y usa propiedades privadas (#) para encapsulación.
 * @class Tarea
 * @implements {ITarea}
 */
export class Tarea implements ITarea {
  /** @private {string} El nombre de la tarea */
  #nombre: string;
  /** @private {string} La descripción de la tarea */
  #descripcion: string;
  /** @private {Dificultad} El nivel de dificultad de la tarea */
  #dificultad: Dificultad;
  /** @private {Estado} El estado actual de la tarea */
  #estado: Estado;
  /** @private {Date} Fecha de creación de la tarea */
  #fechaCreacion: Date;
  /** @private {Date} Fecha de la última edición */
  #fechaEdicion: Date;
  /** @private {Date} Fecha de vencimiento de la tarea */
  #fechaVencimiento: Date;
  /** @private {string} Identificador único de la tarea */
  #id: string;
  /** @private {boolean} Indica si la tarea ha sido eliminada lógicamente */
  #eliminada: boolean;

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
  constructor(
    nombre: string, 
    descripcion = "Sin descripción", 
    dificultad: Dificultad = Dificultad.FACIL, 
    estado: Estado = Estado.PENDIENTE, 
    fechaVencimiento: Date,
    id?: string,
    fechaCreacion?: Date,
    fechaEdicion?: Date,
    eliminada: boolean = false
  ) {
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
  getId(): string {
    return this.#id;
  }

  /**
   * Obtiene el nombre de la tarea.
   * @returns {string} El nombre
   */
  getNombre(): string {
    return this.#nombre;
  }

  /**
   * Obtiene la descripción de la tarea.
   * @returns {string} La descripción
   */
  getDescripcion(): string {
    return this.#descripcion;
  }

  /**
   * Obtiene el nivel de dificultad de la tarea.
   * @returns {Dificultad} El nivel de dificultad
   */
  getDificultad(): Dificultad {
    return this.#dificultad;
  }

  /**
   * Obtiene el estado actual de la tarea.
   * @returns {Estado} El estado
   */
  getEstado(): Estado {
    return this.#estado;
  }

  /**
   * Obtiene la fecha de creación formateada como string.
   * @returns {string} Fecha de creación en formato "dd/mm/aaaa"
   */
  getFechaCreacion(): string {
    return formatoFecha(this.#fechaCreacion);
  }

  /**
   * Obtiene la fecha de última edición formateada como string.
   * @returns {string} Fecha de edición en formato "dd/mm/aaaa"
   */
  getFechaEdicion(): string {
    return formatoFechaEdicion(this.#fechaEdicion);
  }

  /**
   * Obtiene la fecha de vencimiento formateada como string.
   * @returns {string} Fecha de vencimiento en formato "dd/mm/aaaa" o "Sin datos"
   */
  getFechaVencimiento(): string {
    if (this.#fechaVencimiento.getFullYear() === 9999) {
      return "Sin datos";
    }
    return formatoFecha(this.#fechaVencimiento);
  }

  /**
   * Obtiene el estado de eliminación de la tarea.
   * @returns {boolean} true si la tarea está marcada como eliminada, false en caso contrario
   */
  getEliminada(): boolean {
    return this.#eliminada;
  }

  /**
   * Obtiene la fecha de creación como objeto Date.
   * Útil para comparaciones y operaciones con fechas.
   * @returns {Date} La fecha de creación como Date
   */
  getFechaCreacionDate(): Date {
    return new Date(this.#fechaCreacion);
  }

  /**
   * Obtiene la fecha de vencimiento como objeto Date.
   * Útil para comparaciones y operaciones con fechas.
   * @returns {Date} La fecha de vencimiento como Date
   */
  getFechaVencimientoDate(): Date {
    return new Date(this.#fechaVencimiento);
  }

  // ============================================
  // MÉTODOS PARA PERSISTENCIA (JSON)
  // ============================================

  /**
   * Convierte la tarea a un objeto simple para serializar a JSON.
   * @returns {object} Objeto con todas las propiedades de la tarea serializables
   */
  toJSON(): object {
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
  static fromJSON(json: any): Tarea {
    return new Tarea(
      json.nombre,
      json.descripcion,
      json.dificultad,
      json.estado,
      new Date(json.fechaVencimiento),
      json.id,
      new Date(json.fechaCreacion),
      new Date(json.fechaEdicion),
      json.eliminada
    );
  }
}