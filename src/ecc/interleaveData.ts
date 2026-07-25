import {QRDataCapacityBitsTableEntry} from "../types";

export function interleaveData(groupedData: Array<Array<Array<number>>>, groupingObj: QRDataCapacityBitsTableEntry): Array<number> {
    if (!groupedData || !groupedData[0] || !groupedData[1]) throw new Error("Invalid grouped data provided for interleaving.");

    // Split data and ecc and add them to a single array
    const dataCodewords: Array<number> = [];
    const eccCodewords: Array<number> = [];
    const interleavedData: Array<number> = [];

    // Get various buffer sizes for each groups blocks
    const g1DataCodewordBufferSize = groupingObj.blocks.g1.dataCodewordsPerBlock; // Data portion
    const g2DataCodewordBufferSize = groupingObj.blocks.g2.dataCodewordsPerBlock; // Data portion
    const eccCodewordBufferSize = groupingObj.ecc; // ECC portion (same for all blocks)
    const g1CodewordBufferSize = g1DataCodewordBufferSize + eccCodewordBufferSize; // Data + ECC
    const g2CodewordBufferSize = g2DataCodewordBufferSize + eccCodewordBufferSize; // Data + ECC

    console.log(g1DataCodewordBufferSize, g2DataCodewordBufferSize);
    console.log(g1CodewordBufferSize, g2CodewordBufferSize);

    // Stores whether each group has data blocks or not
    const hasG1 = Array.isArray(groupedData[0][0]) && groupedData[0].length > 0;
    const hasG2 = Array.isArray(groupedData[1][0]) && groupedData[1].length > 0;

    // Determine the highest data buffer size
    const highestDataBufferSize = Math.max(
        hasG1 ? g1DataCodewordBufferSize : 0, 
        hasG2 ? g2DataCodewordBufferSize : 0
    );

    /**
     * Note: It is important that data and ECC get interleaved independantly
     * While ECC buffer sizes are always identical, the buffer sizes for the data
     * can vary between the blocks in each group. For example, group 1 might have 31
     * data codewords per block, while group can 2 have just 30 data codewords per block.
     * If we were to interleave data and ECC together, we would end up with misaligned ECC 
     * codewords becuase we would start placing ECC codewords from group 2 into the data portion
     * instead of ECC portion.
     */

    // -- 1. Loop through each data codeword and interleave
    for (let i = 0; i < highestDataBufferSize; i++) {
        if (hasG1 && i < g1DataCodewordBufferSize) {
            for (let block of groupedData[0]) {
                // Add data from all blocks in group 1
                dataCodewords.push(block[i]!);
            }
        }

        if (hasG2 && i < g2DataCodewordBufferSize) {
            for (let block of groupedData[1]) {
                // Add data from all blocks in group 2
                dataCodewords.push(block[i]!);
            }
        }
    }

    // -- 2. Loop through each ECC codeword and interleave
    for (let i = 0; i < eccCodewordBufferSize; i++) {
        if (hasG1) {
            for (let block of groupedData[0]) {
                // Add ECC from all blocks in group 1
                if (i < block.length) {
                    eccCodewords.push(block[i + g1DataCodewordBufferSize]!);
                }
            }  
        }

        if (hasG2) {
            for (let block of groupedData[1]) {
                // Add ECC from all blocks in group 2
                if (i < block.length) {
                    eccCodewords.push(block[i + g2DataCodewordBufferSize]!);
                }
            }
        }
    }

    console.log("Codeword interleaved data stream:", dataCodewords);
    console.log("Codeword interleaved ECC stream:", eccCodewords);

    // -- 3. Combine the interleaved data and ECC streams
    interleavedData.push(...dataCodewords, ...eccCodewords);

    // Return final interleaved data stream
    return interleavedData;
}

export default interleaveData;