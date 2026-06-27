import {MaskedQRMatrix, QRMatrixCanvas} from "../../types";
import {maskQR} from "../.";
import {MASK_PATTERN_CODE} from "../../constants";

export function maskAllMatrices(qrMatrixCanvas: QRMatrixCanvas, size: number): Array<MaskedQRMatrix> {
    const maskedMatrices: Array<MaskedQRMatrix> = [];

    // Important to clone the qrMatrixCanvas for each mask passing the ref
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[0], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[1], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[2], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[3], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[4], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[5], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[6], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODE[7], structuredClone(qrMatrixCanvas), size));

    return maskedMatrices;
}

export default maskAllMatrices;