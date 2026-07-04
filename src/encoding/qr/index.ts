// Main
export * from "./encodeWithModeSwitching";
export * from "./encodeWithSingleMode";

// Bitstream
export * from "./bitstream/generateDatastream"
export * from "./bitstream/generateLengthIndicator";
export * from "./bitstream/prepareDatastream";

// ECI
export * from "./eci/generateECIIndicatorAndAssignmentNumber";
export * from "./eci/getECIAssignmentNumberSize";

// Mode detection
export * from "./mode-detection/determineEncodingMode"

// Segmentation
export * from "./segmentation/getCharCountIndicatorLength";
export * from "./segmentation/mergeAdjacentSegments";
export * from "./segmentation/optimizeAdjacentAlphanumericNumericSegments";
export * from "./segmentation/optimizeAdjacentByteSegments";
export * from "./segmentation/segmentInvalidKanjiData";