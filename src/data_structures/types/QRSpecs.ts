
import { ECCLevelCode } from "../enums/ECC_LEVEL_CODES";
import { MaskPatternCode } from "../enums/MASK_PATTERN_CODES";

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
    useECISwitching: ECISwitchingModes,
    // preferECI: boolean,
    // preferBOM: boolean
}

export type PublicQRSpecs = Partial<QRSpecs>; // For user input, all fields are optional since we have defaults