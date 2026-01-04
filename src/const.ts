import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "./core/maskingFunctions";
import { ImageSpecs, QRELEMENTSHAPES, qrSpecs } from "./types";

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

// Used for default QR Specs
export const QR_DEFAULTS = {
    ECC_LEVEL: ECC_LEVEL_CODES.Q,
    VERSION: null,
    FORCE_BYTE_ENCODING: false as const,
    MASK_PATTERN: null,
    PREFERR_ECI: false as const,
    PREFERR_BOM: false as const
} as const;

export type QRDefault = typeof QR_DEFAULTS[keyof typeof QR_DEFAULTS];

// A Preconfigured default QR Spec if the developer doesn't provide one
export const DEFAULT_QR_SPECS: qrSpecs = {
    eccLevel: QR_DEFAULTS.ECC_LEVEL,
    version: QR_DEFAULTS.VERSION,
    forceByteEncoding: QR_DEFAULTS.FORCE_BYTE_ENCODING,
    maskPattern: QR_DEFAULTS.MASK_PATTERN,
    preferrECI: QR_DEFAULTS.PREFERR_ECI,
    preferrBOM: QR_DEFAULTS.PREFERR_BOM
};

// Used for default Image Specs
export const IMAGE_DEFAULTS = {
    BACKGROUND_COLOR: "#FFFFFF",
    MODULE_COLOR: "#000000",
    FINDER_PATTERN_OUTLINE_COLOR: ["#000000", "#AA0000", "#0000FF"],
    FINDER_PATTERN_INNER_BACKGROUND_COLOR: ["#FFFFFF", "#AAAAAA", "#C5C5"],
    FINDER_PATTERN_INNER_COLOR: ["#000000", "#BB55AA", "#3300CC"],
    ALIGNMENT_PATTERN_OUTLINE_COLOR: ["#000000", "#000000", "#000000"],
    ALIGNMENT_PATTERN_INNER_BACKGROUND_COLOR: ["#000000", "#000000", "#000000"],
    ALIGNMENT_PATTERN_INNER_COLOR: ["#000000", "#000000", "#000000"],
    GRID_STROKE_COLOR: "#000000",

    MODULE_SHAPE: QRELEMENTSHAPES.CIRCLE,
    FINDER_PATTERN_OUTLINE_SHAPES: [QRELEMENTSHAPES.CIRCLE, QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.ROUNDED],
    FINDER_PATTERN_INNER_BACKGROUND_SHAPES: [QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.CIRCLE, QRELEMENTSHAPES.SQUARE],
    FINDER_PATTERN_INNER_SHAPES: [QRELEMENTSHAPES.ROUNDED, QRELEMENTSHAPES.ROUNDED, QRELEMENTSHAPES.CIRCLE],
    ALIGNMENT_PATTERN_OUTLINE_SHAPES: [QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.SQUARE],
    ALIGNMENT_PATTERN_INNER_BACKGROUND_SHAPES: [QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.SQUARE],
    ALIGNMENT_PATTERN_INNER_SHAPES: [QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.SQUARE, QRELEMENTSHAPES.SQUARE],

    ROUNDNESS: 1, // 0-1 for rounded shapes
    GRID_STROKE_WIDTH: 0 // 0-1 for percent
} as const;

// A Preconfigured default Image Spec if the developer doesn't provide one
export const DEFAULT_IMAGE_SPECS: ImageSpecs = {
    backgroundColor: IMAGE_DEFAULTS.BACKGROUND_COLOR,
    moduleColor: IMAGE_DEFAULTS.MODULE_COLOR,
    finderPatternOutlineColor: [...IMAGE_DEFAULTS.FINDER_PATTERN_OUTLINE_COLOR],
    finderPatternInnerBackgroundColor: [...IMAGE_DEFAULTS.FINDER_PATTERN_INNER_BACKGROUND_COLOR],
    finderPatternInnerColor: [...IMAGE_DEFAULTS.FINDER_PATTERN_INNER_COLOR],
    alignmentPatternOutlineColor: [...IMAGE_DEFAULTS.ALIGNMENT_PATTERN_OUTLINE_COLOR],
    alignmentPatternInnerBackgroundColor: [...IMAGE_DEFAULTS.ALIGNMENT_PATTERN_INNER_BACKGROUND_COLOR],
    alignmentPatternInnerColor: [...IMAGE_DEFAULTS.ALIGNMENT_PATTERN_INNER_COLOR],
    gridStrokeColor: IMAGE_DEFAULTS.GRID_STROKE_COLOR,

    moduleShape: IMAGE_DEFAULTS.MODULE_SHAPE,
    finderPatternOutlineShapes: [...IMAGE_DEFAULTS.FINDER_PATTERN_OUTLINE_SHAPES],
    finderPatternInnerBackgroundShapes: [...IMAGE_DEFAULTS.FINDER_PATTERN_INNER_BACKGROUND_SHAPES],
    finderPatternInnerShapes: [...IMAGE_DEFAULTS.FINDER_PATTERN_INNER_SHAPES],
    alignmentPatternOutlineShapes: [...IMAGE_DEFAULTS.ALIGNMENT_PATTERN_OUTLINE_SHAPES],
    alignmentPatternInnerBackgroundShapes: [...IMAGE_DEFAULTS.ALIGNMENT_PATTERN_INNER_BACKGROUND_SHAPES],
    alignmentPatternInnerShapes: [...IMAGE_DEFAULTS.ALIGNMENT_PATTERN_INNER_SHAPES],

    roundness: IMAGE_DEFAULTS.ROUNDNESS,
    gridStrokeWidth: IMAGE_DEFAULTS.GRID_STROKE_WIDTH
}

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