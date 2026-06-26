import { QRMatrixCanvas } from "../../types/QRMatrixCanvas";

function addDarkModule(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    qrMatrixCanvas.matrix[size - 8]![8]! = 1; // Dark module in the center
    qrMatrixCanvas.reservedMatrix[size - 8]![8]! = true; // Reserve dark module

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

export default addDarkModule;