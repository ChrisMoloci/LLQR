import { MASK_PATTERN_CODE } from "../../constants/MASK_PATTERN_CODE";

export type MaskPattern = typeof MASK_PATTERN_CODE[keyof typeof MASK_PATTERN_CODE];
export type MaskPatternKey = keyof typeof MASK_PATTERN_CODE;