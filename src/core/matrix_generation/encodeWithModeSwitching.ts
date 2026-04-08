import unicodeToShiftJIS from "../../datasets/unicode_to_shiftjis";
import determineMode from "./determineEncodingMode";
import encodeAlphanumeric from "../encoders/encodeAlphanumeric";
import encodeBinary from "../encoders/encodeBinary";
import encodeKanji from "../encoders/encodeKanji";
import encodeNumeric from "../encoders/encodeNumeric";
import { EncodedDataSegment } from "../../data_structures/types/EncodedDataSegment";
import { ModeSwitchingModes } from "../../data_structures/types/QRSpecs";
import { encodeWithSingleMode } from "./encodeWithSingleMode";
import { DATA_ENCODING_MODES } from "../../data_structures/enums/DATA_ENCODING_MODES";

// TODO: Cleanup code in this function by splitting some logic into helper functions

export function encodeWithModeSwitching(data: string, useModeSwitching: ModeSwitchingModes = "auto"): Array<EncodedDataSegment> {
    const segments: Array<EncodedDataSegment> = [];

    // Make sure function is not called with disabled mode
    if (useModeSwitching === "disabled") throw new Error("Mode switching is disabled, use encodeWithSingleMode instead.");

    /* 
     * When auto or forced mode switching is enabled, this function breaks data up using the following priority:
     * 1. Numeric
     * 2. Alphanumeric (does not include numbers since Numeric takes priority)
     * 4. Kanji (two byte shift-JIS compatible chars)
     * 3. Byte (does not contain alphanumeric or numeric characters since those take priority)
     */

    // Regular expressions to find all the different datatypes and get them as substrings (only matches at start using ^)
    const numericRegEx      = /^\d+/; // Numeric
    const alphanumericRegEx = /^[A-Z$%*+\-./: ]+/; // Alphanumeric
    const kanjiCandidateRegEx = /^[\u0100-\u9FFF\uF900-\uFAFF]+/; // Kanji candidates (since its a subset of shift-JIS not unicode)
    const byteRegEx         = /^[^A-Z0-9]+/; // Anything else (Byte)

    // Defines the minimum char count for a segment based on auto or forced mode switching
    // const minSegmentSize = useModeSwitching === "auto" ? 4 : 1;
    const minKanjiSegmentSize = useModeSwitching === "auto" ? 2 : 1; // Kanji segments should be at least 2 characters in auto mode

    // Use a while loop i will be changed based on data removed
    let i = 0; // Create the starting index
    while (i < data.length) {
        let slice = data.slice(i); // Slice from i to end

        // Create a substring for each regex that only matches at the start of the slice (2/3 are designed to fail)
        let numericSlice = slice.match(numericRegEx);
        let alphanumericSlice = slice.match(alphanumericRegEx);
        let kanjiCandidateSlice = slice.match(kanjiCandidateRegEx);
        let forcedByteSlice = slice.match(byteRegEx); // Used only in forced mode switching

        // console.log("Data Slice:", slice);
        // console.log("Numeric Slice:", numericSlice);
        // console.log("Alphanumeric Slice:", alphanumericSlice);
        // console.log("Kanji Candidate Slice:", kanjiCandidateSlice);
        // console.log("Byte Slice:", forcedByteSlice);

        /**
         * Note: Half the optmization only happens here
         * Numeric and alphanumeric optimization can only happen later since it is version dependant so for now, we always
         * greedily create numeric and alphanumeric segments so they can be consolidated into the most efficient segments
         * later
         */
        switch (true) {
            case (numericSlice !== null):
                // console.log("Encoding Numeric Segment:", numericSlice[0]);
                segments.push(encodeNumeric(numericSlice[0]));
                i += numericSlice[0].length;
                break;
            case (alphanumericSlice !== null):
                // console.log("Encoding Alphanumeric Segment:", alphanumericSlice[0]);
                segments.push(encodeAlphanumeric(alphanumericSlice[0]));
                i += alphanumericSlice[0].length;
                break;
            case (kanjiCandidateSlice && kanjiCandidateSlice[0].length >= minKanjiSegmentSize):
                // Only encode kanji when it is more efficient
                // console.log("Encoding Kanji Segment:", kanjiCandidateSlice[0]);
                /*
                 * Since kanji encoding is a subset of Shift-JIS and there is no defined range in unicode, 
                 * We have to select a broader range of characters, attempt to encode them,
                 * and if the encoder fails (due to non-kanji chars being present), 
                 * we fallthrough to byte encoding.
                 */
                const kanjiSegment = encodeKanji(kanjiCandidateSlice[0]);
                if (kanjiSegment) {
                    // Only add the kanji segment if it was successfully encoded
                    segments.push(kanjiSegment);
                    i += kanjiCandidateSlice[0].length;
                } else {
                    // Segment the invalid kanji into smaller kanji and byte segments as needed
                    const subSegments = segmentInvalidKanjiCandidate(kanjiCandidateSlice[0], useModeSwitching);

                    segments.push(...subSegments); // Add the rest of the subsegments to the main segments array

                    i += kanjiCandidateSlice[0].length; // Move index forward by the length of the kanji candidate slice
                }
                break;
            default:
                // console.log("Encoding Byte Segment:");
                switch (useModeSwitching) {
                    case "auto":
                        // Efficient segmentation
                        // console.log("Encoding Byte Segment using efficient segmentation.");

                        // In auto mode, we only encode byte segments when necessary
                        let byteData = ''; // Stores all the characters for the byte segment
                        let j = i; // Temp index to find the end of byte data segment

                        // Keep looping through data until we find the next efficient segment
                        while (j < data.length) {
                            // Create a temp slice from j to end
                            let tempSlice = data.slice(j);

                            // console.log("Temp Slice for Byte Segmentation:", tempSlice);
    
                            // Create substrings just like earlier
                            let tempNumeric = tempSlice.match(numericRegEx);
                            let tempAlphanumeric = tempSlice.match(alphanumericRegEx);
                            let tempKanjiCandidate = tempSlice.match(kanjiCandidateRegEx);
                            // Check if we've hit an efficient segment
                            if ((tempNumeric && tempNumeric[0].length >= 4) || 
                                (tempAlphanumeric && tempAlphanumeric[0].length >= 4) ||
                                (tempKanjiCandidate && tempKanjiCandidate[0].length >= 2)) {
                                // console.log("Found next efficient segment at index ", j, " Segment: ", tempSlice, " with length ", tempSlice.length);
                                break; // Stop collecting byte data
                            }
                            
                            // Add this character to byte data
                            byteData += data[j];
                            j++; // Move to next character

                            // console.log("Collected Byte Data so far:", byteData, " at index ", j);
                        }

                        if (byteData.length === 0) {
                            // This should never happen, but just in case
                            byteData += data[j]; // Get the next char
                            j++; // Iterate a char forward to avoid infinite loop
                            console.warn("Critical: Byte data segment was empty, added one character to avoid infinite loop.");
                        }
                        
                        // Add the byte data segment to segments
                        segments.push(encodeBinary(byteData));
                        
                        i = j; // Move index forward since we've collected byte data
                        break;
                    case "forced":
                        // Inefficient segmentation based on priority defined above
                        // console.log("Encoding Byte Segment using forced segmentation.");

                        // In forced mode, we encode all byte segments directly
                        segments.push(encodeBinary(forcedByteSlice![0]));
                        i += forcedByteSlice![0].length; // Move index forward by the amount segmented
                        break;
                    default:
                        // This should never happen unless encodeWithModeSwitching is called direclty with invalid params (such as disabled mode switching)
                        throw new Error("Invalid mode switching option provided: " + useModeSwitching);
                }
        }
    }

    // Failsafe to merge adjacent segments of the same encoding mode
    return mergeAdjacentSegments(segments);
}

