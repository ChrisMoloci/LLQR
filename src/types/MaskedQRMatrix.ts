import { MaskPattern } from "./constantTypes";

export type MaskedQRMatrix = {
    matrix: Array<Array<number>>,
    maskPattern: MaskPattern,
    penaltyScore?: number,
}

export default MaskedQRMatrix;