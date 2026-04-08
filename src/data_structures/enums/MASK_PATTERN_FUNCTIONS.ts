import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "../../core/helpers/maskingFunctions";
import { MASK_PATTERN_CODES } from "./MASK_PATTERN_CODES";

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