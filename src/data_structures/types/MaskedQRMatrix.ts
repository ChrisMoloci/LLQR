import { MaskPatternCode } from "../types/QRSpecTypes/MaskPatternCode";

export type MaskedQRMatrix = {
    matrix: Array<Array<number>>,
    maskPattern: MaskPatternCode,
    penaltyScore?: number,
}