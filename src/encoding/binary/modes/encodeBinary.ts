// import { DATA_ENCODING_CHARACTER_SET } from "../../../constants/DATA_ENCODING_CHARACTER_SET";
// import { DataEncodingCharacterSet } from "../../../types/constantTypes/DataEncodingCharacterSet";
// import { DATA_ENCODING_MODE } from "../../../constants/DATA_ENCODING_MODE";
// import { EncodedDataSegment } from "../../../types/EncodedDataSegment";
// import BINARY_ENCODER_FUNCTION_MAPPINGS from "../charsets/binaryEncoderFunctionMappings";

import {EncodedDataSegment} from "../../../types";
import {DataEncodingCharacterSet} from "../../../types/constantTypes";
import {DATA_ENCODING_CHARACTER_SET, DATA_ENCODING_MODE} from "../../../constants";
import BINARY_ENCODER_FUNCTION_MAPPINGS from "../charsets/binaryEncoderFunctionMappings";

export function encodeBinary(data: string): EncodedDataSegment {
    // -- 1. Create an array of all the chars from data --
    let plainDataChars: Array<string>; // Create empty array to store characters

    if (typeof data === 'string') {
        // Add data as characters to plainDataChars
        plainDataChars = data.split('');
    } else {
        // If data is not a string, throw an error
        throw new Error("Data must be a string for binary encoding."); 
    }

    // -- 2. Determine Character Set --
    const charSetAssignmentNumber: DataEncodingCharacterSet = getCharSet(plainDataChars);

    // -- 3. Prepare the encoded segment draft --
    const encodedDataSegment: EncodedDataSegment = {
        encodingMode: DATA_ENCODING_MODE.BYTE,
        charSetAssignmentNumber: charSetAssignmentNumber,
        charCount: data.length,
        plainTextData: data,
        encodedData: []
    }

    if (plainDataChars.length === 0) {
        // If no data is provided, return empty encoding
        console.warn("Provided byte data was empty.")
        return encodedDataSegment; // Return empty encoded segment for empty input
    }

    // -- 4. Encode the data and place it in the encodedSegmentDraft --
    encodedDataSegment.encodedData = BINARY_ENCODER_FUNCTION_MAPPINGS[charSetAssignmentNumber]!(plainDataChars);

    // -- 5. Return the encoded segment draft --
    return encodedDataSegment;
}

function getCharSet(plainDataChars: Array<string>): DataEncodingCharacterSet {
    console.log("Plain data chars: ", plainDataChars);

    // Define compatible charsets for binary encoding (order determines priority)
    const compatibleCharsets: Array<DataEncodingCharacterSet> = [
        DATA_ENCODING_CHARACTER_SET["ISO-8859-1"], // Priority 1
        DATA_ENCODING_CHARACTER_SET["UTF-8"] // Priority 2
    ];

    // Check each charset for compatibility
    for (const charset of compatibleCharsets) {
        if (checkCharsetCompatibility(plainDataChars, charset)) {
            console.log(`Using character set ${(Object.keys(DATA_ENCODING_CHARACTER_SET) as Array<keyof typeof DATA_ENCODING_CHARACTER_SET>).find(key => DATA_ENCODING_CHARACTER_SET[key] === charset)} for binary encoding.`);
            return charset; // Return the first compatible charset found
        }
    }

    // If character set could not be determined, something is probably wrong with the data
    throw new Error("Unable to determine character set for binary encoding.");

    // Checks if a provided char set is compatible for the provided data
    function checkCharsetCompatibility(plainDataChars: Array<string>, charset: DataEncodingCharacterSet): boolean {
        // Loop through all chars
        for (const element of plainDataChars) {
            // Get the code point of the character (hex)
            const cp = element.codePointAt(0);
            if (cp === undefined) {
                // Throw error if character is invalid
                throw new Error(`Invalid character in data for binary encoding: ${element}`);
            }

            // Test for incompatibility based on provided charset
            switch (charset) {
                case DATA_ENCODING_CHARACTER_SET["ISO-8859-1"]:
                    if (cp < 0x00 || cp > 0xFF) {
                        return false; // Character not compatible with ISO-8859-1
                    }
                    break;
                case DATA_ENCODING_CHARACTER_SET["UTF-8"]:
                    if (cp < 0x00 || cp > 0x10FFFF) {
                        return false; // Character not compatible with UTF-8
                    }
                    break;
                default:
                    return false; // Unsupported charset
            }
        }
        return true; // All characters are compatible with the charset
    }
}

export default encodeBinary;