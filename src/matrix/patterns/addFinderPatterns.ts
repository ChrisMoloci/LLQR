import {QRMatrixCanvas} from "../../types";

export function addFinderPatterns(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
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

export default addFinderPatterns;