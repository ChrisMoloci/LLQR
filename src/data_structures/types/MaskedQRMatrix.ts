import { MaskPatternCode } from "../enums/MASK_PATTERN_CODES";

export type MaskedQRMatrix = {
    matrix: Array<Array<number>>,
    maskPattern: MaskPatternCode,
    penaltyScore?: number,
}