import { qrSpecs } from "./types";

// Encoding Mode Indicators
export const DATA_ENCODING_MODES = {
    NUMERIC: "0001",
    ALPHANUMERIC: "0010",
    BYTE: "0100",
    KANJI: "1000" // Not yet implemented
} as const;

export type DataEncodingMode = typeof DATA_ENCODING_MODES[keyof typeof DATA_ENCODING_MODES];

// ECC Level Codes
export const ECC_LEVEL_CODES = {
    "L": "01",
    "M": "00",
    "Q": "11",
    "H": "10"
} as const;

export type ECCLevelCode = typeof ECC_LEVEL_CODES[keyof typeof ECC_LEVEL_CODES];
export type ECCLevelKey = keyof typeof ECC_LEVEL_CODES;

// Mask Pattern Codes
export const MASK_PATTERN_CODES = {
    0: "000",
    1: "001",
    2: "010",
    3: "011",
    4: "100",
    5: "101",
    6: "110",
    7: "111"
} as const;

export type MaskPatternCode = typeof MASK_PATTERN_CODES[keyof typeof MASK_PATTERN_CODES];

// Used for default specs QR Specs
export const QR_DEFAULTS = {
    ECC_LEVEL: ECC_LEVEL_CODES.M,
    VERSION: null,
    FORCE_BYTE_ENCODING: false as const,
    MASK_PATTERN: null,
    PREFERR_ECI: false as const,
    PREFERR_BOM: false as const
} as const;

export type QRDefault = typeof QR_DEFAULTS[keyof typeof QR_DEFAULTS];

// A Preconfigured default QR Spec it the developer doesn't provide one
export const DEFAULT_QR_SPECS: qrSpecs = {
    eccLevel: QR_DEFAULTS.ECC_LEVEL,
    version: QR_DEFAULTS.VERSION,
    forceByteEncoding: QR_DEFAULTS.FORCE_BYTE_ENCODING,
    maskPattern: QR_DEFAULTS.MASK_PATTERN,
    preferrECI: QR_DEFAULTS.PREFERR_ECI,
    preferrBOM: QR_DEFAULTS.PREFERR_BOM
};