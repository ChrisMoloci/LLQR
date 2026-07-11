// Merges adjacent segments of the same encoding mode into single segments
import {EncodedDataSegment} from "../../../types";
import {DATA_ENCODING_MODE} from "../../../constants";
import {encodeWithSingleMode} from "../.";

export function mergeAdjacentSegments(segments: Array<EncodedDataSegment>): Array<EncodedDataSegment> {
    /*
     * In very rare cases, some segments may end up adjacent with the same encoding mode due to failed kanji
     * encoding triggering further segmentation of its segment.
     * 
     * EX:
     * given an incomplete array of segments: [numeric] [byte]
     * 
     * if we locate an invalid kanji segment that when segmented yields: [byte] [kanji]
     * 
     * the final array of segments will be: [numeric] [byte] [byte] [kanji]
     * 
     * Havine two adjacent segments is fine when dealing with bytes but will break when dealing
     * with numeric, alphanumeric, or kanji segments since the last codeword might be shorter depending
     * on the length of the plain text data.
     * 
     * To fix this, we consolidate adjacent segments into one byte encoding the plain-text data which all
     * segments should hold
     * 
     * An array that looks like this: [numeric] [byte] [byte] [kanji]
     * 
     * will become this: [numeric] [byte] [kanji]
     */

    let i = 0; // Start at index 0

    while (i < segments.length) {
        // Iterate through all segments
        let currentSegment = segments[i]!; // Get the segment at i
        const currentMode = currentSegment.encodingMode; // Get the encoding mode of the current segment

        //  If current segment is not a byte segment, move restart and move to next segment
        if (currentMode !== DATA_ENCODING_MODE.BYTE) {
            console.log("Moving to next segment");
            i++;
            continue;
        }

        for (let j = i + 1; j < segments.length; j++) {
            // Iterate through all the segments from i+1..length
            const nextSegment = segments[j]!; // Get the next segment

            if (nextSegment.encodingMode === DATA_ENCODING_MODE.BYTE) {
                // If the next segment has the same encoding mode as the current segment, we may be able to merge them
                // if (currentMode === DATA_ENCODING_MODE.BYTE && nextSegment.encodingMode === DATA_ENCODING_MODE.BYTE) {
                    // // For byte mode, we need to also check if they are using the same char set (e.g Latin-1, UTF-8, etc)
                    // if (currentSegment.charSetAssignmentNumber !== nextSegment.charSetAssignmentNumber) {
                    //     break; // Different charsets, cannot merge;
                    // }

                    console.log("Merging adjacent segment" + currentSegment.plainTextData + " " + nextSegment.encodingMode);


                    // Merge the segments
                    const mergedData: string = currentSegment.plainTextData + nextSegment.plainTextData;
                    currentSegment = encodeWithSingleMode(mergedData, currentMode).pop()!; // encode data in currentMode

                    segments.splice(i, j - i + 1, currentSegment); // Replace segments from i to j with single merged segment
                    j = i; // Reset j to i to recheck for further adjacent segments
                // }
            } else {
                break; // No more adjacent segments of the same mode for segment at i
            }
        }

        i++; // Move to next segment
    }

    console.log("Optimized segments: ", structuredClone(segments));

    return segments; // Return the normalized segments
}

export default mergeAdjacentSegments;