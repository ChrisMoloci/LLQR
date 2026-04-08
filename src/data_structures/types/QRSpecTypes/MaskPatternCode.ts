import { MASK_PATTERN_CODE } from "../../enums/MASK_PATTERN_CODE";

export type MaskPatternCode = typeof MASK_PATTERN_CODE[keyof typeof MASK_PATTERN_CODE];