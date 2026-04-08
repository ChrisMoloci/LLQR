import { MASK_PATTERN_FUNCTION } from "../../enums/MASK_PATTERN_FUNCTION";

export type MaskPatternFunction = typeof MASK_PATTERN_FUNCTION[keyof typeof MASK_PATTERN_FUNCTION];