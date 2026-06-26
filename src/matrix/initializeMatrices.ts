import {QRMatrixCanvas} from "../types";

export function initializeMatrices(size: number): QRMatrixCanvas {
    const qrMatrixCanvas: QRMatrixCanvas = {
        matrix: Array.from({length: size}, () => Array.from({length: size}, () => 0)),
        reservedMatrix: Array.from({length: size}, () => Array.from({length: size}, () => false))
    };
    return qrMatrixCanvas;
}

export default initializeMatrices;