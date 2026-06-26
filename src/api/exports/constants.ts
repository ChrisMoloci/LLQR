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
// Spec ENUMS (not of enum type)
import { ECC_LEVEL_CODE } from "../../constants/ECC_LEVEL_CODE";
import { QR_VERSION } from "../../constants/QR_VERSION";
import { MASK_PATTERN_CODE } from "../../constants/MASK_PATTERN_CODE";
import { MODE_SWITCHING_STRATEGY } from "../../constants/MODE_SWITCHING_STRATEGY";
import { ECI_SWITCHING_STRATEGY } from "../../constants/ECI_SWITCHING_STRATEGY";

import { QR_ELEMENT_SHAPE } from "../../constants/QR_ELEMENT_SHAPE";

// Default Config ENUMS (not of enum type)
import { QR_DEFAULTS } from "../../const";
import { IMAGE_DEFAULTS } from "../../const";

// Other constantTypes
import { COLOR } from "../../constants/COLOR";
import { DATA_ENCODING_MODE } from "../../constants/DATA_ENCODING_MODE";
import { DATA_ENCODING_CHARACTER_SET } from "../../constants/DATA_ENCODING_CHARACTER_SET";
import { MASK_PATTERN_FUNCTION } from "../../constants/MASK_PATTERN_FUNCTION";

/**
 * Exporting types out of the library
 */

export {
    // Spec constantTypes
    ECC_LEVEL_CODE,
    QR_VERSION,
    MASK_PATTERN_CODE,
    MODE_SWITCHING_STRATEGY,
    ECI_SWITCHING_STRATEGY,

    QR_ELEMENT_SHAPE,

    // Default spec enum
    QR_DEFAULTS,
    IMAGE_DEFAULTS,

    // Other constantTypes
    // Color,
    DATA_ENCODING_MODE,
    DATA_ENCODING_CHARACTER_SET,
    MASK_PATTERN_FUNCTION

}