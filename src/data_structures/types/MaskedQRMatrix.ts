import { MaskPatternCode } from "../enums/MASK_PATTERN_CODE";

export type MaskedQRMatrix = {
    matrix: Array<Array<number>>,
    maskPattern: MaskPatternCode,
    penaltyScore?: number,
}