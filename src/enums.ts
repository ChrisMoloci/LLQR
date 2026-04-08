// import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "./core/helpers/maskingFunctions";

// // ECC Level Codes
// export const ECC_LEVEL_CODES = {
//     "L": "01",
//     "M": "00",
//     "Q": "11",
//     "H": "10"
// } as const;

// export type ECCLevelCode = typeof ECC_LEVEL_CODES[keyof typeof ECC_LEVEL_CODES];
// export type ECCLevelKey = keyof typeof ECC_LEVEL_CODES;

// // Encoding Mode Indicators
// export const DATA_ENCODING_MODES = {
//     NUMERIC: "0001",
//     ALPHANUMERIC: "0010",
//     KANJI: "1000",
//     BYTE: "0100"
// } as const;

// export type DataEncodingMode = typeof DATA_ENCODING_MODES[keyof typeof DATA_ENCODING_MODES];

// export const DATA_ENCODING_CHARACTER_SETS = {
//     // Key = character set
//     // Value = ECI assignment number

//     // Unicode
//     "UTF-8": 26,
//     "UTF-16BE": 25, // !NOT IMPLEMENTED YET
//     "UTF-32BE": 33, // !NOT IMPLEMENTED YET

//     // ISO/IEC 8859 series (Latin and others)
//     "ISO-8859-1": 3, // Latin-1
//     "ISO-8859-2": 4, // !NOT IMPLEMENTED YET
//     "ISO-8859-3": 5, // !NOT IMPLEMENTED YET
//     "ISO-8859-4": 6, // !NOT IMPLEMENTED YET
//     "ISO-8859-5": 7, // !NOT IMPLEMENTED YET
//     "ISO-8859-6": 8, // !NOT IMPLEMENTED YET
//     "ISO-8859-7": 9, // !NOT IMPLEMENTED YET
//     "ISO-8859-8": 10, // !NOT IMPLEMENTED YET
//     "ISO-8859-9": 11, // !NOT IMPLEMENTED YET
//     "ISO-8859-10": 12, // !NOT IMPLEMENTED YET
//     "ISO-8859-11": 13, // !NOT IMPLEMENTED YET
//     "ISO-8859-13": 15, // !NOT IMPLEMENTED YET
//     "ISO-8859-14": 16, // !NOT IMPLEMENTED YET
//     "ISO-8859-15": 17, // !NOT IMPLEMENTED YET
//     "ISO-8859-16": 18, // !NOT IMPLEMENTED YET

//     // East Asian
//     "Shift-JIS": 20, // !NOT IMPLEMENTED YET
//     "EUC-JP": 21, // !NOT IMPLEMENTED YET
//     "GB2312": 22, // !NOT IMPLEMENTED YET
//     "EUC-KR": 30, // !NOT IMPLEMENTED YET
//     "Big5": 28, // !NOT IMPLEMENTED YET
//     "GB18030": 29, // !NOT IMPLEMENTED YET

//     // Legacy Encodings
//     "US-ASCII": 1, // !NOT IMPLEMENTED YET
//     "IBM 437": 2, // !NOT IMPLEMENTED YET
//     "Windows-1250": 34, // !NOT IMPLEMENTED YET
//     "Windows-1251": 35, // !NOT IMPLEMENTED YET
//     "Windows-1252": 36, // !NOT IMPLEMENTED YET
//     "Windows-1256": 38, // !NOT IMPLEMENTED YET

//     // Special
//     "JIS X 0208": 23, // !NOT IMPLEMENTED YET
//     "JIS X 0212": 24, // !NOT IMPLEMENTED YET
// }

// export type DataEncodingCharacterSet = typeof DATA_ENCODING_CHARACTER_SETS[keyof typeof DATA_ENCODING_CHARACTER_SETS];

// // Mask Pattern Codes
// export const MASK_PATTERN_CODES = {
//     0: "000",
//     1: "001",
//     2: "010",
//     3: "011",
//     4: "100",
//     5: "101",
//     6: "110",
//     7: "111",
//     AUTO: null
// } as const;

// export type MaskPatternCode = typeof MASK_PATTERN_CODES[keyof typeof MASK_PATTERN_CODES];

// // Create a mapping of mask pattern codes to their functions
// export const MASK_PATTERN_FUNCTIONS = {
//     [MASK_PATTERN_CODES[0]]: mask0,
//     [MASK_PATTERN_CODES[1]]: mask1,
//     [MASK_PATTERN_CODES[2]]: mask2,
//     [MASK_PATTERN_CODES[3]]: mask3,
//     [MASK_PATTERN_CODES[4]]: mask4,
//     [MASK_PATTERN_CODES[5]]: mask5,
//     [MASK_PATTERN_CODES[6]]: mask6,
//     [MASK_PATTERN_CODES[7]]: mask7
// } as const;

// export type MaskPatternFunction = typeof MASK_PATTERN_FUNCTIONS[keyof typeof MASK_PATTERN_FUNCTIONS];

// export type RGB = `rgb(${number}, ${number}, ${number})`;
// export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
// export type HEX = `#${string}`;
// export type HSL = `hsl(${number}, ${number}%, ${number}%)`;

// export type Color = RGB | RGBA | HEX | HSL;

// export const QR_ELEMENT_SHAPES = {
//     SQUARE: "SQUARE",
//     CIRCLE: "CIRCLE",
//     ROUNDED: "ROUNDED",
// } as const;

// export type QRElementShape = typeof QR_ELEMENT_SHAPES[keyof typeof QR_ELEMENT_SHAPES];