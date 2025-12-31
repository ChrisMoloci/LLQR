import { MaskPatternCode } from "../const";

interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

function generateMatrix(dataStream: Array<string>, version: number, eccLevel: string, maskPattern: MaskPatternCode | null = null) {
    // const matrix: Array<Array<number>> = []; // Will store the finalized matrix
    // const reservedAreas: Array<Array<boolean>> = []; // Stores the areas that data should not be placed into

    const size = 21 + (version - 1) * 4; // Calculate size of the matrix based on version

    // Initialize the matrix and reserved areas
    let qrMatrixCanvas: QRMatrixCanvas = initializeMatrices(size);
    console.log("Initialized QR Matrix Canvas:", qrMatrixCanvas);

    // Add Finder Patterns
    qrMatrixCanvas = addFinderPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Finder Patterns:", qrMatrixCanvas);

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

function addFinderPatterns(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    const finderPatternTemplate: Array<Array<number>> = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];

    const finderPatternPositions: Array<{x: number, y: number}> = [
        { x: 0, y: 0 }, // Top left
        { x: size - 7, y: 0 }, // Top right
        { x: 0, y: size - 7 }, // Bottom left
    ]; // Positions for the three finder patterns

    for (const pattern of finderPatternPositions) {
        addFinderPatternToMatrix(pattern.x, pattern.y);
        reserveFinderPattern(pattern.x, pattern.y);
    }

    // Helper function to add a finder pattern from a specific position to the matrix
    function addFinderPatternToMatrix(x: number, y: number) {
        for (let row = 0; row < 7; row++) {
            const matrixY = y + row;
            if (matrixY < 0 || matrixY >= size) throw new Error("Finder pattern Y position out of bounds.");
            for (let col = 0; col < 7; col++) {
                const matrixX = x + col;
                if (matrixX < 0 || matrixX >= size) throw new Error("Finder pattern X position out of bounds.");
                qrMatrixCanvas.matrix[matrixY]![matrixX]! = finderPatternTemplate[row]![col]!;
            }
        }
    }

    // Helper function to reserve the area of a finder pattern in the reserved matrix
    function reserveFinderPattern(x: number, y: number) {
        for (let row = 0; row < 7; row++) {
            const matrixY = y + row;
            if (matrixY < 0 || matrixY >= size) throw new Error("Finder pattern Y position out of bounds.");
            for (let col = 0; col < 7; col++) {
                const matrixX = x + col;
                if (matrixX < 0 || matrixX >= size) throw new Error("Finder pattern X position out of bounds.");
                qrMatrixCanvas.reservedMatrix[matrixY]![matrixX]! = finderPatternTemplate[row]![col]! === 1 ? true : false;
            }
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

export default generateMatrix;