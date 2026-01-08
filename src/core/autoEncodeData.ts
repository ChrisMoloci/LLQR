import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";
import { EncodedSegment, ModeSwitchingModes } from "../types";
import encodeAlphanumeric from "./encoders/encodeAlphanumeric";
import encodeBinary from "./encoders/encodeBinary";
import encodeNumeric from "./encoders/encodeNumeric";

// Temp interface used for segmenting data before encoding
interface DataSegment {
    mode: DataEncodingMode;
    data: string;
}

function autoEncodeData(data: string, encodingMode: DataEncodingMode, useModeSwitching: ModeSwitchingModes): Array<EncodedSegment> | undefined {
    let segments: Array<DataSegment>;
    const encodedSegments: Array<EncodedSegment> = [];

    if (useModeSwitching === "forced") {
        // Break data into segments based on character types (most people should not use this)
        segments = segmentDataByMode(data);
        console.log("Data Segments for Encoding:", segments);
    } else if (useModeSwitching === "auto") {
        // Breaks data into segments when it can save on sizing
    } else {
        segments = [{
            mode: encodingMode,
            data: data,
        }];
    }

    for (const segment of segments) {
        switch (segment.mode) {
            case DATA_ENCODING_MODES.NUMERIC:
                encodedSegments.push({
                    mode: segment.mode,
                    charCount: segment.data.length,
                    encodedData: encodeNumeric(segment.data),
                    unencodedData: segment.data,
                });
                break;
            case DATA_ENCODING_MODES.ALPHANUMERIC:
                encodedSegments.push({
                    mode: segment.mode,
                    charCount: segment.data.length,
                    encodedData: encodeAlphanumeric(segment.data),
                    unencodedData: segment.data,
                });
                break;
            case DATA_ENCODING_MODES.BYTE:
                encodedSegments.push({
                    mode: segment.mode,
                    charCount: segment.data.length,
                    encodedData: encodeBinary(segment.data),
                    unencodedData: segment.data,
                });
                break;
            case DATA_ENCODING_MODES.KANJI:
                // TODO: Implement Kanji encoding
                break;
            default:
                throw new Error("Unsupported encoding mode");
        }
    }

    return encodedSegments;
}

// Force encodes data by its specific type regardless of efficiency
function segmentDataByMode(data: string): Array<DataSegment> {
    /**
     * When forced mode switching is enabled, this function breaks using the following priority:
     * 1. Numeric
     * 2. Alphanumeric (does not include numbers since Numeric takes priority)
     * 3. Byte (does not contain alphanumeric or numeric characters since those take priority)
     * 4. Kanji (Not yet implemented)
     */
    const segments: Array<DataSegment> = [];

    const numericRegEx      = /^\d+/g; // Numeric
    const alphanumericRegEx = /^[A-Z]+/g; // Alphanumeric
    const byteRegEx         = /^[^A-Z0-9]+/g; // Anything else (Byte)
    // TODO: Add kanji regex

    // Use a while loop since data will change length
    let i = 0; // Create the starting index
    while (i < data.length) {
        let slice = data.slice(i); // Slice from i to end

        let numericSlice = slice.match(numericRegEx);
        let alphanumericSlice = slice.match(alphanumericRegEx);
        let byteSlice = slice.match(byteRegEx);

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
        }
    }

    // Return the segmented data
    return segments;
}

export default autoEncodeData;