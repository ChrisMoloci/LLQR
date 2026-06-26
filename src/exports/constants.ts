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
import { ECC_LEVEL_CODE } from "../data_structures/constants/ECC_LEVEL_CODE";
import { QR_VERSION } from "../data_structures/constants/QR_VERSION";
import { MASK_PATTERN_CODE } from "../data_structures/constants/MASK_PATTERN_CODE";
import { MODE_SWITCHING_STRATEGY } from "../data_structures/constants/MODE_SWITCHING_STRATEGY";
import { ECI_SWITCHING_STRATEGY } from "../data_structures/constants/ECI_SWITCHING_STRATEGY";

import { QR_ELEMENT_SHAPE } from "../data_structures/constants/QR_ELEMENT_SHAPE";

// Default Config ENUMS (not of enum type)
import { QR_DEFAULTS } from "../const";
import { IMAGE_DEFAULTS } from "../const";

// Other constants
import { Color } from "../data_structures/constants/COLOR";
import { DATA_ENCODING_MODE } from "../data_structures/constants/DATA_ENCODING_MODE";
import { DATA_ENCODING_CHARACTER_SET } from "../data_structures/constants/DATA_ENCODING_CHARACTER_SET";
import { MASK_PATTERN_FUNCTION } from "../data_structures/constants/MASK_PATTERN_FUNCTION";

/**
 * Exporting types out of the library
 */

export {
    // Spec constants
    ECC_LEVEL_CODE,
    QR_VERSION,
    MASK_PATTERN_CODE,
    MODE_SWITCHING_STRATEGY,
    ECI_SWITCHING_STRATEGY,

    QR_ELEMENT_SHAPE,

    // Default spec enum
    QR_DEFAULTS,
    IMAGE_DEFAULTS,

    // Other constants
    // Color,
    DATA_ENCODING_MODE,
    DATA_ENCODING_CHARACTER_SET,
    MASK_PATTERN_FUNCTION

}