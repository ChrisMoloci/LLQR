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