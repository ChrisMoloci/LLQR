import { MaskPatternCode } from "../../api/exports/types";
import { MASK_PATTERN_FUNCTION } from "../../constants/MASK_PATTERN_FUNCTION";
import { MaskedQRMatrix } from "../../types/MaskedQRMatrix";
import { QRMatrixCanvas } from "../../types/QRMatrixCanvas";

// Mask Functions union type
// export type MaskFunctions = typeof mask0 | typeof mask1 | typeof mask2 | typeof mask3 | typeof mask4 | typeof mask5 | typeof mask6 | typeof mask7;

export default function maskQR(maskCode: MaskPatternCode, qrMatrixCanvas: QRMatrixCanvas, size: number): MaskedQRMatrix {
    const maskFunction = MASK_PATTERN_FUNCTION[maskCode!];

    for (let col = size - 1; col >= 0; col--) {
        if (col === 6) col--;

        for (let row = size - 1; row >= 0; row--) {
            if (!qrMatrixCanvas.reservedMatrix[row]![col]!) {
                qrMatrixCanvas.matrix[row]![col]! = maskFunction(qrMatrixCanvas.matrix, row, col);
            }
        }
    }

    // Return a MaskedQRMatrix object with the matrix and mask pattern
    return {
        matrix: qrMatrixCanvas.matrix,
        maskPattern: maskCode
    }
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