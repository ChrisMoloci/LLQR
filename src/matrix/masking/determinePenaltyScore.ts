import { MaskedQRMatrix } from "../../types/MaskedQRMatrix";

export default function determinePenaltyScore(maskedQRMatrix: MaskedQRMatrix): Array<Array<number>> {
    let penaltyScore = 0;

    // -- 1. Evaluate consecutive modules in Rows or Columns of 5
    penaltyScore += evaluateConsecutiveModules(maskedQRMatrix);

    // -- 2. Evaluate 2x2 Blocks
    penaltyScore += evaluate2x2Blocks(maskedQRMatrix);

    // -- 3. Evaluate Finder Pattern Similarities
    penaltyScore += evaluateFinderPatternSimilarities(maskedQRMatrix);

    // -- 4. Evaluate if more modules are dark than light
    penaltyScore += evaluateDarkModuleRatio(maskedQRMatrix);

    // Store the penalty score in the masked matrix for reference
    maskedQRMatrix.penaltyScore = penaltyScore;
    console.log(`Mask Pattern ${maskedQRMatrix.maskPattern} has penalty score:`, penaltyScore);
    
    // Return the most optimally masked matrix
    return maskedQRMatrix.matrix;
}

export function evaluateConsecutiveModules(maskedQRMatrix: MaskedQRMatrix): number {
    // TODO: Should the consecutive row and column counts start at 1 instead of 0?
    let penaltyScore = 0;
    for (let i = 0; i < maskedQRMatrix.matrix.length; i++) {
        let consecutiveRowModules: number = 1;
        let currentRowColor: number = maskedQRMatrix.matrix[i]![0]!; // Initialize with first module

        let consecutiveColModules: number = 1;
        let currentColColor: number = maskedQRMatrix.matrix[0]![i]!; // Initialize with first module
        for (let j = 1; j < maskedQRMatrix.matrix.length; j++) {
            // Horizantally i = row, j = col
            // Vertically i = col, j = row

            // Horizontal check
            if (maskedQRMatrix.matrix[i]![j]! === currentRowColor) {
                consecutiveRowModules++;
            } else {
                if (consecutiveRowModules >= 5) {
                    /**
                     * If we have 5, we add 3, if its higher than 5, we add 1 more 
                     * for each additional module
                     */
                    // console.log("Found", consecutiveRowModules, "consecutive modules in row", i);
                    penaltyScore += (consecutiveRowModules - 5) + 3;
                }
                currentRowColor = maskedQRMatrix.matrix[i]![j]!;
                consecutiveRowModules = 1;
            }

            // Vertical check
            if (maskedQRMatrix.matrix[j]![i]! === currentColColor) {
                consecutiveColModules++;
            } else {
                if (consecutiveColModules >= 5) {
                    /**
                     * If we have 5, we add 3, if its higher than 5, we add 1 more 
                     * for each additional module
                     */
                    // console.log("Found", consecutiveColModules, "consecutive modules in column", i);
                    penaltyScore += (consecutiveColModules - 5) + 3;
                }
                currentColColor = maskedQRMatrix.matrix[j]![i]!;
                consecutiveColModules = 1;
            }
        }
        if (consecutiveRowModules >= 5) {
            // Check again at the end of the row in case the row ends with consecutive modules
            penaltyScore += (consecutiveRowModules - 5) + 3;
        }
        if (consecutiveColModules >= 5) {
            // Check again at the end of the column in case the column ends with consecutive modules
            penaltyScore += (consecutiveColModules - 5) + 3;
        }
    }

    console.log("Penalty score after evaluating consecutive modules:", penaltyScore);

    return penaltyScore;
}

