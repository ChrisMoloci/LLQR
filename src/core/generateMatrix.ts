import { MASK_PATTERN_CODES, MaskPatternCode } from "../enums";
import { alignmentPatternLocations } from "../datasets/alignmentPatternLocations";
import { QRMatrixCanvas } from "../types";
import determinePenaltyScore from "./determinePenaltyScore";
import maskQR from "./maskingFunctions"; 
// import { mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7 } from "./maskingFunctions";
import { getBitLength } from "./utils";
import { getCurrentConfigs } from "./defineConfig";

export interface MaskedQRMatrix {
    matrix: Array<Array<number>>,
    maskPattern: MaskPatternCode,
    penaltyScore?: number,
}

function generateMatrix(dataStream: Array<string>, version: number, eccLevel: string): Array<Array<number>> {
    const qrSpecs = getCurrentConfigs().qrConfig;
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
    const optimalMatrix: Array<Array<number>> = determineOptimalMaskPattern(finalizedMatrices);
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
                    continue;
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
    // version = 7;

    // -- 1. Compute the version information (With ECC) - With (18,6) Golay Code

    // Generator polynomial as an integer as a binary literal
    const generatorPolynomial: number = 0b1111100100101;

    // The final ECC value for our version
    let eccVersion: number = version << 12; // Initialize by shifting version 12 bits to the left

    let loopDepth = 0; // Safety variable to prevent infinite loops

    // Keep XORing until the bit length is less than or equal to 12
    while (getBitLength(eccVersion) > 12) {
        const shiftAmount = getBitLength(eccVersion) - getBitLength(generatorPolynomial);
        // Pad the generator polynomial (on the end) to be the same length as the padded version number binary representation
        const paddedGeneratorPolynomial = generatorPolynomial << shiftAmount;
        
        // Perform (18, 6) Golay Code division using XOR to get ECC bits
        eccVersion = eccVersion ^ paddedGeneratorPolynomial;
        console.log(`EccVersion after XOR: ${eccVersion.toString(2)}, Padded generator polynomial: ${paddedGeneratorPolynomial.toString(2)}`);

        if (loopDepth++ > 40) {
            throw new Error("Infinite loop detected in version information ECC generation.");
        } // Safety break to prevent infinite loops
    }

    // Add original 6-bit version number to the beginning of the ECC stream and convert to a reversed number array (start from LSB)
    const completeVersionInformationStream: number[] = (
        version.toString(2).padStart(6, '0') + // Original version number (6 bits)
        eccVersion.toString(2).padStart(12, '0') // ECC bits (12 bits)
    ).split('').map(bit => parseInt(bit)).reverse(); // Convert to array and reverse for easier placement

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
    // Calculate penalty scores for each masked QR matrix
    for (const maskedQRMatrix of maskedQRMatrices) {
        determinePenaltyScore(maskedQRMatrix);
    }

    // Return the most optimally masked matrix
    return maskedQRMatrices.reduce((prev, current) => (prev.penaltyScore! < current.penaltyScore! ? prev : current)).matrix;
}

export default generateMatrix;