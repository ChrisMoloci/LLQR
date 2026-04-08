/**
 * This file is used to export all public facing constants in the library.
 * DO NOT EXPORT FUNCTIONS, TYPES, VARIABLES, OR ANYTHING OTHER THAN CONSTANTS FROM THIS FILE.
 * 
 * These constants are accessed like this:
 * import { QR_DEFAULTS } from "qr-code-generator-library/constants";
 */

/**
 *  Importing constants from library
 */
// Spec ENUMS (not of enum type)
import { ECC_LEVEL_CODE } from "../data_structures/enums/ECC_LEVEL_CODE";
import { MASK_PATTERN_CODE } from "../data_structures/enums/MASK_PATTERN_CODE";
import { QR_ELEMENT_SHAPE } from "../data_structures/enums/QR_ELEMENT_SHAPE";

// Default Config ENUMS (not of enum type)
import { QR_DEFAULTS } from "../const";
import { IMAGE_DEFAULTS } from "../const";

/**
 * Exporting types out of the library
 */

export {
    // Spec enums
    ECC_LEVEL_CODE,
    MASK_PATTERN_CODE,
    QR_ELEMENT_SHAPE,

    // Default spec enum
    QR_DEFAULTS,
    IMAGE_DEFAULTS
}