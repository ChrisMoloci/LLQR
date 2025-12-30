import { ECC_LEVEL_CODES, ECCLevelCode } from "../const";
import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
import { qrVersions } from "../types";

function generateECCStream(encodedData: Array<string>, qrVersion: qrVersions, eccLevelCode: ECCLevelCode) {
    const eccLevel = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevelCode)?.[0];

    // -- 1. Restructure data stream with padding, and empty ECC bytes as an array --
    const normalizedDataStream = normalizeDataStream(encodedData, qrVersion, eccLevel!);
    console.log("Normalized Data Stream for ECC Generation:", normalizedDataStream);

    // -- 2. Convert data stream to integers --
    const dataStreamIntegers: Array<number> = normalizedDataStream.map(byte => parseInt(byte, 2));
    console.log("Data Stream as Integers for ECC Generation:", dataStreamIntegers);

    // -- 3. Split data into blocks and groups if applicable --
    const groupedData: Array<Array<Array<number>>> = groupDataAndBlocks(dataStreamIntegers, qrVersion, eccLevel!);
    console.log("Grouped Data for ECC Generation:", groupedData);

    // -- 4. Padd ECC 0 bytes for each block --

    // -- 5. Compute ECC for each block in each group --

    // -- 6. Interleave Stream

    // -- 7. Return ECC Stream as array of strings --
}

function normalizeDataStream(encodedData: Array<string>, qrVersion: qrVersions, eccLevel: string): Array<string> {
    // Normalize data stream to join different size codewords
    let encodedDataString: string = encodedData.join('');
    console.log("Encoded Data String:", encodedDataString);

    // Calculate the data code word capacity for the specific QR Code version and ECC level
    const dataCodewordBufferSize: number = qrDataCapacityBits[qrVersion][eccLevel].data * 8;
    console.log("Data Codewords Capacity (in bytes):", dataCodewordBufferSize);

    // Calculate the remaining codeword bits available
    let remaingBufferSize: number = dataCodewordBufferSize - encodedDataString.length;
    console.log("Remaining Buffer Size (in bits):", remaingBufferSize);

    // Check for buffer overflow
    if (remaingBufferSize < 0) throw new Error("Encoded data exceeds capacity for the specified QR version and ECC level.");

    // Add terminator bits (max 4 or buffer size if we have less than 4 bits left in the buffer)
    const terminatorSize = Math.min(4, remaingBufferSize); // If remaing buffer is greater than 4 bits, 4
    encodedDataString += '0'.repeat(terminatorSize); // Add terminator bits
    remaingBufferSize -= terminatorSize; // Update remaining buffer size

    // Align data stream to next byte boundary if not already aligned
    const boundaryDiff = encodedDataString.length % 8;
    console.log("Boundary Difference before Alignment:", boundaryDiff);
    if (boundaryDiff !== 0) {
        const bitsToNextByte = Math.min(8 - boundaryDiff, remaingBufferSize); // Calculate bits to next byte or buffer size
        encodedDataString += '0'.repeat(bitsToNextByte); // Add padding bits to align to next byte
        remaingBufferSize -= bitsToNextByte; // Update remaining buffer size
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
    if (remaingBufferSize > 0) {
        const paddingBytes: Array<string> = ['11101100', '00010001']; // 0xEC and 0x11 in binary
        let isFirstPaddingByte: boolean = true; // Toggle between the two padding bytes
        const dataCodewordBufferSizeInBytes = dataCodewordBufferSize / 8; // Convert buffer size to bytes to work with the array
        for (let i = normalizedDataArray.length; i < dataCodewordBufferSizeInBytes; i++) {
            // Loop until we fill the data codeword buffer
            normalizedDataArray.push(isFirstPaddingByte ? paddingBytes[0]! : paddingBytes[1]!); // Add padding byte
            remaingBufferSize -= 8; // Update remaining buffer size
            isFirstPaddingByte = !isFirstPaddingByte; // Toggle padding byte
        }
    }

    console.log("Final Normalized Data Array with Padding:", normalizedDataArray);
    console.log("Size of Normalized Data Array (in bits):", normalizedDataArray.length * 8);

    return normalizedDataArray;
}

function groupDataAndBlocks(dataStream: Array<number>, qrVersion: qrVersions, eccLevel: string) {
    const groupingObj = qrDataCapacityBits[qrVersion][eccLevel].blocks;

    // Create the unnormalized groups with data from all blocks in each group
    const group1 = dataStream.slice(0, (groupingObj.g1.numBlocks * groupingObj.g1.dataCodewordsPerBlock));
    const group2 = dataStream.slice((groupingObj.g1.numBlocks * groupingObj.g1.dataCodewordsPerBlock), ((groupingObj.g1.numBlocks * groupingObj.g1.dataCodewordsPerBlock)) + ((groupingObj.g2.numBlocks * groupingObj.g2.dataCodewordsPerBlock)));

    // Create group matrix of blocks
    const groupedData: Array<Array<Array<number>>> = [[], []]; // Array to hold two groups

    // Add seperate blocks to each group
    for (let group of groupedData) {
        switch (group) {
            case groupedData[0]: // Group 1
                // Create blocks for group 1
                groupedData[0] = createBlocksForGroup(group1, groupingObj.g1.numBlocks, groupingObj.g1.dataCodewordsPerBlock);
                break;
            case groupedData[1]: // Group 2
                // Create blocks for group 2
                groupedData[1] = createBlocksForGroup(group2, groupingObj.g2.numBlocks, groupingObj.g2.dataCodewordsPerBlock);  
                break;
        }
    }

    // Helper function to create blocks for a group
    function createBlocksForGroup(groupData: Array<number>, numBlocks: number, dataCodewordsPerBlock: number): Array<Array<number>> {
        let blocks: Array<Array<number>> = []; // Will hold all the blocks for the group
        for (let i = 0; i < numBlocks; i++) {
            // Get the block from the entire group data
            const block = groupData.slice(i * dataCodewordsPerBlock, (i + 1) * dataCodewordsPerBlock);
            blocks.push(block); // Add the block to the blocks array
        }
        return blocks; // Return the blocks for the group
    }

    // Return the grouped data
    return groupedData
}

export default generateECCStream;