import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "../../core/helpers/maskingFunctions";
import { MASK_PATTERN_CODE } from "./MASK_PATTERN_CODE";

// Create a mapping of mask pattern codes to their functions
export const MASK_PATTERN_FUNCTION = {
    [MASK_PATTERN_CODE[0]]: mask0,
    [MASK_PATTERN_CODE[1]]: mask1,
    [MASK_PATTERN_CODE[2]]: mask2,
    [MASK_PATTERN_CODE[3]]: mask3,
    [MASK_PATTERN_CODE[4]]: mask4,
    [MASK_PATTERN_CODE[5]]: mask5,
    [MASK_PATTERN_CODE[6]]: mask6,
    [MASK_PATTERN_CODE[7]]: mask7
} as const;