export function evaluate2x2Blocks(maskedQRMatrix: MaskedQRMatrix): number {
    let penaltyScore = 0;
    for (let i = 0; i < maskedQRMatrix.matrix.length - 1; i++) {
        for (let j = 0; j < maskedQRMatrix.matrix.length - 1; j++) {
            // Store the four modules in the 2x2 block
            const moduleA = maskedQRMatrix.matrix[i]![j]!;
            const moduleB = maskedQRMatrix.matrix[i + 1]![j]!;
            const moduleC = maskedQRMatrix.matrix[i]![j + 1]!;
            const moduleD = maskedQRMatrix.matrix[i + 1]![j + 1]!;

            // Check if all four modules are the same color
            if ((moduleA === moduleB) && (moduleA === moduleC) && (moduleA === moduleD)) {
                penaltyScore += 3;
            }
        }
    }

    console.log("Penalty score after evaluating 2x2 blocks:", penaltyScore);

    return penaltyScore;
}

export function evaluateFinderPatternSimilarities(maskedQRMatrix: MaskedQRMatrix): number {
    let penaltyScore = 0;

    // Represent the patterns as binary literals (a.k.a. in js a number) for easier comparison
    const pattern1 = 0b00001011101;
    const pattern2 = 0b10111010000;

    // Check rows and columns for the patterns
    for (let i = 0; i < maskedQRMatrix.matrix.length; i++) {
        for (let j = 0; j <= maskedQRMatrix.matrix.length - 11; j++) {
            // -- 1. Rows --
            const rowSlice = maskedQRMatrix.matrix[i]!.slice(j, j + 11).join('');
            const rowSliceNum = parseInt(rowSlice, 2);

            if (rowSliceNum === pattern2) {
                // console.log("Found pattern in row at (", i, ",", j, ") for pattern 2");
                penaltyScore += 40;
            } else if (rowSliceNum  === pattern1) {
                // console.log("Found pattern in row at (", i, ",", j, ") for pattern 1, value:", (rowSliceNum).toString(2).padStart(11, '0'), " number: ", rowSliceNum);
                penaltyScore += 40;
            }

            // -- 2. Columns --
            const colSlice = maskedQRMatrix.matrix.slice(j, j + 11).map(row => row[i]!).join('');
            const colSliceNum = parseInt(colSlice, 2);
            if (colSliceNum === pattern2) {
                // console.log("Found pattern in col at (", i, ",", j, ") for pattern 2");
                penaltyScore += 40;
            } else if (colSliceNum  === pattern1) {
                // console.log("Found pattern in col at (", i, ",", j, ") for pattern 1, value:", (colSliceNum).toString(2).padStart(11, '0'), " number: ", colSliceNum);
                penaltyScore += 40;
            }
        }
    }

    console.log("Penalty score after evaluating finder pattern similarities:", penaltyScore);

    return penaltyScore;
}

export function evaluateDarkModuleRatio(maskedQRMatrix: MaskedQRMatrix): number {
    let darkModuleCount = 0; // Stores the amount of dark modules in the matrix
    let lightModuleCount = 0; // Stores the amount of light modules in the matrix

    // Count dark and light modules
    for (let i = 0; i < maskedQRMatrix.matrix.length; i++) {
        for (let j = 0; j < maskedQRMatrix.matrix.length; j++) {
            if (maskedQRMatrix.matrix[i]![j]! === 1) {
                darkModuleCount++;
            } else {
                lightModuleCount++;
            }
        }
    }

    // Calculate the percentage of dark modules
    const totalModules = darkModuleCount + lightModuleCount;
    const darkModulePercentage = (darkModuleCount / totalModules) * 100;

    // Determine prev and next multiple of 5
    const prevMultipleOf5 = Math.floor(darkModulePercentage / 5) * 5;
    const nextMultipleOf5 = Math.ceil(darkModulePercentage / 5) * 5;

    // Subtract 50, get absolute value, divide by 5, multiple by 10
    const prevPenalty = Math.abs(prevMultipleOf5 - 50) / 5 * 10;
    const nextPenalty = Math.abs(nextMultipleOf5 - 50) / 5 * 10;

    console.log("Penalty score after evaluating dark module ratio:", Math.min(prevPenalty, nextPenalty));

    return Math.min(prevPenalty, nextPenalty); // Return the lower penalty score
}