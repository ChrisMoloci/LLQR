import { MaskedQRMatrix } from "../../../data_structures/types/MaskedQRMatrix";
import determinePenaltyScore from "./determinePenaltyScore";

function determineOptimalMaskPattern(maskedQRMatrices: Array<MaskedQRMatrix>): Array<Array<number>> {
    // Calculate penalty scores for each masked QR matrix
    for (const maskedQRMatrix of maskedQRMatrices) {
        determinePenaltyScore(maskedQRMatrix);
    }

    // Return the most optimally masked matrix
    return maskedQRMatrices.reduce((prev, current) => (prev.penaltyScore! < current.penaltyScore! ? prev : current)).matrix;
}

export default determineOptimalMaskPattern