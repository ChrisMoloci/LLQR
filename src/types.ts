import { ECCLevelCode, MaskPatternCode } from "./const";

export type qrVersions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
// export type qrMasks = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;

export type Color = RGB | RGBA | HEX | HSL;

export const QRELEMENTSHAPES = {
    SQUARE: "SQUARE",
    CIRCLE: "CIRCLE",
    ROUNDED: "ROUNDED",
} as const;

export type QRElementShape = typeof QRELEMENTSHAPES[keyof typeof QRELEMENTSHAPES];

export type qrSpecs = {
    eccLevel: ECCLevelCode
    version: qrVersions | null, // Null means auto
    forceByteEncoding: boolean,
    maskPattern: MaskPatternCode | null, // Null means auto
    preferrECI: boolean,
    preferrBOM: boolean
}

export type ImageSpecs = {
    // Colors
    backgroundColor: string,
    moduleColor: string,
    finderPatternOutlineColor: string,
    finderPatternInnerBackgroundColor: string,
    finderPatternInnerColor: string,
    alignmentPatternOutlineColor: string, // Maybe
    alignmentPatternInnerColor: string, // Maybe
    gridStrokeColor: string,

    // Shapes
    moduleShape: QRElementShape,
    finderPatternOutlineShape: QRElementShape,
    finderPatternInnerBackgroundShape: QRElementShape,
    finderPatternInnerShape: QRElementShape,

    // General
    roundness: number, // 0-1 for rounded shapes
    gridStrokeWidth: number, // 0-1 for percent
}

export interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

// TODO Add types for datesets to get rid of TS errors