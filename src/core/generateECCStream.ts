import { ECC_LEVEL_CODES, ECCLevelCode } from "../const";
import { qrDataCapacityBits } from "../datasets/qrDataCapacityBits";
import { qrVersions } from "../types";
import { gfMultiply, gfXor } from "./GF256_Arithmetic";

function generateECCStream(encodedData: Array<string>, qrVersion: qrVersions, eccLevelCode: ECCLevelCode) {
    const eccLevel = Object.entries(ECC_LEVEL_CODES).find(([key, value]) => value === eccLevelCode)?.[0];
    const groupingObj = qrDataCapacityBits[qrVersion][eccLevel!].blocks;
    const dataCodewordBufferSize: number = qrDataCapacityBits[qrVersion][eccLevel].data * 8;
    const eccCodewordBufferSize: number = qrDataCapacityBits[qrVersion][eccLevel].ecc * 8;
    const generatorPolynomial: Array<number> = qrDataCapacityBits[qrVersion][eccLevel].generator;

    // -- 1. Restructure data stream with padding, and empty ECC bytes as an array --
    const normalizedDataStream = normalizeDataStream(encodedData, dataCodewordBufferSize);
    console.log("Normalized Data Stream for ECC Generation:", normalizedDataStream);

    // -- 2. Convert data stream to integers --
    const dataStreamIntegers: Array<number> = normalizedDataStream.map(byte => parseInt(byte, 2));
    console.log("Data Stream as Integers for ECC Generation:", dataStreamIntegers);

    // -- 3. Split data into blocks and groups if applicable --
    const groupedData: Array<Array<Array<number>>> = groupDataAndBlocks(dataStreamIntegers, groupingObj);
    console.log("Grouped Data for ECC Generation:", groupedData);

    // -- 4. Pad ECC 0 bytes for each block --
    const paddedGroupedData = padECCZeroBytesToBlocks(groupedData, groupingObj, eccCodewordBufferSize);
    console.log("Padded Grouped Data for ECC Generation:", paddedGroupedData);

    // -- 5. Compute ECC for each block in each group --
    const eccGroupedData = computeECC(paddedGroupedData, groupingObj, generatorPolynomial);
    console.log("Computed ECC Grouped Data:", eccGroupedData);

    // -- 6. Interleave Stream

    // -- 7. Return ECC Stream as array of strings --
}

function normalizeDataStream(encodedData: Array<string>, dataCodewordBufferSize: number): Array<string> {
    // Normalize data stream into a stringto join different size codewords
    let encodedDataString: string = encodedData.join('');
    console.log("Encoded Data String:", encodedDataString);

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

function groupDataAndBlocks(dataStream: Array<number>, groupingObj: Object) {
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

// Function to pad zero bytes for ECC codewords in each block
function padECCZeroBytesToBlocks(groupedData: Array<Array<Array<number>>>, groupingObj: Object, eccCodewordBufferSize: number): Array<Array<Array<number>>> {
    const paddedGroupedData: Array<Array<Array<number>>> = groupedData.map((group, groupIndex) => {
        const numOfBlocks = groupingObj[`g${groupIndex + 1}`].numBlocks;
        if (group instanceof Array && numOfBlocks > 0) {
            return group.map((block, blockIndex) => {
                if (block instanceof Array && blockIndex + 1 <= numOfBlocks) {
                    console.log("Adding ECC Padding to Block:", blockIndex + 1, "of Group:", groupIndex + 1);
                    // Pad ECC bytes as 0 for ecc codeword amount
                    return [...block, ...new Array(eccCodewordBufferSize / 8).fill(0)]; // Pad ECC bytes as 0
                }
                return []; // Return empty array as fallback
            });
        } 
        return []; // Return empty array as fallback
    });

    return paddedGroupedData; // Return the padded grouped data
}

function computeECC(groupedData: Array<Array<Array<number>>>, groupingObj: Object, generatorPolynomial: Array<number>): Array<Array<Array<number>>> {
    const eccGroupedData: Array<Array<Array<number>>> = groupedData.map((group, groupIndex) => {
        const numOfBlocks = groupingObj[`g${groupIndex + 1}`].numBlocks;
        if (group instanceof Array && groupIndex + 1 <= numOfBlocks) {
            return group.map((block, blockIndex) => {
                if (block instanceof Array && blockIndex + 1 <= numOfBlocks) {
                    const blockDataCodewordBufferSize = groupingObj[`g${groupIndex + 1}`].dataCodewordsPerBlock;
                    /**
                     * Why we need to copy the intial data and create a copy of the whole block:
                     * As we perform the ECC on the entire block, the data portion of it will be altered and evantually become 0.
                     * In order to retain the original data codewords and also compute the ECC codewords correctly, we must create a copy
                     * of the data we can compute the codewords on, and then just extract to ECC portion from it and add it to the original
                     * data codewords array.
                     * 
                     * As we calculate ECC, the values of the codewords do not instantly become 0, rather they are altered throughout the algorithm
                     * meaning that we cannot just replace the old value once a calculation is done, the codeword must remain altered until the end.
                     * 
                     * That is why we only add the original codewords back after the error correction has been fully calculated.
                     * 
                     */
                    const initialDataBlock = block.slice(0, blockDataCodewordBufferSize); // Get only the data codewords for ECC calculation
                    const currentBlock = [...block]; // Copy the entire block including ECC padding to perform ECC calculation

                    for (let codewordIndex = 0; codewordIndex < blockDataCodewordBufferSize; codewordIndex++) {
                        const currentCodeword: number = currentBlock[codewordIndex]!;

                        if (currentCodeword !== 0) {
                            // For each codeword in the block, multiply the generator polynomial by the codeword and XOR it with the padded data
                            for (let polynomialIndex = 0; polynomialIndex < generatorPolynomial.length; polynomialIndex++) {
                                currentBlock[codewordIndex + polynomialIndex] = gfXor(currentBlock[codewordIndex + polynomialIndex], gfMultiply(generatorPolynomial[polynomialIndex], currentCodeword));
                            }
                        }
                    }
                    const eccCodewords = currentBlock.slice(blockDataCodewordBufferSize); // Extract the ECC codewords from the ECCed block
                    const completeBlock = [...initialDataBlock, ...eccCodewords]; // Combine the initial data codewords with the computed ECC codewords
                    return completeBlock; // Return the block with computed ECC
                }
                return []; // Return empty array as fallback
            });
        }
        return []; // Return empty array as fallback
    });

    // Return the ECCed grouped data
    return eccGroupedData;
}

export default generateECCStream;