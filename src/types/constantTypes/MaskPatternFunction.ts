import { MASK_PATTERN_FUNCTION } from "../../constants/MASK_PATTERN_FUNCTION";
import {MASK_PATTERN_CODE} from "../../constants";

export type MaskPatternFunction = typeof MASK_PATTERN_FUNCTION[keyof typeof MASK_PATTERN_FUNCTION];
export type MaskPatternFunctionKey = keyof typeof MASK_PATTERN_CODE;