// When an a kanjiCandidate fails to encode, we must try to segment it into smaller kanji and byte segments (or just create a byte segment if all chars are invalid)
function segmentInvalidKanjiCandidate(data: string, useModeSwitching: ModeSwitchingModes): Array<EncodedDataSegment> {
    const segments: Array<EncodedDataSegment> = [];

    /*
     * Note: You may be wondering why we dont do proper validation for kanji data in the first place.
     * 
     * The answer is simply because it is very rare that kanji encoding will actually fail. This means
     * that using a regex is in most use cases more efficient since the validation function would never have
     * to run. Here we are segmenting the kanji data into smaller byte and kanji segments as needed to ensure
     * that kanji data is properly encoded while also keeping efficiency high.
     * 
     * This works both for forced and auto mode switching.
     */

    // Seperate the chars further to segment byte and kanji based on validation

    // Proper function to validate if a char can be encoded in kanji
    const validateChar = (char: string): boolean => {
        const shiftJISChar = unicodeToShiftJIS["0x" + char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')];
        return shiftJISChar !== undefined;
    }

    const failedKanjiChars: Array<string> = Array.from(data); // Split the failed kanji candidate into individual chars

    let index = 0 ; // Index to iterate through the segment chars

    // Iterate through the failed kanji chars to segment byte and kanji segments
    while (index < failedKanjiChars.length) {
        let startPos = index; // Will store the start position of our next slice

        // If first char is valid kanji 
        const isFirstCharKanji = validateChar(failedKanjiChars[startPos]!);
        index++; // Move to next char

        // From next char, check how many more chars are either valid kanji chars or byte chars
        if (isFirstCharKanji) {
            // Collect kanji chars
            while (index < failedKanjiChars.length && validateChar(failedKanjiChars[index]!)) {
                index++;
            }
        } else {
            // Collect byte chars
            while (index < failedKanjiChars.length && !validateChar(failedKanjiChars[index]!)) {
                index++;
            }
        }

        // Create a slice of the chars from startPos to index
        const dataSlice = failedKanjiChars.slice(startPos, index).join('');

        // Encode the slice based on whether its kanji or byte and the mode switching settings
        if (isFirstCharKanji) {
            if (useModeSwitching === "forced" || useModeSwitching === "auto" && dataSlice.length >= 2) {
                // Encode kanji segment if its valid and meets min size and is auto mode
                segments.push(encodeKanji(dataSlice)!);
            } else {
                // Encode byte segment if kanji segment is too small and/or is forced mode
                segments.push(encodeBinary(dataSlice));
            }
        } else {
            // Encode Segment with most effective mode
            const sliceMode = determineMode(dataSlice);
            const encodedSegment = encodeWithSingleMode(dataSlice, sliceMode).pop()!;
            segments.push(encodedSegment);
        }
    }

    return segments; // Return the array of segments
}

// Merges adjacent segments of the same encoding mode into single segments
function mergeAdjacentSegments(segments: Array<EncodedDataSegment>): Array<EncodedDataSegment> {
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

        for (let j = i + 1; j < segments.length; j++) {
            // Iterate through all the segments from i+1..length
            const nextSegment = segments[j]!; // Get the next segment

            if (nextSegment.encodingMode === currentMode) {
                // If the next segment has the same encoding mode as the current segment, we may be able to merge them
                if (currentMode === DATA_ENCODING_MODES.BYTE) {
                    // For byte mode, we need to also check if they are using the same char set (e.g Latin-1, UTF-8, etc)
                    if (currentSegment.charSetAssignmentNumber !== nextSegment.charSetAssignmentNumber) {
                        break; // Different charsets, cannot merge;
                    }
                }
                // Merge the segments
                const mergedData = currentSegment.plainTextData + nextSegment.plainTextData;
                currentSegment = encodeWithSingleMode(mergedData, currentMode).pop()!; // encode data in currentMode

                segments.splice(i, j - i + 1, currentSegment); // Replace segments from i to j with single merged segment
                j = i; // Reset j to i to recheck for further adjacent segments
            } else {
                break; // No more adjacent segments of the same mode for segment at i
            }
        }

        i++; // Move to next segment
    }

    return segments; // Return the normalized segments
}