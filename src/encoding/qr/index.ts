// Main
import encodeWithModeSwitching from "./encodeWithModeSwitching";
import encodeWithSingleMode from "./encodeWithSingleMode";

// Bitstream
import generateLengthIndicator from "./bitstream/generateLengthIndicator";
import prepareDatastream from "./bitstream/prepareDatastream";

// ECI
import generateECIIndicatorAndAssignmentNumber from "./eci/generateECIIndicatorAndAssignmentNumber";
import getECIAssignmentNumberSize from "./eci/getECIAssignmentNumberSize";

// Mode detection
import determineMode from "./mode-detection/determineEncodingMode"

// Segmentation
import getCharCountIndicatorLength from "./segmentation/getCharCountIndicatorLength";
import mergeAdjacentSegments from "./segmentation/mergeAdjacentSegments";
import * as crossCompatSegmentationFunctions from "./segmentation/optimizeCrossCompatSegments";
import segmentInvalidKanjiCandidate from "./segmentation/segmentInvalidKanjiData";

export {
    // Main
    encodeWithModeSwitching,
    encodeWithSingleMode,

    // Bitstream
    generateLengthIndicator,
    prepareDatastream,

    // ECI
    generateECIIndicatorAndAssignmentNumber,
    getECIAssignmentNumberSize,

    // Mode detection
    determineMode,

    // Segmentation
    getCharCountIndicatorLength,
    mergeAdjacentSegments,
    crossCompatSegmentationFunctions,
    segmentInvalidKanjiCandidate
}