import {ModeSwitchingStrategy} from "../../types";
import {MODE_SWITCHING_STRATEGY} from "../../constants";
import {EncodedDataSegment} from "../../types";
import {encodeAlphanumeric, encodeBinary, encodeKanji, encodeNumeric} from "../binary";
import {segmentInvalidKanjiCandidate, mergeAdjacentSegments} from ".";

// TODO: Cleanup code in this function by splitting some logic into helper functions

export function encodeWithModeSwitching(data: string, useModeSwitching: ModeSwitchingStrategy = MODE_SWITCHING_STRATEGY.AUTO): Array<EncodedDataSegment> {
    const segments: Array<EncodedDataSegment> = [];

    // Make sure function is not called with disabled mode
    if (useModeSwitching === MODE_SWITCHING_STRATEGY.DISABLED) throw new Error("Mode switching is disabled, use encodeWithSingleMode instead.");

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
    const minKanjiSegmentSize = useModeSwitching === MODE_SWITCHING_STRATEGY.AUTO ? 2 : 1; // Kanji segments should be at least 2 characters in auto mode

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

                    console.error(`sub segments:`);
                    console.log(subSegments);

                    segments.push(...subSegments); // Add the rest of the subsegments to the main segments array

                    i += kanjiCandidateSlice[0].length; // Move index forward by the length of the kanji candidate slice
                }
                break;
            default:
                // console.log("Encoding Byte Segment:");
                // switch (useModeSwitching) {
                if (useModeSwitching === MODE_SWITCHING_STRATEGY.AUTO) {
                    // Efficient segmentation

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
                }
                else if (useModeSwitching === MODE_SWITCHING_STRATEGY.FORCED) {
                    // Inefficient segmentation based on priority defined above

                    // In forced mode, we encode byte as a last resort and for as short as possible, prioritizing other modes
                    let byteData = "";
                    let j = i;

                    // Cut off the byte segment immediately after another encoding mode is detected
                    while (j < data.length) {
                        const slice = data.slice(j);
                        const startsNumeric = /^\d+/.test(slice);
                        const startsAlphanumeric = /^[A-Z$%*+\-./: ]+/.test(slice);
                        const startsKanjiCandidate = /^[\u0100-\u9FFF\uF900-\uFAFF]+/.test(slice);
                        if (startsNumeric || startsAlphanumeric || startsKanjiCandidate) {
                            break;
                        }
                        const char = Array.from(slice)[0]!;
                        byteData += char;

                        j++;
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
                }
                else {
                    // This should never happen unless encodeWithModeSwitching is called direclty with invalid params (such as disabled mode switching)
                    throw new Error("Invalid mode switching option provided: " + useModeSwitching);
                }
        }
    }

    // Failsafe to merge adjacent segments of the same encoding mode
    return mergeAdjacentSegments(segments);
}

export default encodeWithModeSwitching;