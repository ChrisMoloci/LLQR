/**
 * This file is used to export all public facing types in the library.
 * DO NOT EXPORT FUNCTIONS, CONSTANTS, VARIABLES, OR ANYTHING OTHER THAN TYPES FROM THIS FILE.
 * 
 * These types are accessed like this:
 * import type { QRSpecs } from "qr-code-generator-library/types";
 */

/**
 *  Importing types from library
 */

// Config Variable Types
import { PublicQRSpecs as QRSpecs } from "../data_structures/types/QRSpecs";
import { PublicImageSpecs as ImageSpecs } from "../data_structures/types/ImageSpecs";

// Config Variable Property Types
import { ECCLevelCode } from "../data_structures/types/QRSpecTypes/ECCLevelCode";
import { QRVersions } from "../data_structures/types/QRSpecTypes/QRVersions";
import { MaskPatternCode } from "../data_structures/types/QRSpecTypes/MaskPatternCode";
import { ModeSwitchingStrategy } from "../data_structures/types/QRSpecTypes/ModeSwitchingStrategy";
import { ECISwitchingStrategy } from "../data_structures/types/QRSpecTypes/ECISwitchingStrategy";

import { QRElementShape } from "../data_structures/types/ImageSpecTypes/QRElementShape";

/**
 * Exporting types out of the library
 */
export type {
    // Config variable types
    QRSpecs, // Partial of QRSpecs (real name is PublicQRSpecs)
    ImageSpecs, // Partial of ImageSpecs (real name is PublicImageSpecs)

    // Config variable property types
    ECCLevelCode,
    QRVersions,
    MaskPatternCode,
    ModeSwitchingStrategy,
    ECISwitchingStrategy,

    QRElementShape,
}