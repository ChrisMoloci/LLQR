import { DataEncodingCharacterSet, DataEncodingMode, ECCLevelCode, MaskPatternCode, QRElementShape } from "./enums";

// Allowed QR Versions
export type QRVersions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export type ModeSwitchingModes = "disabled" | "auto" | "forced";
export type ECISwitchingModes = "disabled" | "auto" | "forced";

// Defines the rules for generating a QR code
export type QRSpecs = {
    eccLevel: ECCLevelCode
    minPreferredVersion: QRVersions | null, // Null means auto
    forceByteEncoding: boolean,
    maskPattern: MaskPatternCode | null, // Null means auto
    useModeSwitching: ModeSwitchingModes,
    useECISwitching: ECISwitchingModes 
    preferrECI: boolean,
    preferrBOM: boolean
}

// Defines the rules for generating an image from a QR matrix
export type ImageSpecs = {
    // Colors
    backgroundColor: string,
    moduleColor: string,
    finderPatternOutlineColor: [string, string, string],
    finderPatternInnerBackgroundColor: [string, string, string],
    finderPatternInnerColor: [string, string, string],
    alignmentPatternOutlineColor: string, // Maybe
    alignmentPatternInnerBackgroundColor: string, // Maybe
    alignmentPatternInnerColor: string, // Maybe
    gridStrokeColor: string,

    // Shapes
    moduleShape: QRElementShape,
    finderPatternOutlineShapes: [QRElementShape, QRElementShape, QRElementShape],
    finderPatternInnerBackgroundShapes: [QRElementShape, QRElementShape, QRElementShape],
    finderPatternInnerShapes: [QRElementShape, QRElementShape, QRElementShape],
    alignmentPatternOutlineShapes: QRElementShape, // Maybe
    alignmentPatternInnerBackgroundShapes: QRElementShape, // Maybe
    alignmentPatternInnerShapes: QRElementShape, // Maybe

    // General
    roundness: number, // 0-1 for rounded shapes
    gridStrokeWidth: number, // 0-1 for percent
}

export type QRConfigs = {
    qrConfig: QRSpecs,
    imageConfig: ImageSpecs
}

export interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

// Data Segmentation Interfaces

// Stores plain text
export interface PlainTextDataSegment {
    mode: DataEncodingMode;
    data: string;
}

// Intermediary interface for encoded data (contains most of the data)
export interface EncodedSegmentDraft {
    mode: DataEncodingMode;
    charCount: number;
    characterSet: DataEncodingCharacterSet | null; // ECI character set name if applicable
    useECIInSegment: boolean; // Whether to use ECI for this segment (This represents ECI mode state in the overal QR Code
    encodedData: Array<string>;
    unencodedData: string;
}

// Finalized encoded segment with character count indicator length included
export interface FinalizedEncodedSegment {
    mode: DataEncodingMode; // The QR encoding mode used
    characterSet: DataEncodingCharacterSet | null; // ECI character set name if applicable
    useECIInSegment: boolean; // Whether to use ECI for this segment (This represents ECI mode state in the overal QR Code)
    charCount: number;
    charCountIndicatorLength: number; // Length of the char count length indicator (in bits) for determining version
    encodedData: Array<string>;
    unencodedData: string;
}

// TODO Add types for datesets to get rid of TS errors