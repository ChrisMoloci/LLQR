// Helper functions to determine size of alphanumeric and numeric data
import {EncodedDataSegment, QRVersion} from "../../../types";
import {DATA_ENCODING_MODE} from "../../../constants";
import {getCharCountIndicatorLength, encodeWithSingleMode} from "./..";

export const determineSizeForAlphanumericData = (size: number): number =>
    11 * Math.floor(size / 2) + (size % 2 ? 6 : 0)

export const determineSizeForNumericData = (size: number): number => {
    const fullGroups = Math.floor(size / 3); // Calculate the number of full 3-digit groups
    const remainder = size - fullGroups * 3 // Calculate the number of remaining digits

    // Each full group of 3 digits takes 10 bits, remainder takes 4 bits for 1 digit and 7 bits for 2 digits
    return (fullGroups * 10) + (remainder === 1 ? 4 : remainder === 2 ? 7 : 0);
}

// Optimizes a run of cross-compatible segments (alphanumeric/numeric) by checking if consolidation saves space and returns the optimized size in bits
export function optimizeAdjacentAlphanumericNumericSegments(segments: Array<EncodedDataSegment>, version: QRVersion): Array<EncodedDataSegment> {
    /**
     * We are not storing segments as those are more complex since they need to be recomputed each time they merge.
     * we will just create theoretical partitions with theoretical ConsolidatedSegmentPrototypes.
     * once the partitioning is complete, we will take these partitions and replace the passed in segments
     * with new ones constructed from the ConsolidatedSegmentPrototypes
     *
    */
    type Partition = {
        size: number,
        partitions: Array<ConsolidatedSegmentPrototype>
    }

    /**
     * Stores the start and end segments of a run that can be consolidated along with the mode to merge
     * them into. If two or more segments are more efficiently stored in one due to header overhead,
     * we can use this object to know which segments to merge without merging them until the end so we
     * can test other merge combinations to get to the most efficient one (using DP)
     */
    type ConsolidatedSegmentPrototype = {
        start: number,
        end: number,
        mode: typeof DATA_ENCODING_MODE.ALPHANUMERIC | typeof DATA_ENCODING_MODE.NUMERIC
    }

    // Calculates the full cost (payload + CCI + mode indicator) for a single consolidated segment.
    function consolidatedSegmentCost(length: number, mode: typeof DATA_ENCODING_MODE.ALPHANUMERIC | typeof DATA_ENCODING_MODE.NUMERIC): number {
        const payloadBits =
        mode === DATA_ENCODING_MODE.ALPHANUMERIC
            ? determineSizeForAlphanumericData(length)
            : determineSizeForNumericData(length);

        const cciBits = getCharCountIndicatorLength(mode, version);
        const modeBits = 4;

        return payloadBits + cciBits + modeBits;
    }

    const memo: Array<Partition | undefined> = new Array(segments.length + 1).fill(undefined); // Memoization array to store results for subproblems

    // Initialize a base case for the first check (last vs past the end)
    memo[segments.length] = {
        size: 0,
        partitions: []
    }

    // Iterate from end -> start
    for (let i = segments.length - 1; i >= 0; i--) {
        // Initialize the best partition which will at the end store the most optimal partition from j..end
        let bestPartition: Partition = {
            size: Infinity,
            partitions: []
        }

        // Iterate from i..end
        for (let j = i; j < segments.length; j++) {
            const currentChunk = segments.slice(i, j + 1); // Get the current chunk of segments from i to j

            // Get the length of the chunks plain text data
            const chunkLength = currentChunk.reduce((sum, seg) => sum + seg.plainTextData.length, 0);

            // Check if it's numeric (if not its alphanumeric which is backwards compatible with numeric)
            const isNumeric = currentChunk.every(seg => seg.encodingMode === DATA_ENCODING_MODE.NUMERIC);

            // This allows us to iterate over modes for currentChunk to create cleaner logic the conditional statements everywhere
            const possibleEncodingModes: Array<typeof DATA_ENCODING_MODE.ALPHANUMERIC | typeof DATA_ENCODING_MODE.NUMERIC> = isNumeric ?
                [DATA_ENCODING_MODE.ALPHANUMERIC, DATA_ENCODING_MODE.NUMERIC] : [DATA_ENCODING_MODE.ALPHANUMERIC];

            for (const mode of possibleEncodingModes) {
                const chunkCost = consolidatedSegmentCost(chunkLength, mode); // Get the cost of consolidating the current chunk in this mode
                const prevChunk = memo[j + 1]!; // Get the best partition for the remaining chunks after the current chunk
                const totalSize = chunkCost + prevChunk.size; // Total cost is the cost of the current chunk plus the best cost of the remaining chunks

                // If it this partitioning is the cheapest one so far for this index..end, update the best partition
                if (totalSize < bestPartition.size) {
                    bestPartition = {
                        size: totalSize,
                        partitions: [
                            {start: i, end: j, mode}, // Current chunk consolidated
                            ...prevChunk.partitions
                        ]
                    }
                }
            }
        }
        memo[i] = bestPartition; // Store the best partition for this index
    }

    const bestPartitioning = memo[0];

    if (!bestPartitioning) {
        throw new Error("An error occured during optimization of cross-compatible segments. No optimal partitioning was computed.");
    }

    return bestPartitioning.partitions.map(partition => {
        // Generate a condolidated segments for each partition
        const segmentsToConsolidate = segments.slice(partition.start, partition.end + 1); // Get the segments to consolidate for this partition
        const plainTextData = segmentsToConsolidate.reduce((data, seg) => data + seg.plainTextData, "");

        // Use the method that encodes only in single mode to generate are single segment
        return encodeWithSingleMode(plainTextData, partition.mode).pop()!;
    });
}

export default optimizeAdjacentAlphanumericNumericSegments;