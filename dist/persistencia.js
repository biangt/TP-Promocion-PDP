"use strict";
/**
 * @fileoverview Módulo de persistencia de tareas.
 * Maneja la lectura y escritura de tareas en archivos JSON.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tareasAJSON = tareasAJSON;
exports.JSONATareas = JSONATareas;
exports.leerTareasDesdeArchivo = leerTareasDesdeArchivo;
exports.guardarTareasEnArchivo = guardarTareasEnArchivo;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const tarea_js_1 = require("./tarea.js");
// ============================================
// FUNCIONES PURAS - Transformación de datos
// ============================================
/**
 * Convierte un array de Tareas a formato serializable (JSON).
 * @pure
 * @param {Tarea[]} tareas - Array de tareas a convertir
 * @returns {any[]} Array de objetos con datos de tareas serializables
 */
function tareasAJSON(tareas) {
    return tareas.map(tarea => tarea.toJSON());
}
/**
 * Convierte datos JSON a array de Tareas.
 * @pure
 * @param {any[]} datos - Array de objetos en formato JSON
 * @returns {Tarea[]} Array de instancias de Tarea, array vacío si hay error
 */
function JSONATareas(datos) {
    try {
        if (!Array.isArray(datos)) {
            return [];
        }
        return datos.map(item => tarea_js_1.Tarea.fromJSON(item));
    }
    catch (error) {
        console.error('Error al convertir JSON a Tareas:', error);
        return [];
    }
}
// ============================================
// FUNCIONES IMPURAS - I/O con archivos
// ============================================
/**
 * Lee tareas desde un archivo JSON.
 * @impure Interactúa con el sistema de archivos
 * @param {string} [filename="tareas"] - Nombre del archivo a leer (sin extensión)
 * @returns {Tarea[]} Array de tareas leídas, array vacío si el archivo no existe o hay error
 */
function leerTareasDesdeArchivo(filename = "tareas") {
    // Construir ruta del archivo
    const filepath = path.join(__dirname, "..", "..", `${filename}.json`);
    try {
        // Verificar si el archivo existe
        if (fs.existsSync(filepath)) {
            // Leer el contenido del archivo como texto
            const textoJSON = fs.readFileSync(filepath, "utf-8");
            // Convertir texto JSON a objetos JavaScript
            const datos = JSON.parse(textoJSON);
            // Convertir objetos JavaScript a instancias de Tarea
            return JSONATareas(datos);
        }
        else {
            console.log(`Archivo ${filename}.json no existe. Se creará al guardar.`);
            return [];
        }
    }
    catch (error) {
        console.error(`Error leyendo archivo ${filename}.json:`, error);
        return [];
    }
}
/**
 * Guarda tareas en un archivo JSON.
 * @impure Interactúa con el sistema de archivos
 * @param {Tarea[]} tareas - Array de tareas a guardar
 * @param {string} [filename="tareas"] - Nombre del archivo donde guardar (sin extensión)
 * @returns {boolean} true si se guardó exitosamente, false si hubo error
 */
function guardarTareasEnArchivo(tareas, filename = "tareas") {
    // Construir ruta del archivo
    const filepath = path.join(__dirname, "..", "..", `${filename}.json`);
    try {
        // Convertir instancias de Tarea a objetos serializables
        const datosSerializables = tareasAJSON(tareas);
        // Convertir objetos a texto JSON (con formato bonito)
        const textoJSON = JSON.stringify(datosSerializables, null, 2);
        // Escribir texto en el archivo
        fs.writeFileSync(filepath, textoJSON, "utf-8");
        console.log(`Datos guardados en ${filename}.json`);
        return true;
    }
    catch (error) {
        console.error(`Error escribiendo archivo ${filename}.json:`, error);
        return false;
    }
}
//# sourceMappingURL=persistencia.js.map