/**
 * This file is used to export all public facing public functions in the library.
 * DO NOT EXPORT TYPES, VARIABLES, CONSTANTS, OR ANYTHING OTHER THAN CONSTANTS FROM THIS FILE.
 * 
 * These functions are accessed like this:
 * import { determineMode } from "qr-code-generator-library/public";
 */

/**
 *  Importing functions from library
 */
// Core functions
import determineMode from "../encoding/qr/mode-detection/determineEncodingMode";
import { encodeWithSingleMode } from "../encoding/qr/encodeWithSingleMode";
import { encodeWithModeSwitching } from "../encoding/qr/encodeWithModeSwitching";
import determineMinQRVersion from "../versioning/determineMinQRVersion";
import prepareDatastream from "../encoding/qr/bitstream/prepareDatastream";
import generateECCStream from "../ecc/generateECCStream";
import generateMatrix from "../matrix/generateMatrix";
import generateImageCanvasFromMatrix from "../image/generateImageCanvasFromMatrix";

// Helper functions
import encodeNumeric from "../encoding/binary/modes/encodeNumeric";
import encodeAlphanumeric from "../encoding/binary/modes/encodeAlphanumeric";
import encodeKanji from "../encoding/binary/modes/encodeKanji";
import encodeBinary from "../encoding/binary/modes/encodeBinary";
import encodeISO_8859_1 from "../encoding/binary/charsets/ISO_IEC_8859/encodeISO-8859-1";
import encodeUTF8 from "../encoding/binary/charsets/unicode/encodeUTF-8";

import { computeTheoreticalSizeOfDataForVersion } from "../versioning/computeTheoreticalSizeOfDataForVersion";
import optimizeCrossCompatibleSegments from "../encoding/qr/segmentation/optimizeCrossCompatSegments";
import { getCharCountIndicatorLength } from "../encoding/qr/segmentation/getCharCountIndicatorLength";
import { getECIAssignmentNumberSize } from "../encoding/qr/eci/getECIAssignmentNumberSize";

import generateECIIndicatorAndAssignmentNumber from "../encoding/qr/eci/generateECIIndicatorAndAssignmentNumber";
import generateLengthIndicator from "../encoding/qr/bitstream/generateLengthIndicator";

import normalizeDataStream from "../ecc/normalizeDataStream";
import groupDataAndBlocks from "../ecc/groupDataAndBlocks";
import padECCZeroBytesToBlocks from "../ecc/padECCZeroBytesToBlocks";
import computeECC from "../ecc/computeECC";
import interleaveData from "../ecc/interleaveData";

import initializeMatrices from "../matrix/initializeMatrices";
import addFinderPatterns from "../matrix/patterns/addFinderPatterns";
import addTimingPatterns from "../matrix/patterns/addTimingPatterns";
import addAlignmentPatterns from "../matrix/patterns/addAlignmentPatterns";
import addDarkModule from "../matrix/patterns/addDarkModule";
import reserveFormatInformation from "../matrix/format/reserveFormatInformation";
import addVersionInformation from "../matrix/format/addVersionInformation";
import addDataToMatrix from "../matrix/addDataToMatrix";
import maskAllMatrices from "../matrix/masking/maskAllMatrices";
import addFormatInformationToMatrix from "../matrix/format/addFormatInformationToMatrix";
import determineOptimalMaskPattern from "../matrix/masking/determineOptimalMaskPattern";

import computeFinderPatternsLocations from "../image/geometry/computeFinderPatternLocations";
import computeAlignmentPatternsLocations from "../image/geometry/computeAlignmentPatternLocations";
import renderFinderPatterns from "../image/render/renderFinderPatterns";
import renderAlignmentPatterns from "../image/render/renderAlignmentPatterns";
import isReserved from "../image/geometry/isReserved";
import renderDataStream from "../image/render/renderDatastream";

import drawCircleModule from "../image/draw/drawCircleModule";
import drawSquareModule from "../image/draw/drawSquareModule";
import drawRoundedModule from "../image/draw/drawRoundedModule";

/**
 * Exporting types out of the library
 */

export {
    // Core functions
    determineMode,
    encodeWithSingleMode,
    encodeWithModeSwitching,
    determineMinQRVersion,
    prepareDatastream,
    generateECCStream,
    generateMatrix,
    generateImageCanvasFromMatrix,

    // Individual Encoders
    encodeNumeric,
    encodeAlphanumeric,
    encodeKanji,
    encodeBinary,
    encodeISO_8859_1,
    encodeUTF8,

    // Helper functions
    computeTheoreticalSizeOfDataForVersion,
    optimizeCrossCompatibleSegments,
    getCharCountIndicatorLength,
    getECIAssignmentNumberSize,
}