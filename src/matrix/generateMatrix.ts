import determinePenaltyScore from "./masking/determinePenaltyScore";
import { getBitLength } from "../helpers/getBitLength";
import { MaskPatternCode } from "../api/exports/types";
import { QRMatrixCanvas } from "../data_structures/types/QRMatrixCanvas";
import { MaskedQRMatrix } from "../data_structures/types/MaskedQRMatrix";
import { MASK_PATTERN_CODE } from "../api/exports/constants";
import { QRVersion } from "../data_structures/types/constantTypes/QRVersion"
import { QR_VERSION } from "../data_structures/constants/QR_VERSION";
import initializeMatrices from "./initializeMatrices";
import addFinderPatterns from "./patterns/addFinderPatterns";
import addTimingPatterns from "./patterns/addTimingPatterns";
import addAlignmentPatterns from "./patterns/addAlignmentPatterns";
import addDarkModule from "./patterns/addDarkModule";
import reserveFormatInformation from "./format/reserveFormatInformation";
import addVersionInformation from "./format/addVersionInformation";
import addDataToMatrix from "./addDataToMatrix";
import maskAllMatrices from "./masking/maskAllMatrices";
import addFormatInformationToMatrix from "./format/addFormatInformationToMatrix";
import determineOptimalMaskPattern from "./masking/determineOptimalMaskPattern";

function generateMatrix(dataStream: Array<string>, version: QRVersion, eccLevel: string, maskPattern: MaskPatternCode | null): Array<Array<number>> {
    // dataStream = [];
    // const matrix: Array<Array<number>> = []; // Will store the finalized matrix
    // const reservedAreas: Array<Array<boolean>> = []; // Stores the areas that data should not be placed into

    if (version === null) throw new Error("Version must be specified to generate the QR matrix.");

    const size = 21 + (version - 1) * 4; // Calculate size of the matrix based on version

    // -- 1. Initialize the matrix and reserved areas --
    let qrMatrixCanvas: QRMatrixCanvas = initializeMatrices(size);
    console.log("Initialized QR Matrix Canvas:", qrMatrixCanvas);

    // -- 2. Add Finder Patterns
    qrMatrixCanvas = addFinderPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Finder Patterns:", qrMatrixCanvas);

    // -- 3. Add Timing Patterns --
    qrMatrixCanvas = addTimingPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Timing Patterns:", qrMatrixCanvas);

    // -- 4. Add Alignment Patterns --
    qrMatrixCanvas = addAlignmentPatterns(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Alignment Patterns:", qrMatrixCanvas);
    // TODO: FIX MISSING ALLIGNMENT PATTERNS

    // -- 5. Add Dark Module --
    qrMatrixCanvas = addDarkModule(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Dark Module:", qrMatrixCanvas);

    // -- 6. Reserve format information --
    // Note: Only reserving, not adding since we haven't applied any masking
    qrMatrixCanvas = reserveFormatInformation(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after reserving Format Information:", qrMatrixCanvas);

    // -- 7. Add version information if version >= 7 --
    if (version >= QR_VERSION.V7) qrMatrixCanvas = addVersionInformation(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Version Information:", qrMatrixCanvas);

    // -- 8. Place data bits into the matrix, skipping reserved areas --
    qrMatrixCanvas = addDataToMatrix(qrMatrixCanvas, dataStream, size);
    console.log("QR Matrix Canvas after adding Data Bits:", qrMatrixCanvas);

    // -- 9. Mask the matrix with every possible mask pattern if maskPattern is null --
    const maskedMatrices: Array<MaskedQRMatrix> = maskAllMatrices(qrMatrixCanvas, size);
    console.log("All Masked QR Matrices:", maskedMatrices);

    // -- 10. Add format information to all the masked matrices --
    const finalizedMatrices: Array<MaskedQRMatrix> = 
        maskedMatrices.map((maskedMatrix) => 
            addFormatInformationToMatrix(maskedMatrix, eccLevel, size));
    console.log("Finalized QR Matrices with Format Information:", finalizedMatrices);

    // -- 11. Return the appropriate matrix based on maskPattern if mask pattern is specified --
    if (maskPattern !== null) {
        // If a specific mask pattern is requested, return that matrix
        return finalizedMatrices.find(matrix => matrix.maskPattern === maskPattern)!.matrix;
    }

    // -- 12. Determine optimal mask pattern and use that as the final matrix if no mask pattern is specified --
    const optimalMatrix: Array<Array<number>> = determineOptimalMaskPattern(finalizedMatrices);
    console.log("Optimal QR Matrix selected:", optimalMatrix);

    // -- 12. Return the finalized matrix --
    return optimalMatrix;
}

export default generateMatrix;