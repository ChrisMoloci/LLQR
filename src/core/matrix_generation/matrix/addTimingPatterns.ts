import { QRMatrixCanvas } from "../../../data_structures/types/QRMatrixCanvas";

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

export default addTimingPatterns;