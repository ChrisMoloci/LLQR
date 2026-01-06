import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "./core/maskingFunctions";

// ECC Level Codes
export const ECC_LEVEL_CODES = {
    "L": "01",
    "M": "00",
    "Q": "11",
    "H": "10"
} as const;

export type ECCLevelCode = typeof ECC_LEVEL_CODES[keyof typeof ECC_LEVEL_CODES];
export type ECCLevelKey = keyof typeof ECC_LEVEL_CODES;

// Encoding Mode Indicators
export const DATA_ENCODING_MODES = {
    NUMERIC: "0001",
    ALPHANUMERIC: "0010",
    BYTE: "0100",
    KANJI: "1000" // Not yet implemented
} as const;

export type DataEncodingMode = typeof DATA_ENCODING_MODES[keyof typeof DATA_ENCODING_MODES];

// Mask Pattern Codes
export const MASK_PATTERN_CODES = {
    0: "000",
    1: "001",
    2: "010",
    3: "011",
    4: "100",
    5: "101",
    6: "110",
    7: "111",
    AUTO: null
} as const;

export type MaskPatternCode = typeof MASK_PATTERN_CODES[keyof typeof MASK_PATTERN_CODES];

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