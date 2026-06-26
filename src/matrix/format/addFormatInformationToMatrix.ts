// import { MaskedQRMatrix } from "../../types/MaskedQRMatrix";
// import { getBitLength } from "../../utils/getBitLength";

import {MaskedQRMatrix} from "../../types";
import {getBitLength} from "../../utils";

export function addFormatInformationToMatrix(maskedQRMatrix: MaskedQRMatrix, eccLevel: string, size: number): MaskedQRMatrix {
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
    const arbitraryBinaryValue: number = 0b101010000010010;

    // Final Spec compliant XOR
    const finalFormatInformationNumber: number = combinedFormatInformationStream ^ arbitraryBinaryValue;

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

export default addFormatInformationToMatrix;