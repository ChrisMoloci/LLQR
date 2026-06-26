import { QRMatrixCanvas } from "../../data_structures/types/QRMatrixCanvas";
import { QRVersion } from "../../api/exports/types";
import { getBitLength } from "../../helpers/getBitLength";

function addVersionInformation(qrMatrixCanvas: QRMatrixCanvas, version: QRVersion, size: number): QRMatrixCanvas {
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

export default addVersionInformation;