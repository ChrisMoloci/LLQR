import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";
import { ECISwitchingModes, EncodedDataSegment, ModeSwitchingModes } from "../types";
import encodeAlphanumeric from "./encoders/encodeAlphanumeric";
import encodeBinary from "./encoders/encodeBinary";
import encodeKanji from "./encoders/encodeKanji";
import encodeNumeric from "./encoders/encodeNumeric";

export function encodeWithSingleMode(data: string, mode: DataEncodingMode, useECISwitching: ECISwitchingModes = "disabled"): Array<EncodedDataSegment> {
    // Encodes all data using a single specified mode thats compatible
    const segments: Array<EncodedDataSegment> = [];

    switch(mode) {
        case DATA_ENCODING_MODES.NUMERIC:
            segments.push(encodeNumeric(data));
            break;
        case DATA_ENCODING_MODES.ALPHANUMERIC:
            segments.push(encodeAlphanumeric(data));
            break;
        case DATA_ENCODING_MODES.KANJI:
            // Try to encode in kanji mode
            const kanjiSegment = encodeKanji(data);
            if (kanjiSegment) {
                // Successfully encoded in kanji mode
                segments.push(kanjiSegment);
                break;
            }
            // If kanji encoding fails, fallthrough to byte encoding
        default:
            // Encode to byte mode if all else fails
            segments.push(encodeBinary(data));
            break;
        // default:
        //     throw new Error("Unsupported encoding mode for single mode encoding.");
    }

    return segments;
}

export function encodeWithModeSwitching(data: string, useModeSwitching: ModeSwitchingModes = "auto", useECISwitching: ECISwitchingModes = "disabled"): Array<EncodedDataSegment> {
    const segments: Array<EncodedDataSegment> = [];

    /* 
     * When forced mode switching is enabled, this function breaks using the following priority:
     * 1. Numeric
     * 2. Alphanumeric (does not include numbers since Numeric takes priority)
     * 4. Kanji (two byte shift-JIS compatible chars)
     * 3. Byte (does not contain alphanumeric or numeric characters since those take priority)
     */

    // Regular expressions to find all the different datatypes and get them as substrings (only matches at start using ^)
    const numericRegEx      = /^\d+/; // Numeric
    const alphanumericRegEx = /^[A-Z$%*+\-./:]+/; // Alphanumeric
    const kanjiCandidateRegEx = /^[^\x00-\x7F\uFF61-\uFF9F]+/; // Kanji candidates (since its a subset of shift-JIS not unicode)
    const byteRegEx         = /^[^A-Z0-9]+/; // Anything else (Byte)

    // Defines the minimum char count for a segment based on auto or forced mode switching
    const minSegmentSize = useModeSwitching === "auto" ? 4 : 1;
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

        switch (true) {
            case (numericSlice && numericSlice[0].length >= minSegmentSize):
                console.log("Encoding Numeric Segment:", numericSlice[0]);
                segments.push(encodeNumeric(numericSlice[0]));
                i += numericSlice[0].length;
                break;
            case (alphanumericSlice && alphanumericSlice[0].length >= minSegmentSize):
                console.log("Encoding Alphanumeric Segment:", alphanumericSlice[0]);
                segments.push(encodeAlphanumeric(alphanumericSlice[0]));
                i += alphanumericSlice[0].length;
                break;
            case (kanjiCandidateSlice && kanjiCandidateSlice[0].length >= minKanjiSegmentSize):
                console.log("Encoding Kanji Segment:", kanjiCandidateSlice[0]);
                /**
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
                    break;
                }
                // If kanji encoding fails, fallthrough to byte encoding
            default:
                console.log("Encoding Byte Segment:");
                switch (useModeSwitching) {
                    case "auto":
                        console.log("Encoding Byte Segment using efficient segmentation.");
                        // Efficient segmentation
                        // In auto mode, we only encode byte segments when necessary
                        let byteData = ''; // Stores all the characters for the byte segment
                        let j = i; // Temp index to find the end of byte data segment
                        
                        // Keep looping through data until we find the next efficient segment
                        while (j < data.length) {
                            // Create a temp slice from j to end
                            let tempSlice = data.slice(j);
    
                            // Create substrings just like earlier
                            let tempNumeric = tempSlice.match(numericRegEx);
                            let tempAlphanumeric = tempSlice.match(alphanumericRegEx);
                            let tempKanjiCandidate = tempSlice.match(kanjiCandidateRegEx);
                            // Check if we've hit an efficient segment
                            if ((tempNumeric && tempNumeric[0].length >= 4) || 
                                (tempAlphanumeric && tempAlphanumeric[0].length >= 4) ||
                                (tempKanjiCandidate && tempKanjiCandidate[0].length >= 2)) {
                                break; // Stop collecting byte data
                            }
                            
                            // Add this character to byte data
                            byteData += data[j];
                            j++; // Move to next character
                        }
                        
                        // Add the byte data segment to segments
                        segments.push(encodeBinary(byteData));
                        
                        i = j; // Move index forward since we've collected byte data
                        break;
                    case "forced":
                        console.log("Encoding Byte Segment using forced segmentation.");
                        // Inefficient segmentation based on priority defined above
                        // In forced mode, we encode all byte segments directly
                        segments.push(encodeBinary(forcedByteSlice![0]));
                        i += forcedByteSlice![0].length;
                        break;
                    default:
                        throw new Error("Invalid mode switching option provided: " + useModeSwitching);
                }
            // default:
            //     throw new Error("Unable to segment data at index " + i + ". Data: " + slice);
        }
    }

    return segments;
}