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
import { PublicQRSpecs as QRSpecs } from "../../types/QRSpecs";
import { PublicImageSpecs as ImageSpecs } from "../../types/ImageSpecs";

// Config Variable Property Types
import { ECCLevelCode } from "../../types/constantTypes/ECCLevelCode";
import { QRVersion } from "../../types/constantTypes/QRVersion";
import { MaskPatternCode } from "../../types/constantTypes/MaskPatternCode";
import { ModeSwitchingStrategy } from "../../types/constantTypes/ModeSwitchingStrategy";
import { ECISwitchingStrategy } from "../../types/constantTypes/ECISwitchingStrategy";

import { QRElementShape } from "../../types/constantTypes/QRElementShape";

// Other types
import { DataEncodingCharacterSet } from "../../types/constantTypes/DataEncodingCharacterSet";
import { DataEncodingMode } from "../../types/constantTypes/DataEncodingMode";
import { MaskPatternFunction } from "../../types/constantTypes/MaskPatternFunction";
import { EncodedDataSegment } from "../../types/EncodedDataSegment";
import { MaskedQRMatrix } from "../../types/MaskedQRMatrix";
import { PlainTextDataSegment } from "../../types/PlainTextDataSegment";
import { QRConfigs } from "../../types/QRConfigs";
import { QRMatrixCanvas } from "../../types/QRMatrixCanvas";
import { Radiuses } from "../../types/Radiuses";
import { ShapeLocation } from "../../types/ShapeLocation";

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