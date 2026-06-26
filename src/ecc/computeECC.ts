import {gfMultiply, gfXor} from "./GF256_Arithmetic";

export function computeECC(groupedData: Array<Array<Array<number>>>, groupingObj: Object, generatorPolynomial: Array<number>): Array<Array<Array<number>>> {
    const eccGroupedData: Array<Array<Array<number>>> = groupedData.map((group, groupIndex) => {
        // console.log("Computing ECC for Group:", groupIndex + 1, "with", numOfBlocks, "blocks.");
        if (group instanceof Array && group.length > 0) {
            return group.map((block, blockIndex) => {
                // console.log("Computing ECC for Block:", blockIndex + 1, "of Group:", groupIndex + 1);
                if (block instanceof Array && block.length > 0) {
                    const blockDataCodewordBufferSize = groupingObj.blocks[`g${groupIndex + 1}`].dataCodewordsPerBlock;
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

export default computeECC;