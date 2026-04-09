/**
 * This file is used to export all public facing api functions in the library.
 * DO NOT EXPORT TYPES, VARIABLES, CONSTANTS, OR ANYTHING OTHER THAN CONSTANTS FROM THIS FILE.
 * 
 * These functions are accessed like this:
 * import { determineMode } from "qr-code-generator-library/api";
 */

/**
 *  Importing functions from library
 */
// Core functions
import determineMode from "../core/matrix_generation/determineEncodingMode";
import { encodeWithSingleMode } from "../core/matrix_generation/encodeWithSingleMode";
import { encodeWithModeSwitching } from "../core/matrix_generation/encodeWithModeSwitching";
import determineMinQRVersion from "../core/matrix_generation/determineMinQRVersion";
import prepareDatastream from "../core/matrix_generation/prepareDatastream";
import generateECCStream from "../core/matrix_generation/ecc/generateECCStream";
import generateMatrix from "../core/matrix_generation/matrix/generateMatrix";

// Helper functions
import encodeNumeric from "../core/encoders/encodeNumeric";
import encodeAlphanumeric from "../core/encoders/encodeAlphanumeric";
import encodeKanji from "../core/encoders/encodeKanji";
import encodeBinary from "../core/encoders/encodeBinary";

import { computeTheoreticalSizeOfDataForVersion } from "../core/helpers/computeTheoreticalSizeOfDataForVersion";
import optimizeCrossCompatibleSegments from "../core/helpers/optimizeCrossCompatSegments";
import { getCharCountIndicatorLength } from "../core/helpers/getCharCountIndicatorLength";
import { getECIAssignmentNumberSize } from "../core/helpers/getECIAssignmentNumberSize";

import generateECIIndicatorAndAssignmentNumber from "../core/helpers/generateECIIndicatorAndAssignmentNumber";
import generateLengthIndicator from "../core/helpers/generateLengthIndicator";

import normalizeDataStream from "../core/matrix_generation/ecc/normalizeDataStream";
import groupDataAndBlocks from "../core/matrix_generation/ecc/groupDataAndBlocks";
import padECCZeroBytesToBlocks from "../core/matrix_generation/ecc/padECCZeroBytesToBlocks";
import computeECC from "../core/matrix_generation/ecc/computeECC";
import interleaveData from "../core/matrix_generation/ecc/interleaveData";

import initializeMatrices from "../core/matrix_generation/matrix/initializeMatrices";
import addFinderPatterns from "../core/matrix_generation/matrix/addFinderPatterns";
import addTimingPatterns from "../core/matrix_generation/matrix/addTimingPatterns";
import addAlignmentPatterns from "../core/matrix_generation/matrix/addAlignmentPatterns";
import addDarkModule from "../core/matrix_generation/matrix/addDarkModule";
import reserveFormatInformation from "../core/matrix_generation/matrix/reserveFormatInformation";
import addVersionInformation from "../core/matrix_generation/matrix/addVersionInformation";
import addDataToMatrix from "../core/matrix_generation/matrix/addDataToMatrix";
import maskAllMatrices from "../core/matrix_generation/matrix/maskAllMatrices";
import addFormatInformationToMatrix from "../core/matrix_generation/matrix/addFormatInformationToMatrix";
import determineOptimalMaskPattern from "../core/matrix_generation/matrix/determineOptimalMaskPattern";

/**
 * Exporting types out of the library
 */