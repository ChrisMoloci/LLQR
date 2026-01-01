import { QRMatrixCanvas } from "../types";

// Mask Functions union type
export type MaskFunctions = typeof mask0 | typeof mask1 | typeof mask2 | typeof mask3 | typeof mask4 | typeof mask5 | typeof mask6 | typeof mask7;

export default function maskQR(maskFunction: MaskFunctions, qrMatrixCanvas: QRMatrixCanvas, size: number): Array<Array<number>> {
    for (let col = size - 1; col >= 0; col--) {
        if (col === 6) col--;

        for (let row = size - 1; row >= 0; row--) {
            if (!qrMatrixCanvas.reservedMatrix[row]![col]!) {
                qrMatrixCanvas.matrix[row]![col]! = maskFunction(qrMatrixCanvas.matrix, row, col);
            }
        }
    }

    return qrMatrixCanvas.matrix;
}

export function mask0(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((row + col) % 2 === 0 ? 1 : 0);
}

export function mask1(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((row) % 2 === 0 ? 1 : 0);
}

export function mask2(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((col) % 3 === 0 ? 1 : 0);
}

export function mask3(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((row + col) % 3 === 0 ? 1 : 0);
}

export function mask4(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0 ? 1 : 0);
}

export function mask5(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ (((row * col) % 2) + ((row * col) % 3) === 0 ? 1 : 0);
}

export function mask6(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]!^ ((((row * col) % 2) + (row * col) % 3) % 2 === 0 ? 1 : 0);
}

export function mask7(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((((row + col) % 2) + (row * col) % 3) % 2 === 0 ? 1 : 0);
}