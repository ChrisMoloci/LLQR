// Main
import addDataToMatrix from "./addDataToMatrix";
import generateMatrix from "./generateMatrix";
import initializeMatrices from "./initializeMatrices";

// Format
import addFormatInformationToMatrix from "./format/addFormatInformationToMatrix";
import addVersionInformation from "./format/addVersionInformation";
import reserveFormatInformation from "./format/reserveFormatInformation";

// Masking
import determineOptimalMaskPattern from "./masking/determineOptimalMaskPattern";
import * as penaltyScoreFunctions from "./masking/determinePenaltyScore";
import maskAllMatrices from "./masking/maskAllMatrices";
import * as maskingFunctions from "./masking/maskingFunctions";

// Patterns
import addAlignmentPatterns from "./patterns/addAlignmentPatterns";
import addDarkModule from "./patterns/addDarkModule";
import addFinderPatterns from "./patterns/addFinderPatterns";
import addTimingPatterns from "./patterns/addTimingPatterns";

export {
    // Main
    addDataToMatrix,
    generateMatrix,
    initializeMatrices,

    // format
    addFormatInformationToMatrix,
    addVersionInformation,
    reserveFormatInformation,

    // Masking
    determineOptimalMaskPattern,
    penaltyScoreFunctions,
    maskAllMatrices,
    maskingFunctions,

    // Patterns
    addAlignmentPatterns,
    addDarkModule,
    addFinderPatterns,
    addTimingPatterns,
}