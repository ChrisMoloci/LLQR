/**
 * This file is used to export all api facing datasets/lookup tables in the library.
 * DO NOT EXPORT FUNCTIONS, TYPES, VARIABLES, CONSTANTS, OR ANYTHING OTHER THAN CONSTANTS FROM THIS FILE.
 * 
 * These datasets are accessed like this:
 * import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
 */


/**
 *  Importing datasets from library
 */
import { alignmentPatternLocations } from "../../datasets/alignmentPatternLocations";
import { qrDataCapacityBits } from "../../datasets/qrDataCapacityBits";
import { qrEncodingCharCounts } from "../../datasets/qrEncodingCharCounts";
import unicodeToShiftJIS from "../../datasets/unicode_to_shiftjis";

/**
 * Exporting types out of the library
 */
export {
    alignmentPatternLocations,
    qrDataCapacityBits,
    qrEncodingCharCounts,
    unicodeToShiftJIS
}