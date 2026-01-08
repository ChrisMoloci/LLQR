import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";
import { EncodedSegmentDraft, ModeSwitchingModes } from "../types";
import encodeAlphanumeric from "./encoders/encodeAlphanumeric";
import encodeBinary from "./encoders/encodeBinary";
import encodeNumeric from "./encoders/encodeNumeric";

// Temp interface used for segmenting data before encoding
interface InitialDataSegment {
    mode: DataEncodingMode;
    data: string;
}

export function encodeWithSingleMode(data: string, mode: DataEncodingMode): Array<EncodedSegmentDraft> {
    // Create a single data segment and encode it
    const initialDataSegments = [{
            mode: mode,
            data: data,
    }];

    // Encode the single segment and return it
    return encodeSegmentedData(initialDataSegments);
}

export function encodeWithModeSwitching(data: string, useModeSwitching: ModeSwitchingModes): Array<EncodedSegmentDraft> {
    let initialDataSegments: Array<InitialDataSegment> = [];

    // Create the data segments
    if (useModeSwitching === "forced") {
        // Break data into segments based on character types (most people should not use this)
        initialDataSegments = forceSegmentDataByMode(data);
        console.log("Data Segments for Encoding:", initialDataSegments);
    } else if (useModeSwitching === "auto") {
        // Breaks data into segments when it can save on sizing
    } else if(useModeSwitching === "disabled") {
        throw new Error("Mode switching is disabled. Use encodeWithSingleMode instead.");
    } else {
        throw new Error("Invalid mode switching option provided: " + useModeSwitching);
    }

    // Use the data segments to encode the data into EncodedSegmentDraft[] and return them
    return encodeSegmentedData(initialDataSegments);
}

function encodeSegmentedData(dataSegments: Array<InitialDataSegment>): Array<EncodedSegmentDraft> {
    // Will store the encoded segments
    const encodedSegments: Array<EncodedSegmentDraft> = [];

    // Encodes each of the data segments into EncodedSegmentDraft based on their mode
    for (const segment of dataSegments) {
        switch (segment.mode) {
            case DATA_ENCODING_MODES.NUMERIC:
                // Encode the segment as numeric
                encodedSegments.push({
                    mode: segment.mode,
                    charCount: segment.data.length,
                    encodedData: encodeNumeric(segment.data),
                    unencodedData: segment.data,
                });
                break;
            case DATA_ENCODING_MODES.ALPHANUMERIC:
                // Encode the segment as alphanumeric
                encodedSegments.push({
                    mode: segment.mode,
                    charCount: segment.data.length,
                    encodedData: encodeAlphanumeric(segment.data),
                    unencodedData: segment.data,
                });
                break;
            case DATA_ENCODING_MODES.BYTE:
                // Encode the segment as byte
                encodedSegments.push({
                    mode: segment.mode,
                    charCount: segment.data.length,
                    encodedData: encodeBinary(segment.data),
                    unencodedData: segment.data,
                });
                break;
            case DATA_ENCODING_MODES.KANJI:
                // Encode the segment as kanji
                // TODO: Implement Kanji encoding
                break;
            default:
                throw new Error("Unsupported encoding mode");
        }
    }

    // Return the encoded segments
    return encodedSegments;
}

// Force encodes data by its specific type regardless of efficiency
function forceSegmentDataByMode(data: string): Array<InitialDataSegment> {
    /**
     * When forced mode switching is enabled, this function breaks using the following priority:
     * 1. Numeric
     * 2. Alphanumeric (does not include numbers since Numeric takes priority)
     * 3. Byte (does not contain alphanumeric or numeric characters since those take priority)
     * 4. Kanji (Not yet implemented)
     */
    const segments: Array<InitialDataSegment> = [];

    // Regular expressions to find all the different datatypes and get them as substrings (only matches at start using ^)
    const numericRegEx      = /^\d+/g; // Numeric
    const alphanumericRegEx = /^[A-Z]+/g; // Alphanumeric
    const byteRegEx         = /^[^A-Z0-9]+/g; // Anything else (Byte)
    // TODO: Add kanji regex

    // Use a while loop i will be changed based on data removed
    let i = 0; // Create the starting index
    while (i < data.length) {
        let slice = data.slice(i); // Slice from i to end

        // Create a substring for each regex that only matches at the start of the slice (2/3 are designed to fail)
        let numericSlice = slice.match(numericRegEx);
        let alphanumericSlice = slice.match(alphanumericRegEx);
        let byteSlice = slice.match(byteRegEx);

        // Add the only found substring to the segments
        if (numericSlice) {
            // Found a numeric segment
            segments.push({
                mode: DATA_ENCODING_MODES.NUMERIC,
                data: numericSlice[0],
            });

            i += numericSlice[0].length; // Move index forward
        } else if (alphanumericSlice) {
            // Found an alphanumeric segment
            segments.push({
                mode: DATA_ENCODING_MODES.ALPHANUMERIC,
                data: alphanumericSlice[0],
            });

            i += alphanumericSlice[0].length; // Move index forward
        } else if (byteSlice) {
            // Found a byte segment
            segments.push({
                mode: DATA_ENCODING_MODES.BYTE,
                data: byteSlice[0],
            });

            i += byteSlice[0].length; // Move index forward
        } else {
            throw new Error("Unable to segment data at index " + i + ". Data: " + slice);
        }
    }

    // Return the segmented data
    return segments;
}

// Auto segments data based on efficiency
function autoSegmentDataByMode(data: string): Array<InitialDataSegment> {

}