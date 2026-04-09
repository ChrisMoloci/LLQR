function groupDataAndBlocks(dataStream: Array<number>, groupingObj: Object) {
    // Create the unnormalized groups with data from all blocks in each group
    const group1 = dataStream.slice(0, (groupingObj.blocks.g1.numBlocks * groupingObj.blocks.g1.dataCodewordsPerBlock));
    const group2 = dataStream.slice((groupingObj.blocks.g1.numBlocks * groupingObj.blocks.g1.dataCodewordsPerBlock), ((groupingObj.blocks.g1.numBlocks * groupingObj.blocks.g1.dataCodewordsPerBlock)) + ((groupingObj.blocks.g2.numBlocks * groupingObj.blocks.g2.dataCodewordsPerBlock)));

    // Create group matrix of blocks
    const groupedData: Array<Array<Array<number>>> = [[], []]; // Array to hold two groups

    // Add seperate blocks to each group
    for (let group of groupedData) {
        switch (group) {
            case groupedData[0]: // Group 1
                // Create blocks for group 1
                groupedData[0] = createBlocksForGroup(group1, groupingObj.blocks.g1.numBlocks, groupingObj.blocks.g1.dataCodewordsPerBlock);
                break;
            case groupedData[1]: // Group 2
                // Create blocks for group 2
                groupedData[1] = createBlocksForGroup(group2, groupingObj.blocks.g2.numBlocks, groupingObj.blocks.g2.dataCodewordsPerBlock);  
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

export default groupDataAndBlocks