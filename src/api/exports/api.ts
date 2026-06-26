/**
 * This file is used to export all api facing api functions in the library.
 * DO NOT EXPORT TYPES, VARIABLES, CONSTANTS, OR ANYTHING OTHER THAN CONSTANTS FROM THIS FILE.
 * 
 * These functions are accessed like this:
 * import { determineMode } from "qr-code-generator-library/api";
 */

/**
 *  Importing functions from library
 */
// Config
import * as config from "../../config"

// ECC
import * as ecc from "../../ecc"

// Encoding
import * as encoding from "../../encoding"

// Matrix
import * as matrix from "../../matrix";

// Image
import * as image from "../../image"

// Utils
import * as utils from "../../utils"

// Versioning
import * as versioning from "../../versioning"

/**
 * Exporting functions out of the library
 */
export {
    // Config
    config,

    // Versioning
    versioning,

    // Utils
    utils,

    // Matrix
    matrix,

    // ECC
    ecc,

    // Encoding
    encoding,

    // Image
    image
}