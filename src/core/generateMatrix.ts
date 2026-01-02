import { MASK_PATTERN_CODES, MaskPatternCode } from "../const";
import { alignmentPatternLocations } from "../datasets/alignmentPatternLocations";
import { QRMatrixCanvas } from "../types";
import maskQR from "./maskingFunctions"; 
import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "./maskingFunctions";
import { getBitLength } from "./utils";

export interface MaskedQRMatrix {
    matrix: Array<Array<number>>,
    maskPattern: MaskPatternCode,
    penaltyScore?: number,
}

function generateMatrix(dataStream: Array<string>, version: number, eccLevel: string, maskPattern: MaskPatternCode | null = null): Array<Array<number>> {
    // dataStream = [];
    // const matrix: Array<Array<number>> = []; // Will store the finalized matrix
    // const reservedAreas: Array<Array<boolean>> = []; // Stores the areas that data should not be placed into

    const size = 21 + (version - 1) * 4; // Calculate size of the matrix based on version

    // -- 1. Initialize the matrix and reserved areas --
    let qrMatrixCanvas: QRMatrixCanvas = initializeMatrices(size);
    console.log("Initialized QR Matrix Canvas:", qrMatrixCanvas);

    // -- 2. Add Finder Patterns
    qrMatrixCanvas = addFinderPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Finder Patterns:", qrMatrixCanvas);

    // -- 3. Add Timing Patterns --
    qrMatrixCanvas = addTimingPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Timing Patterns:", qrMatrixCanvas);

    // -- 4. Add Alignment Patterns --
    qrMatrixCanvas = addAlignmentPatterns(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Alignment Patterns:", qrMatrixCanvas);
    // TODO: FIX MISSING ALLIGNMENT PATTERNS

    // -- 5. Add Dark Module --
    qrMatrixCanvas = addDarkModule(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Dark Module:", qrMatrixCanvas);

    // -- 6. Reserve format information --
    // Note: Only reserving, not adding since we haven't applied any masking
    qrMatrixCanvas = reserveFormatInformation(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after reserving Format Information:", qrMatrixCanvas);

    // -- 7. Add version information if version >= 7 --
    if (version >= 7) qrMatrixCanvas = addVersionInformation(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Version Information:", qrMatrixCanvas);

    // -- 8. Place data bits into the matrix, skipping reserved areas --
    qrMatrixCanvas = addDataToMatrix(qrMatrixCanvas, dataStream, size);
    console.log("QR Matrix Canvas after adding Data Bits:", qrMatrixCanvas);

    // -- 9. Mask the matrix with every possible mask pattern if maskPattern is null --
    const maskedMatrices: Array<MaskedQRMatrix> = maskAllMatrices(qrMatrixCanvas, size);
    console.log("All Masked QR Matrices:", maskedMatrices);

    // -- 10. Add format information to all the masked matrices --
    const finalizedMatrices: Array<MaskedQRMatrix> = 
        maskedMatrices.map((maskedMatrix) => 
            addFormatInformationToMatrix(maskedMatrix, eccLevel, size));
    console.log("Finalized QR Matrices with Format Information:", finalizedMatrices);

    // -- 11. Determine optimal mask pattern and use that as the final matrix --
    const optimalMatrix: Array<Array<number>> = determineOptimalMaskPattern(maskedMatrices);
    console.log("Optimal QR Matrix selected:", optimalMatrix);

    // -- 12. Return the finalized matrix --
    return optimalMatrix;
}

function initializeMatrices(size: number): QRMatrixCanvas {
    const qrMatrixCanvas: QRMatrixCanvas = {
        matrix: Array.from({length: size}, () => Array.from({length: size}, () => 0)),
        reservedMatrix: Array.from({length: size}, () => Array.from({length: size}, () => false))
    };
    return qrMatrixCanvas;
}

function addFinderPatterns(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    const finderPatternTemplate: Array<Array<number>> = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];

    const finderPatternPositions: Array<{x: number, y: number}> = [
        { x: 0, y: 0 }, // Top left
        { x: size - 7, y: 0 }, // Top right
        { x: 0, y: size - 7 }, // Bottom left
    ]; // Positions for the three finder patterns

    for (const pattern of finderPatternPositions) {
        addFinderPatternToMatrix(pattern.x, pattern.y);
        reserveFinderPattern(pattern.x > 0 ? pattern.x - 1 : pattern.x, pattern.y > 0 ? pattern.y - 1 : pattern.y);
    }

    // Helper function to add a finder pattern from a specific position to the matrix
    function addFinderPatternToMatrix(x: number, y: number) {
        for (let row = 0; row < 7; row++) {
            const matrixY = y + row;
            if (matrixY < 0 || matrixY >= size) throw new Error("Finder pattern Y position out of bounds.");
            for (let col = 0; col < 7; col++) {
                const matrixX = x + col;
                if (matrixX < 0 || matrixX >= size) throw new Error("Finder pattern X position out of bounds.");
                qrMatrixCanvas.matrix[matrixY]![matrixX]! = finderPatternTemplate[row]![col]!;
            }
        }
    }

    // Helper function to reserve the area of a finder pattern in the reserved matrix
    function reserveFinderPattern(x: number, y: number) {
        // Make sure we also reserve the separator area (8x8) around the finder pattern
        for (let row = 0; row < 8; row++) {
            const matrixY = y + row;
            if (matrixY < 0 || matrixY >= size) throw new Error("Finder pattern Y position out of bounds.");
            for (let col = 0; col < 8; col++) {
                const matrixX = x + col;
                if (matrixX < 0 || matrixX >= size) throw new Error("Finder pattern X position out of bounds.");
                qrMatrixCanvas.reservedMatrix[matrixY]![matrixX]! = true;
            }
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addTimingPatterns(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    for (let i = 8; i < size - 8; i++) {
        // Add the modules to the matrix
        qrMatrixCanvas.matrix[6]![i]! = i % 2 === 0 ? 1 : 0; // Horizontal timing pattern
        qrMatrixCanvas.matrix[i]![6]! = i % 2 === 0 ? 1 : 0; // Vertical timing pattern

        // Reserve the modules in the reserved matrix
        qrMatrixCanvas.reservedMatrix[6]![i]! = true; // Horizontal timing pattern
        qrMatrixCanvas.reservedMatrix[i]![6]! = true; // Vertical timing pattern
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addAlignmentPatterns(qrMatrixCanvas: QRMatrixCanvas, version: number, size: number): QRMatrixCanvas {
    const alignmentPatternTemplate: Array<Array<number>> = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];

    const alignmentPatterns: number[] | undefined = alignmentPatternLocations[version];

    // If no alignment patterns are needed, return the matrix as is
    if (!alignmentPatterns || alignmentPatterns.length === 0) return qrMatrixCanvas;

    console.log("Alignment pattern locations for version", version, ":", alignmentPatterns);

    for (let i = 0; i < alignmentPatterns!.length; i++) {
        for (let j = 0; j < alignmentPatterns!.length; j++) {
            const centerX: number = alignmentPatterns![i]!;
            const centerY: number = alignmentPatterns![j]!;

            /**
             * Skip if this would overlap with finder patterns
             * Finder patterns are at (0,0), (0, size-7), and (size-7, 0)
             */
            if ((centerX < 9 && centerY < 9) ||                    // Top-left finder
                (centerX < 9 && centerY > size - 10) ||            // Bottom-left finder  
                (centerX > size - 10 && centerY < 9)) {            // Top-right finder
                    // TODO: Verify necessity of this check
                    console.log(`Skipping alignment pattern at (${centerX}, ${centerY}) due to overlap with finder pattern.`);
                    break;
            }

            // Place the 5x5 alignment pattern centered at (centerX, centerY)
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    const matrixX = centerX - 2 + x; // Offset by 2 to center the pattern
                    const matrixY = centerY - 2 + y; // Offset by 2 to center the pattern
                    
                    // Ensure we're within matrix bounds
                    if (matrixX >= 0 && matrixX < size && matrixY >= 0 && matrixY < size) {
                        // Place the alignment pattern modules in the matrix
                        qrMatrixCanvas.matrix[matrixY]![matrixX]! = alignmentPatternTemplate[y]![x]!;
                        // Reserve the alignment pattern in the reserved matrix
                        qrMatrixCanvas.reservedMatrix[matrixY]![matrixX]! = true;
                    }
                }
            }
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addDarkModule(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    qrMatrixCanvas.matrix[size - 8]![8]! = 1; // Dark module in the center
    qrMatrixCanvas.reservedMatrix[size - 8]![8]! = true; // Reserve dark module

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function reserveFormatInformation(qrMatrixCanvas: QRMatrixCanvas, size: number): QRMatrixCanvas {
    const formatPositions: Array<[number, number]> = [
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
        [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
        [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8],
        [size - 6, 8], [size - 7, 8], [8, size - 8], [8, size - 7], [8, size - 6],
        [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
    ];

    for (const [row, col] of formatPositions) {
        qrMatrixCanvas.reservedMatrix[row]![col]! = true;
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addVersionInformation(qrMatrixCanvas: QRMatrixCanvas, version: number, size: number): QRMatrixCanvas {
    // -- 1. Compute the version information (With ECC) - With (18,6) Golay Code

    // Get the version number in binary representation (6 bits long)
    const binaryVersion = version.toString(2).padStart(6, '0');

    // Shift left by 12 to make space for ECC bits (the leading 0s are technically already there since JS used 32-bit integers)
    const paddedVersionNumber = version << 12;
    // Get the binary representation of the padded(bit-shifted) version number (used for padding the generator polynomial)
    const paddedVersionNumberBinary = paddedVersionNumber.toString(2);

    // Generator polynomial as an integer as a binary literal
    const generatorPolynomial: number = 0b1111100100101;
    // Store the binary literal of the generator polynomial in an array (used for padding the generator polynomial)
    const generatorPolynomialBinary: string = generatorPolynomial.toString(2);

    // Pad the generator polynomial (on the end) to be the same length as the padded version number binary representation
    const paddedGeneratorPolynomial = generatorPolynomial << (paddedVersionNumberBinary.length - generatorPolynomialBinary.length);

    // Perform (18, 6) Golay Code division using XOR to get ECC bits
    const eccVersion: number = paddedVersionNumber ^ paddedGeneratorPolynomial;

    // Convert to a binary string and pad to 12 bits long
    const eccVersionInformationStream = eccVersion.toString(2).padStart(12, '0'); // Get ECC bits as 12-bit binary string

    console.log("ECC Version Information Stream (12 bits):", eccVersionInformationStream);

    // Add original 6-bit version number to the beginning of the ECC stream and convert to a reversed number array (start from LSB)
    const completeVersionInformationStream: number[] = (binaryVersion + eccVersionInformationStream).split('').map(bit => parseInt(bit)).reverse();
    console.log("Complete Version Information Stream (18 bits):", completeVersionInformationStream.join(''));

    // TODO: Update how bit length is calculated to use getBitLength from utils.ts
    // TODO: Consider if using a lookup table is more efficient

    // -- 2. Place version information into the matrix
    let bitIndex = 0; // Stores the current bit index in the version information stream
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            // Bottom-left (above finder pattern)
            qrMatrixCanvas.matrix[(size - 11) + j]![i]! = 
                completeVersionInformationStream[bitIndex]!; // Place the bit
            qrMatrixCanvas.reservedMatrix[(size - 11) + j]![i]! = true; // Reserve the area

            // Top-right (next to finder pattern)
            qrMatrixCanvas.matrix[i]![(size - 11) + j]! = 
                completeVersionInformationStream[bitIndex]!;
            qrMatrixCanvas.reservedMatrix[i]![(size - 11) + j]! = true; // Reserve the area
            
            bitIndex++; // Increment bit index
        }
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function addDataToMatrix(qrMatrixCanvas: QRMatrixCanvas, dataStream: Array<string>, size: number): QRMatrixCanvas {
    let bitIndex = 0; // Current bit index in the data stream
    let directionUp = true; // Direction of traversal (upwards or downwards)
    // let done = false; // Flag to indicate if all data bits have been placed

    const flatDataStream: string = dataStream.join('');

    for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--; // Skip the vertical timing pattern column
        console.log("Working from column:", col, " to ", col - 1);
        // Move left two columns at a time
        for (let row = directionUp ? size - 1 : 0; 
            directionUp ? row >= 0 : row < size; 
            directionUp ? row-- : row++) {
                // console.log("Working on row:", row);
                for (let i = 0; i < 2; i++) {
                    // Alternate between the two columns
                    if (!qrMatrixCanvas.reservedMatrix[row]![col - i]!) {
                        // If the position is not reserved, place the data bit
                        // console.log(`Placing data bit at (${row}, ${col - i})`);
                        if (bitIndex < flatDataStream.length) {
                            qrMatrixCanvas.matrix[row]![col - i]! = parseInt(flatDataStream[bitIndex]!);
                            bitIndex++;
                        } else {
                            // If no more data bits, pad with 0s until complete
                            qrMatrixCanvas.matrix[row]![col - i]! = 0; // Pad with 0s if no more data
                            // done = true; // All data bits have been placed
                            // break;
                        }
                    }
                }
                // if (done) break; // Exit if done
        }
        directionUp = !directionUp; // Change direction after each column pair
    }

    // Return the updated QR matrix canvas
    return qrMatrixCanvas;
}

function maskAllMatrices(qrMatrixCanvas: QRMatrixCanvas, size: number): Array<MaskedQRMatrix> {
    const maskedMatrices: Array<MaskedQRMatrix> = [];

    // Important to clone the qrMatrixCanvas for each mask passing the ref
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[0], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[1], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[2], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[3], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[4], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[5], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[6], structuredClone(qrMatrixCanvas), size));
    maskedMatrices.push(maskQR(MASK_PATTERN_CODES[7], structuredClone(qrMatrixCanvas), size));

    return maskedMatrices;
}

function addFormatInformationToMatrix(maskedQRMatrix: MaskedQRMatrix, eccLevel: string, size: number): MaskedQRMatrix {
    // Debug values (REMOVE IN PRODUCTION)
    // eccLevel = "01";
    // maskPattern = "100";
    // Expected value based on debug values: 110011000101111

    // -- 1. Generate the 15-bit format information string with ECC
    const formatInformationString: string = eccLevel + maskedQRMatrix.maskPattern;
    let formatInformationNumber: number = parseInt(formatInformationString, 2) << 10;

    const generatorPolynomial: number = 0b10100110111;

    let loopDepth = 0; // Safety variable to prevent infinite loops
    while (getBitLength(formatInformationNumber) > 10) {
        // Calculate how much to shift the generator polynomial (padding zeros on the LSB side)
        const shiftAmount = getBitLength(formatInformationNumber) - getBitLength(generatorPolynomial);
    
        // Shift the generator polynomial (pad zeros to the LSB side)
        const paddedGeneratorPolynomial = generatorPolynomial << shiftAmount;
        
        // XOR the format information number with the padded generator polynomial
        formatInformationNumber ^= paddedGeneratorPolynomial;

        if (loopDepth++ > 20) {
            throw new Error("Infinite loop detected in format information generation.");
        } // Safety break to prevent infinite loops
    }

    // Combine the original format information string with the ECC bits and convert to a number
    const combinedFormatInformationStream: number = parseInt(formatInformationString + formatInformationNumber.toString(2).padStart(10, '0'), 2);

    // Spec compliant binary value to XOR the ECCed format information stream with
    const arbritraryBinaryValue: number = 0b101010000010010;

    // Final Spec compliant XOR
    const finalFormatInformationNumber: number = combinedFormatInformationStream ^ arbritraryBinaryValue;

    // Convert to array to an array that is ready to apply to the matrix
    const completeFormatInformationStream: number[] = finalFormatInformationNumber.toString(2).padStart(15, '0').split('').map(bit => parseInt(bit));

    console.log("Complete Format Information Stream (15 bits):", completeFormatInformationStream.join(''));

    // -- 2. Place format information into the matrix
    
    // Stores the locations of the format information bits in the matrix
    const formatPositions: Array<[number, number]> = [
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
        [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
        // Mirrored format positions
        [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8],
        [size - 6, 8], [size - 7, 8], [8, size - 8], [8, size - 7], [8, size - 6],
        [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
    ];

    // Add the format information bits to the matrix
    for (let i = 0; i < 15; i++) {
        const [row, col] = formatPositions[i]!; // Get the position for the current bit
        maskedQRMatrix.matrix[row]![col]! = completeFormatInformationStream[i]!; // Place the bit in the matrix

        const [mirroredRow, mirroredCol] = formatPositions[i + 15]!; // Get the mirrored position
        maskedQRMatrix.matrix[mirroredRow]![mirroredCol]! = completeFormatInformationStream[i]!; // Place the bit in the mirrored position
    }

    // Return the updated matrix
    return maskedQRMatrix;
}

function determineOptimalMaskPattern(maskedQRMatrices: Array<MaskedQRMatrix>): Array<Array<number>> {
    for (const maskedQRMatrix of maskedQRMatrices) {
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
    }
    
    // Return the most optimally masked matrix
    return maskedQRMatrices.reduce((prev, current) => (prev.penaltyScore! < current.penaltyScore! ? prev : current)).matrix;
}

function evaluateConsecutiveModules(maskedQRMatrix: MaskedQRMatrix): number {
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

function evaluate2x2Blocks(maskedQRMatrix: MaskedQRMatrix): number {
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

function evaluateFinderPatternSimilarities(maskedQRMatrix: MaskedQRMatrix): number {
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

function evaluateDarkModuleRatio(maskedQRMatrix: MaskedQRMatrix): number {
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

export default generateMatrix;