import { MaskPatternCode } from "../const";
import { alignmentPatternLocations } from "../datasets/alignmentPatternLocations";

interface QRMatrixCanvas {
    matrix: Array<Array<number>>,
    reservedMatrix: Array<Array<boolean>>
} // Stores the QR matrix and reserved areas that data should not be placed into in matrix

function generateMatrix(dataStream: Array<string>, version: number, eccLevel: string, maskPattern: MaskPatternCode | null = null) {
    // const matrix: Array<Array<number>> = []; // Will store the finalized matrix
    // const reservedAreas: Array<Array<boolean>> = []; // Stores the areas that data should not be placed into

    const size = 21 + (version - 1) * 4; // Calculate size of the matrix based on version

    // -- 1. Initialize the matrix and reserved areas
    let qrMatrixCanvas: QRMatrixCanvas = initializeMatrices(size);
    console.log("Initialized QR Matrix Canvas:", qrMatrixCanvas);

    // -- 2. Add Finder Patterns
    qrMatrixCanvas = addFinderPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Finder Patterns:", qrMatrixCanvas);

    // -- 3. Add Timing Patterns
    qrMatrixCanvas = addTimingPatterns(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Timing Patterns:", qrMatrixCanvas);

    // -- 4. Add Alignment Patterns
    qrMatrixCanvas = addAlignmentPatterns(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Alignment Patterns:", qrMatrixCanvas);

    // -- 5. Add Dark Module
    qrMatrixCanvas = addDarkModule(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after adding Dark Module:", qrMatrixCanvas);

    // Reserve format information
    // Note: Only reserving, not adding since we haven't applied any masking
    qrMatrixCanvas = reserveFormatInformation(qrMatrixCanvas, size);
    console.log("QR Matrix Canvas after reserving Format Information:", qrMatrixCanvas);

    // Add version information if version >= 7
    if (version >= 7) qrMatrixCanvas = addVersionInformation(qrMatrixCanvas, version, size);
    console.log("QR Matrix Canvas after adding Version Information:", qrMatrixCanvas);

    // Place data bits into the matrix, skipping reserved areas
    qrMatrixCanvas = addDataToMatrix(qrMatrixCanvas, dataStream, size);
    console.log("QR Matrix Canvas after adding Data Bits:", qrMatrixCanvas);

    // Mask the matrix with every possible mask pattern if maskPattern is null

    // Add format information to all the masked matrices

    // Determine optimal mask pattern and use that as the final matrix

    // Return the finalized matrix
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
    for (let i = 0; i < 8; i++) {
        // Top-left format information area
        qrMatrixCanvas.reservedMatrix[8]![i]! = true; // Top-left horizontal
        qrMatrixCanvas.reservedMatrix[i]![8]! = true; // Top-left vertical
    }
    for (let i = size - 8; i < size; i++) {
        // Top-right format information area
        qrMatrixCanvas.reservedMatrix[8]![i]! = true; // Top-right horizontal
        qrMatrixCanvas.reservedMatrix[i]![8]! = true; // Bottom-left vertical
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

    // TODO: Consider if using a lookup table is more efficient

    // -- 2. Place version information into the matrix
    let bitIndex = 0; // Stores the current bit index in the version information stream
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            // Bottom-left (above finder pattern)
            qrMatrixCanvas.matrix[(size - 11) + j]![i]! = 
                completeVersionInformationStream[bitIndex]; // Place the bit
            qrMatrixCanvas.reservedMatrix[(size - 11) + j]![i]! = true; // Reserve the area

            // Top-right (next to finder pattern)
            qrMatrixCanvas.matrix[i]![(size - 11) + j]! = 
                completeVersionInformationStream[bitIndex];
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

export default generateMatrix;