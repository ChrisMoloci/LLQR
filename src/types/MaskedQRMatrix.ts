import { MaskPattern } from "./constantTypes/MaskPattern";

type MaskedQRMatrix = {
    matrix: Array<Array<number>>,
    maskPattern: MaskPattern,
    penaltyScore?: number,
}

export default MaskedQRMatrix;