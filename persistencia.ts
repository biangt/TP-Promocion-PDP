/**
 * @fileoverview Módulo de persistencia de tareas.
 * Maneja la lectura y escritura de tareas en archivos JSON.
 */

import * as fs from "fs";
import * as path from "path";
import { Tarea } from './tarea.js';

// ============================================
// FUNCIONES PURAS - Transformación de datos
// ============================================

/**
 * Convierte un array de Tareas a formato serializable (JSON).
 * @pure
 * @param {Tarea[]} tareas - Array de tareas a convertir
 * @returns {any[]} Array de objetos con datos de tareas serializables
 */
export function tareasAJSON(tareas: Tarea[]): any[] {
    return tareas.map(tarea => tarea.toJSON());
}

/**
 * Convierte datos JSON a array de Tareas.
 * @pure
 * @param {any[]} datos - Array de objetos en formato JSON
 * @returns {Tarea[]} Array de instancias de Tarea, array vacío si hay error
 */
export function JSONATareas(datos: any[]): Tarea[] {
    try {
        if (!Array.isArray(datos)) {
            return [];
        }
        return datos.map(item => Tarea.fromJSON(item));
    } catch (error) {
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
export function leerTareasDesdeArchivo(filename: string = "tareas"): Tarea[] {
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
        } else {
            console.log(`Archivo ${filename}.json no existe. Se creará al guardar.`);
            return [];
        }
    } catch (error) {
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
export function guardarTareasEnArchivo(tareas: Tarea[], filename: string = "tareas"): boolean {
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
    } catch (error) {
        console.error(`Error escribiendo archivo ${filename}.json:`, error);
        return false;
    }
}