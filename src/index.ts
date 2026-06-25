/**
 * This file is used to export all public facing functions in the library.
 * DO NOT EXPORT VARAIABLES OR ANYTHING OTHER THAN TYPES FROM THIS FILE.
 * 
 * These functions are accessed like this:
 * import { generateFullQR } from ".";
 */

/**
 *  Importing functions from library
 */

// Core functions
import generateFullQR from "././public/generateFullQR";
import generateQRMatrix from "././public/generateQRMatrix";
import generateImageFromQRMatrix from "././public/generateImageFromQRMatrix";

// Helper functions
import defineConfig from "./config/defineConfig";
import { resetConfigToDefaults, getCurrentConfig } from "./config/defineConfig";

/**
 * Exporting functions out of the library
 */
export {
    // Core functions
    generateFullQR,
    generateQRMatrix,
    generateImageFromQRMatrix,
    
    // Helper functions
    defineConfig,
    resetConfigToDefaults,
    getCurrentConfig
}