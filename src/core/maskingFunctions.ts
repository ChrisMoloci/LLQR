import { MASK_PATTERN_CODES } from "../const";
import { QRMatrixCanvas } from "../types";

// Mask Functions union type
// export type MaskFunctions = typeof mask0 | typeof mask1 | typeof mask2 | typeof mask3 | typeof mask4 | typeof mask5 | typeof mask6 | typeof mask7;

// Create a mapping of mask pattern codes to their functions
export const MASK_PATTERN_FUNCTIONS = {
    [MASK_PATTERN_CODES[0]]: mask0,
    [MASK_PATTERN_CODES[1]]: mask1,
    [MASK_PATTERN_CODES[2]]: mask2,
    [MASK_PATTERN_CODES[3]]: mask3,
    [MASK_PATTERN_CODES[4]]: mask4,
    [MASK_PATTERN_CODES[5]]: mask5,
    [MASK_PATTERN_CODES[6]]: mask6,
    [MASK_PATTERN_CODES[7]]: mask7
} as const;

export type MaskPatternFunction = typeof MASK_PATTERN_FUNCTIONS[keyof typeof MASK_PATTERN_FUNCTIONS];

export default function maskQR(maskFunction: MaskPatternFunction, qrMatrixCanvas: QRMatrixCanvas, size: number): Array<Array<number>> {
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

function mask0(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((row + col) % 2 === 0 ? 1 : 0);
}

function mask1(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((row) % 2 === 0 ? 1 : 0);
}

function mask2(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((col) % 3 === 0 ? 1 : 0);
}

function mask3(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((row + col) % 3 === 0 ? 1 : 0);
}

function mask4(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0 ? 1 : 0);
}

function mask5(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ (((row * col) % 2) + ((row * col) % 3) === 0 ? 1 : 0);
}

function mask6(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]!^ ((((row * col) % 2) + (row * col) % 3) % 2 === 0 ? 1 : 0);
}

function mask7(matrix: Array<Array<number>>, row: number, col: number): number {
    return matrix[row]![col]! ^ ((((row + col) % 2) + (row * col) % 3) % 2 === 0 ? 1 : 0);
}