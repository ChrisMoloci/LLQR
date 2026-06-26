export function normalizeDataStream(encodedData: Array<string>, dataCodewordBufferSize: number): Array<string> {
    // Normalize data stream into a stringto join different size codewords
    let encodedDataString: string = encodedData.join('');
    console.log("Encoded Data String:", encodedDataString);

    // Calculate the remaining codeword bits available
    let remainingBufferSize: number = dataCodewordBufferSize - encodedDataString.length;
    console.log("Remaining Buffer Size (in bits):", remainingBufferSize);

    // Check for buffer overflow
    if (remainingBufferSize < 0) throw new Error("Encoded data exceeds capacity for the specified QR version and ECC level.");

    // Add terminator bits (max 4 or buffer size if we have less than 4 bits left in the buffer)
    const terminatorSize = Math.min(4, remainingBufferSize); // If remaing buffer is greater than 4 bits, 4
    encodedDataString += '0'.repeat(terminatorSize); // Add terminator bits
    remainingBufferSize -= terminatorSize; // Update remaining buffer size

    // Align data stream to next byte boundary if not already aligned
    const boundaryDiff = encodedDataString.length % 8;
    console.log("Boundary Difference before Alignment:", boundaryDiff);
    if (boundaryDiff !== 0) {
        const bitsToNextByte = Math.min(8 - boundaryDiff, remainingBufferSize); // Calculate bits to next byte or buffer size
        encodedDataString += '0'.repeat(bitsToNextByte); // Add padding bits to align to next byte
        remainingBufferSize -= bitsToNextByte; // Update remaining buffer size
    }

    console.log("Data Stream after Terminator and Byte Alignment:", encodedDataString);
    console.log("Boundary Difference after Alignment:", encodedDataString.length % 8);
    console.log("Datastream length after alignment (in bits):", encodedDataString.length);

    // Convert data stream into an array of 8-bit codewords
    const normalizedDataArray: Array<string> = [];
    for (let i = 0; i < encodedDataString.length; i += 8) {
        normalizedDataArray.push(encodedDataString.slice(i, i + 8));
    }

    // Add padding bytes (0xEC, 0x11) until we reach the data codeword capacity
    if (remainingBufferSize > 0) {
        const paddingBytes: Array<string> = ['11101100', '00010001']; // 0xEC and 0x11 in binary
        let isFirstPaddingByte: boolean = true; // Toggle between the two padding bytes
        const dataCodewordBufferSizeInBytes = dataCodewordBufferSize / 8; // Convert buffer size to bytes to work with the array
        for (let i = normalizedDataArray.length; i < dataCodewordBufferSizeInBytes; i++) {
            // Loop until we fill the data codeword buffer
            normalizedDataArray.push(isFirstPaddingByte ? paddingBytes[0]! : paddingBytes[1]!); // Add padding byte
            remainingBufferSize -= 8; // Update remaining buffer size
            isFirstPaddingByte = !isFirstPaddingByte; // Toggle padding byte
        }
    }

    console.log("Final Normalized Data Array with Padding:", normalizedDataArray);
    console.log("Size of Normalized Data Array (in bits):", normalizedDataArray.length * 8);

    return normalizedDataArray;
}

export default normalizeDataStream;