import { MaskPatternCode } from "./constantTypes/MaskPatternCode";

export type MaskedQRMatrix = {
    matrix: Array<Array<number>>,
    maskPattern: MaskPatternCode,
    penaltyScore?: number,
}