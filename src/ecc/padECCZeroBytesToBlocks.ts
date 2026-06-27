// Function to pad zero bytes for ECC codewords in each block
import {QRDataCapacityBitsTableBlocks} from "../types";

export function padECCZeroBytesToBlocks(groupedData: Array<Array<Array<number>>>, groupingObj: QRDataCapacityBitsTableBlocks, eccCodewordBufferSize: number): Array<Array<Array<number>>> {
    const paddedGroupedData: Array<Array<Array<number>>> = groupedData.map((group, groupIndex) => {
        const numOfBlocks = groupingObj[`g${groupIndex + 1}` as "g1" || "g2"].numBlocks;
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

export default padECCZeroBytesToBlocks;