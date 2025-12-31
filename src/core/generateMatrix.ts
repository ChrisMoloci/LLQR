import { MaskPatternCode } from "../const";
import { alignmentPatternLocations } from "../datasets/alignmentPatternLocations";

interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

function generateMatrix(dataStream: Array<string>, version: number, eccLevel: string, maskPattern: MaskPatternCode | null = null) {
    // const matrix: Array<Array<number>> = []; // Will store the finalized matrix
    // const reservedAreas: Array<Array<boolean>> = []; // Stores the areas that data should not be placed into

    const size = 21 + (version - 1) * 4; // Calculate size of the matrix based on version

    // -- 1. Initialize the matrix and reserved areas
    let qrMatrixCanvas: QRMatrixCanvas = initializeMatrices(size);
    console.log("Initialized QR Matrix Canvas:", qrMatrixCanvas);

    // -- 2. Add Finder Patterns
    qrMatrixCanvas = addFinderPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Finder Patterns:", qrMatrixCanvas);

    // Add Timing Patterns
    qrMatrixCanvas = addTimingPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Timing Patterns:", qrMatrixCanvas);

    // Add Alignment Patterns
    qrMatrixCanvas = addAlignmentPatterns(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Alignment Patterns:", qrMatrixCanvas);

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
        reserveFinderPattern(pattern.x > 0 ? pattern.x - 1 : pattern.x, pattern.y > 0 ? pattern.y - 1 : pattern.y);
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
        // Make sure we also reserve the separator area (8x8) around the finder pattern
        for (let row = 0; row < 8; row++) {
            const matrixY = y + row;
            if (matrixY < 0 || matrixY >= size) throw new Error("Finder pattern Y position out of bounds.");
            for (let col = 0; col < 8; col++) {
                const matrixX = x + col;
                if (matrixX < 0 || matrixX >= size) throw new Error("Finder pattern X position out of bounds.");
                qrMatrixCanvas.reservedMatrix[matrixY]![matrixX]! = true;
            }
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addTimingPatterns(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    for (let i = 8; i < size - 8; i++) {
        // Add the modules to the matrix
        qrMatrixCanvas.matrix[6]![i]! = i % 2 === 0 ? 1 : 0; // Horizontal timing pattern
        qrMatrixCanvas.matrix[i]![6]! = i % 2 === 0 ? 1 : 0; // Vertical timing pattern

        // Reserve the modules in the reserved matrix
        qrMatrixCanvas.reservedMatrix[6]![i]! = true; // Horizontal timing pattern
        qrMatrixCanvas.reservedMatrix[i]![6]! = true; // Vertical timing pattern
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addAlignmentPatterns(qrMatrixCanvas: QRMatrixCanvas, version: number, size: number): QRMatrixCanvas {
    const alignmentPatternTemplate: Array<Array<number>> = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];

    const alignmentPatterns: number[] | undefined = alignmentPatternLocations[version];

    // If no alignment patterns are needed, return the matrix as is
    if (!alignmentPatterns || alignmentPatterns.length === 0) return qrMatrixCanvas;

    console.log("Alignment pattern locations for version", version, ":", alignmentPatterns);

    for (let i = 0; i < alignmentPatterns!.length; i++) {
        for (let j = 0; j < alignmentPatterns!.length; j++) {
            const centerX: number = alignmentPatterns![i]!;
            const centerY: number = alignmentPatterns![j]!;

            /**
             * Skip if this would overlap with finder patterns
             * Finder patterns are at (0,0), (0, size-7), and (size-7, 0)
             */
            if ((centerX < 9 && centerY < 9) ||                    // Top-left finder
                (centerX < 9 && centerY > size - 10) ||            // Bottom-left finder  
                (centerX > size - 10 && centerY < 9)) {            // Top-right finder
                    // TODO: Verify necessity of this check
                    console.log(`Skipping alignment pattern at (${centerX}, ${centerY}) due to overlap with finder pattern.`);
                    break;
            }

            // Place the 5x5 alignment pattern centered at (centerX, centerY)
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    const matrixX = centerX - 2 + x; // Offset by 2 to center the pattern
                    const matrixY = centerY - 2 + y; // Offset by 2 to center the pattern
                    
                    // Ensure we're within matrix bounds
                    if (matrixX >= 0 && matrixX < size && matrixY >= 0 && matrixY < size) {
                        // Place the alignment pattern modules in the matrix
                        qrMatrixCanvas.matrix[matrixY]![matrixX]! = alignmentPatternTemplate[y]![x]!;
                        // Reserve the alignment pattern in the reserved matrix
                        qrMatrixCanvas.reservedMatrix[matrixY]![matrixX]! = true;
                    }
                }
            }
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

export default generateMatrix;