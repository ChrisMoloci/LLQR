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
import generateFullQR from "./internal/generateFullQR";
import generateQRMatrix from "./internal/generateQRMatrix";
import generateImageFromQRMatrix from "./internal/generateImageFromQRMatrix";

// Helper functions
import defineConfig from "./core/helpers/defineConfig";
import { resetConfigToDefaults, getCurrentConfig } from "./core/helpers/defineConfig";

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