import { MaskPatternCode } from "../const";

interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

function generateMatrix(dataStream: Array<string>, version: number, eccLevel: string, maskPattern: MaskPatternCode | null = null) {
    const matrix: Array<Array<number>> = []; // Will store the finalized matrix
    const reservedAreas: Array<Array<boolean>> = []; // Stores the areas that data should not be placed into

    const size = 21 + (version - 1) * 4; // Calculate size of the matrix based on version

    // Initialize the matrix and reserved areas
    const qrMatrixCanvas: QRMatrixCanvas = initializeMatrices(size);
    console.log("Initialized QR Matrix Canvas:", qrMatrixCanvas);

    // Add Finder Patterns

    // Add Timing Patterns

    // Add Alignment Patterns

    // Add dark module

    // Reserve format information

    // Add version information if version >= 7

    // Place data bits into the matrix, skipping reserved areas

    // Mask the matrix with every possible mask pattern if maskPattern is null

    // Determine optimal mask pattern and use that as the final matrix

    // Return the finalized matrix
}

function initializeMatrices(size: number): QRMatrixCanvas {
    const qrMatrixCanvas: QRMatrixCanvas = {
        matrix: Array.from({length: size}, () => Array.from({length: size}, () => 0)),
        reservedMatrix: Array.from({length: size}, () => Array.from({length: size}, () => false))
    };
    return qrMatrixCanvas;
}

export default generateMatrix;