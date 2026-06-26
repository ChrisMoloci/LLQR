/**
 * This file is used to export all api facing constantTypes in the library.
 * DO NOT EXPORT FUNCTIONS, TYPES, VARIABLES, OR ANYTHING OTHER THAN CONSTANTS FROM THIS FILE.
 * 
 * These constantTypes are accessed like this:
 * import { QR_DEFAULTS } from "qr-code-generator-library/constantTypes";
 */

/**
 *  Importing constantTypes from library
 */
// ENUM Constants (not of enum type)
import * as constants from "../../constants"

// Default Config ENUMS (not of enum type)
import { QR_DEFAULTS } from "../../const";
import { IMAGE_DEFAULTS } from "../../const";

/**
 * Exporting constants out of the library
 */

export {
    // ENUM Constants
    constants,

    // Default spec enum
    QR_DEFAULTS,
    IMAGE_DEFAULTS,
}