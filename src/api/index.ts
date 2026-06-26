/**
 * This file is used to export all api facing functions in the library.
 * DO NOT EXPORT VARAIABLES OR ANYTHING OTHER THAN TYPES FROM THIS FILE.
 * 
 * These functions are accessed like this:
 * import { generateFullQR } from ".";
 */

/**
 *  Importing functions from library
 */

// Core functions
import generateFullQR from "./generateFullQR";
import generateQRMatrix from "./generateQRMatrix";
import generateImageFromQRMatrix from "./generateImageFromQRMatrix";

/**
 * Exporting functions out of the library
 */
export {
    // Core functions
    generateFullQR,
    generateQRMatrix,
    generateImageFromQRMatrix
}