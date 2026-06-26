import {QRMatrixCanvas} from "../../types";

export function reserveFormatInformation(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    const formatPositions: Array<[number, number]> = [
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
        [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
        [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8],
        [size - 6, 8], [size - 7, 8], [8, size - 8], [8, size - 7], [8, size - 6],
        [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
    ];

    for (const [row, col] of formatPositions) {
        qrMatrixCanvas.reservedMatrix[row]![col]! = true;
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

export default reserveFormatInformation;