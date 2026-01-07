import { DATA_ENCODING_MODES, DataEncodingMode } from "../enums";
import { ModeSwitchingModes } from "../types";
import encodeAlphanumeric from "./encoders/encodeAlphanumeric";
import encodeBinary from "./encoders/encodeBinary";
import encodeNumeric from "./encoders/encodeNumeric";

interface DataSegment {
    mode: DataEncodingMode;
    segment: string;
}

function autoEncodeData(data: string, encodingMode: DataEncodingMode, useModeSwitching: ModeSwitchingModes): Array<string> | undefined {
    let segments: Array<DataSegment>;
    if (useModeSwitching === "forced") {
        segments = segmentDataByMode(data);
        console.log("Data Segments for Encoding:", segments);
    } else if (useModeSwitching === "auto") {

    } else {
        segments = [{
            mode: encodingMode,
            segment: data,
        }];
    }

    for (const segment of segments) {
        switch (encodingMode) {
            case DATA_ENCODING_MODES.NUMERIC:
                return encodeNumeric(data);
            case DATA_ENCODING_MODES.ALPHANUMERIC:
                return encodeAlphanumeric(data);
            case DATA_ENCODING_MODES.BYTE:
                return encodeBinary(data);
            case DATA_ENCODING_MODES.KANJI:
                // TODO: Implement Kanji encoding
                break;
            default:
                throw new Error("Unsupported encoding mode");
        }
    }
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
                segment: numericSlice[0],
            });

            i += numericSlice[0].length; // Move index forward
        } else if (alphanumericSlice) {
            // Found an alphanumeric segment
            segments.push({
                mode: DATA_ENCODING_MODES.ALPHANUMERIC,
                segment: alphanumericSlice[0],
            });

            i += alphanumericSlice[0].length; // Move index forward
        } else if (byteSlice) {
            // Found a byte segment
            segments.push({
                mode: DATA_ENCODING_MODES.BYTE,
                segment: byteSlice[0],
            });

            i += byteSlice[0].length; // Move index forward
        }
    }

    // Return the segmented data
    return segments;
}

export default autoEncodeData;