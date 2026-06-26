/**
 * This file is used to export all api facing types in the library.
 * DO NOT EXPORT FUNCTIONS, CONSTANTS, VARIABLES, OR ANYTHING OTHER THAN TYPES FROM THIS FILE.
 * 
 * These types are accessed like this:
 * import type { QRSpecs } from "qr-code-generator-library/types";
 */

/**
 *  Importing types from library
 */

// Config Variable Types
import { PublicQRSpecs as QRSpecs } from "../../data_structures/types/QRSpecs";
import { PublicImageSpecs as ImageSpecs } from "../../data_structures/types/ImageSpecs";

// Config Variable Property Types
import { ECCLevelCode } from "../../data_structures/types/constantTypes/ECCLevelCode";
import { QRVersion } from "../../data_structures/types/constantTypes/QRVersion";
import { MaskPatternCode } from "../../data_structures/types/constantTypes/MaskPatternCode";
import { ModeSwitchingStrategy } from "../../data_structures/types/constantTypes/ModeSwitchingStrategy";
import { ECISwitchingStrategy } from "../../data_structures/types/constantTypes/ECISwitchingStrategy";

import { QRElementShape } from "../../data_structures/types/constantTypes/QRElementShape";

// Other types
import { DataEncodingCharacterSet } from "../../data_structures/types/constantTypes/DataEncodingCharacterSet";
import { DataEncodingMode } from "../../data_structures/types/constantTypes/DataEncodingMode";
import { MaskPatternFunction } from "../../data_structures/types/constantTypes/MaskPatternFunction";
import { EncodedDataSegment } from "../../data_structures/types/EncodedDataSegment";
import { MaskedQRMatrix } from "../../data_structures/types/MaskedQRMatrix";
import { PlainTextDataSegment } from "../../data_structures/types/PlainTextDataSegment";
import { QRConfigs } from "../../data_structures/types/QRConfigs";
import { QRMatrixCanvas } from "../../data_structures/types/QRMatrixCanvas";
import { Radiuses } from "../../data_structures/types/Radiuses";
import { ShapeLocation } from "../../data_structures/types/ShapeLocation";

/**
 * Exporting types out of the library
 */
export type {
    // Config variable types
    QRSpecs, // Partial of QRSpecs (real name is PublicQRSpecs)
    ImageSpecs, // Partial of ImageSpecs (real name is PublicImageSpecs)

    // Config variable property types
    ECCLevelCode,
    QRVersion,
    MaskPatternCode,
    ModeSwitchingStrategy,
    ECISwitchingStrategy,

    QRElementShape,

    // Other types
    DataEncodingCharacterSet,
    DataEncodingMode,
    MaskPatternFunction,
    EncodedDataSegment,
    MaskedQRMatrix,
    PlainTextDataSegment,
    QRConfigs,
    QRMatrixCanvas,
    Radiuses,
    ShapeLocation
}