import { MASK_PATTERN_FUNCTION } from "../../constants/MASK_PATTERN_FUNCTION";

export type MaskPatternFunction = typeof MASK_PATTERN_FUNCTION[keyof typeof MASK_PATTERN_FUNCTION];